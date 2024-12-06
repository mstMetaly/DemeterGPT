
import React, { useState, useEffect } from 'react';

const RiskAnalysis = () => {
  const [formData, setFormData] = useState({
    age: '',
    diastolicBP: '',
    blood_sugar: '',
    body_temp: '',
    heart_rate: '',
  });
  
  const phone = localStorage.getItem('userPhone');
  const age = localStorage.getItem('age');

  const [risk, setRisk] = useState(null);

  useEffect(() => {
    // Fetch initial form data and nutrition details on component mount
    const fetchInitialData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone }),
        });

        const result = await response.json();
        


         // Fetch pregnancy risk details
         const RiskResponse = await fetch('http://127.0.0.2:8080/predict/pregnancy-risk/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  age: age ? parseInt(age, 10) : 25, 
                  diastolicBP: result.diastolicBP ? parseInt(result.diastolicBP, 10) : 89,
                  blood_sugar: result.blood_sugar ? parseFloat(result.blood_sugar) : 7.0,
                  body_temp: result.body_temp ? parseFloat(result.body_temp) : 98.0,
                  heart_rate: result.heart_rate ? parseInt(result.heart_rate, 10) : 77,
                }),
              });

        const RiskData = await RiskResponse.json();
        console.log(RiskData); // Log the full response
        setRisk(RiskData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array to ensure this runs only once on mount

  // Log formData after it's updated
  useEffect(() => {
    console.log("age:", formData.age);
    console.log("dbp:", formData.diastolicBP);
    console.log("bd sugar:", formData.blood_sugar);
    console.log("body_temp:", formData.body_temp);
    console.log("heart_rate:", formData.heart_rate);
  }, [formData]); // This will run every time formData is updated

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>                   </h1>
      
      {risk && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2>Risk category</h2>
          <p>{risk?.risk_level || 'Risk data not available'}</p> {/* Render risk_level */}
        </div>
      )}
    </div>
  );
};

export { RiskAnalysis };
