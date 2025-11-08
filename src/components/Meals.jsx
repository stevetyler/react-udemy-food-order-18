import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

const requestConfig = {};

export default function Meals() {
  
  const { 
    data: availableMeals, 
    isLoading, 
    error 
  } = useHttp('http://localhost:3000/meals', requestConfig, []);
  
  if (isLoading) {
    return (
      <p className="center">Fetching meals...</p>
    );
  }

  // if (error) {
  //   return <section className="meals-error">
  //     <p>{error}</p>
  //   </section>;
  // }

  return (
    <ul id="meals">
      {availableMeals.map(meal => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
  
}
