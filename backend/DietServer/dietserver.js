const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route to calculate nutrition
app.post('/calculate-nutrition', async (req, res) => {
  const { height, weight,duration } = req.body.data;
  console.log("here in cal:", req.body);

  if (!height || !weight || !duration) {
    console.log("here in 400", height, weight,duration);
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
        const response = await axios.get(
          'https://nutrition-calculator.p.rapidapi.com/api/nutrition-info',
          {
            params: {
              measurement_units: 'met',
              sex: 'female', 
              age_value: 20,
              age_type: 'yrs',
              cm:height,
              kilos:weight,
              pregnancy_lactating:"pregnant",
              pregnant_weeks:duration,
              pre_pregnant_kilos:weight-2.5,
              activity_level: 'Active', // Assuming active (adjust based on input if necessary)
            },
            headers: {
              'X-Rapidapi-Key': '024606d596msh7389e683dd842a0p11be96jsnb540ba7aba44', // Replace with your RapidAPI key
              'X-Rapidapi-Host': 'nutrition-calculator.p.rapidapi.com',
            },
          }
        );
        const macronutrientsTable = response.data.macronutrients_table["macronutrients-table"];
        const macronutrients = {
          carbohydrate: macronutrientsTable.find(row => row[0] === 'Carbohydrate')?.[1] || 'Data not available',
          protein: macronutrientsTable.find(row => row[0] === 'Protein')?.[1] || 'Data not available',
          fat: macronutrientsTable.find(row => row[0] === 'Fat')?.[1] || 'Data not available',
          total_fiber: macronutrientsTable.find(row => row[0] === 'Total Fiber')?.[1] || 'Data not available',
          saturated_fatty_acids: macronutrientsTable.find(row => row[0] === 'Saturated fatty acids')?.[1] || 'Data not available',
          transfatty_acids: macronutrientsTable.find(row => row[0] === 'Transfatty acids')?.[1] || 'Data not available',
          α_linolenic_acid: macronutrientsTable.find(row => row[0] === 'α-Linolenic Acid')?.[1] || 'Data not available',
          linoleic_acid: macronutrientsTable.find(row => row[0] === 'Linoleic Acid')?.[1] || 'Data not available',
          dietary_cholesterol: macronutrientsTable.find(row => row[0] === 'Dietary Cholesterol')?.[1] || 'Data not available',
          total_water: macronutrientsTable.find(row => row[0] === 'Total Water')?.[1] || 'Data not available'
        };
        
        console.log("res:",macronutrients);
        res.json(macronutrients);
}    

  catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Failed to calculate nutrition' });
      }


});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
