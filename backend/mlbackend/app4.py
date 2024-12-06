import os
from llama_cpp import Llama
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# FastAPI app initialization
app = FastAPI()

# Load the GGUF model with llama.cpp
MODEL_PATH = "model/mistral-7b-instruct-v0.1.Q4_0.gguf"
llama_model = Llama(model_path=MODEL_PATH)

# Conversation Management Class
class Conversation:
    def __init__(self, max_context_length=2):
        self.context = []
        self.max_context_length = max_context_length

    def add_message(self, role, content):
        if len(self.context) >= self.max_context_length:
            self.context.pop(0)
        self.context.append({"role": role, "content": content})

    def generate_prompt(self, pregnancy_data, risk_level, new_message):
        # Truncate medical history context to be more concise
        medical_history_context = f"""Medical History:
Age: {pregnancy_data.age}
Risk Level: {risk_level}
BP: {pregnancy_data.diastolicBP}
Blood Sugar: {pregnancy_data.blood_sugar}"""

        # Shorten the context string
        context_str = "\n".join([f"{msg['role']}: {msg['content'][:50]}" for msg in self.context])

        system_prompt = f"""You are a compassionate AI maternal health assistant.
Provide concise, supportive guidance.

Medical Summary:
{medical_history_context}


Respond to: {new_message}
Assistant:"""
        return system_prompt

# Pregnancy Risk Input Model
class PregnancyRiskInput(BaseModel):
    age: int
    diastolicBP: int
    blood_sugar: float
    body_temp: float
    heart_rate: int
    risk_level: str

# Chat Request Model
class ChatRequest(BaseModel):
    session_id: str
    message: str
    pregnancy_data: PregnancyRiskInput

# Conversation Sessions
conversations = {}

@app.post("/chat/")
async def chat(request: ChatRequest):
    if not llama_model:
        raise HTTPException(status_code=500, detail="Model not initialized")

    # Create or retrieve conversation session
    if request.session_id not in conversations:
        conversations[request.session_id] = Conversation()

    conversation = conversations[request.session_id]

    # Use pregnancy data and the associated risk level
    pregnancy_data = request.pregnancy_data
    risk_level = pregnancy_data.risk_level

    # Generate prompt using pregnancy data and risk level as medical history
    try:
        full_prompt = conversation.generate_prompt(pregnancy_data, risk_level, request.message)
        
        # Modify generation parameters to encourage longer responses
        response = llama_model(
            full_prompt, 
            max_tokens=4096,  # Increased max tokens to allow longer responses
            temperature=0.7,  # Moderate temperature for creativity
            top_p=0.9,        # Nucleus sampling to control randomness
            stop=["user:", "User:", "\n\n"],  # Add stop sequences to prevent hallucination
            echo=False        # Ensure only the model's response is returned
        )
        
        # Extract the full response, handling potential truncation
        bot_response = response["choices"][0]["text"].strip()
        
        # Optional: Add a check to ensure a meaningful response
        # if len(bot_response) < 100:
        #     bot_response += " If you need more detailed advice, please consult with a healthcare professional."

        # Add messages to conversation context
        conversation.add_message("user", request.message)
        conversation.add_message("assistant", bot_response)

        return {
            "response": bot_response,
            "risk_level": risk_level,
            "session_id": request.session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Maternal Health Conversational Assistant"}

# Optional: Add main block for direct running
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)