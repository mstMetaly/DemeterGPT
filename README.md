# DemeterGPT
Code is in new branch

This project is aimed at **providing maternal health care tips and assistance** to pregnant women using a **chatbot** interface. The bot is designed to support mothers by offering a variety of features such as:

- **Chatbot for Mothers**: An interactive chatbot that provides helpful information to pregnant women.
- **Maternity Question & Answer**: A chat option for mothers to ask questions about pregnancy, maternity, and maternal health.
- **Health Risk Categorization**: Analyzing the mother's previous health history and current health information to categorize the risk level and provide personalized tips based on the risk category.
- **Diet Chart Creation**: Generating a custom diet chart based on the pregnancy stage and health status of the mother.
- **Emergency Response**: Providing information about nearby hospitals, emergency services, and medical advice for urgent situations.

**Key Features**

1. **Chatbot Interface**: A user-friendly chatbot that answers general queries related to maternity and pregnancy.
2. **Health Risk Assessment**: An AI-driven assessment tool that evaluates the health risk of a mother based on previous health history and current health information.
3. **Personalized Tips**: Provides health tips tailored to the mother's risk category (e.g., low, moderate, high-risk pregnancy).
4. **Diet Recommendations**: Helps create a customized diet plan to ensure a healthy pregnancy.
5. **Emergency Services Integration**: Provides mothers with nearby hospital information and emergency contacts.
6. **Natural Language Processing (NLP)**: Allows the chatbot to understand and respond to natural language queries.

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **AI & NLP**: LLama Model for conversational responses and health assessment algorithms.
- **API Integration**: Google Maps API for nearby hospitals, emergency services, and health tracking.
- **Authentication**: JWT token based user authentication and authorization.

**Installation Instructions**

### **Prerequisites**

- **Node.js** and **npm** installed on your system.
- **MongoDB** instance (local or cloud).
- **Google Cloud API** credentials (for AI and emergency services).
- **React.js** for the frontend.

**Steps to Set Up the Project**

1. **Clone the Repository**
    
    ```bash
    git clone <https://github.com/mstMetaly/DemeterGPT.git>
    cd DemeterGPT
    ```
    
2. **Backend Setup (Node.js)**
    - Navigate to the backend folder:
        
        ```bash
        cd backend
        cd DietServer
        node dietserver.js
        ```
        
    - Install required dependencies:
        
        ```bash
        npm install
        ```
        
    - Set up Google Cloud API credentials:
        - Download the **Service Account Key** from [Google Cloud Console](https://console.cloud.google.com/).
        - Save the key file in the `backend` folder.
        - Enable API access for  Google Maps and other required services.
3. **Frontend Setup (React.js)**
    - Navigate to the frontend folder:
        
        ```bash
        cd frontend
        
        ```
        
    - Install the frontend dependencies:
        
        ```bash
        npm install
        
        ```
        
4. **Running the Application**
    - Start the backend server:
        
        ```bash
        cd backend
        npm start
        
        ```
        
    - Start the frontend application:
        
        ```bash
        cd frontend
        npm start
        
        ```
        
5. **Access the Application**
    - Open your browser and go to `http://localhost:3000` to view the frontend.
    - The backend will be available at `http://localhost:5000`.

---

### Conclusion

The system is ready for further customizations to meet specific **business** or **personal** needs. Developers can expand the project by integrating other relevant services, such as **Google Contacts** to remind users about medical contacts, or **Gmail** to send weekly health tips and reminders directly to users' inboxes. This can provide a **more robust and personalized experience** for the user, ensuring they stay on top of their health and wellness journey.
