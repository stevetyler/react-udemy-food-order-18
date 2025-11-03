import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

export default function Meals() {

  const { data: availableMeals, isLoading, error } = useHttp('http://localhost:3000/meals', { method: 'GET' });
  
  return (
      <ul id="meals">
        {availableMeals.map(meal => (
          <MealItem key={meal.id} meal={meal}/>)
        )}
      </ul>
    );
  }