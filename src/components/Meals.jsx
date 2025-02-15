import { useState, useEffect } from 'react';
import MealItem from './MealItem';

export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');
      
      if(!response.ok) {
          throw new Error('Failed to fetch meals');
      }
      const meals = await response.json();
      setAvailableMeals(meals);
    }
  
    fetchMeals();
  }, [])
  
  return (
      <ul id="meals">
        {availableMeals.map(meal => (
          <MealItem key={meal.id} meal={meal}/>)
        )}
      </ul>
    );
  }