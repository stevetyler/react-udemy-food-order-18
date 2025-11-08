import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

export default function Meals() {
  const requestConfig = {};
  const { 
    data: availableMeals, 
    isLoading, 
    error 
  } = useHttp('http://localhost:3000/meals', null, []);
  
  if (isLoading) {
    return <section className="meals-loading">
      <p>Fetching meals...</p>
    </section>;
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
