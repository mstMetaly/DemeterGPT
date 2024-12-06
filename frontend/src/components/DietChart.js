import React, { useState, useEffect } from 'react';

const DietChart = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    duration: '',
    activity: '',
  });
  const phone = localStorage.getItem('userPhone');

  const [nutrition, setNutrition] = useState(null);

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
        // Update form data with response
        setFormData({
          height: result.height || '', // Default to empty string if undefined
          weight: result.weight || '',
          duration: result.duration || '',
          activity: result.activity || '', // Default to empty string if undefined
        });

        // Fetch nutrition details
        const nutritionResponse = await fetch('http://localhost:5001/calculate-nutrition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result),
        });

        const nutritionData = await nutritionResponse.json();
        console.log(nutritionData);
        setNutrition(nutritionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array to ensure this runs only once on mount

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Pregnancy Nutrition Calculator</h1>
      {nutrition && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2>Nutrition Requirements</h2>
          <p>Carbohydrate: {nutrition.carbohydrate}</p>
          <p>Protein: {nutrition.protein}</p>
          <p>Fat: {nutrition.fat}</p>
          <p>Minerals: {nutrition.minerals}</p>
        </div>
      )}
    </div>
  );
};

export { DietChart };
