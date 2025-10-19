//Profit Calculator Page

import { useState } from "react";
import data from "../data/enriched-collection.json";
import "./Profit.css";

export default function Profit() {
  const [profit, setProfit] = useState(0);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [filteredGenreList, setFilteredGenreList] = useState([]);
  const [filteredRatingList, setFilteredRatingList] = useState([]);

  //if click genre button, filter list , show list of movies of genre
  //if click rating button, filter list, show list of ratings in order
  //calculate profit
 function findProfit() {
    let tempProfit = [];
    for (let i = 0; i < data.length; i++) {
      // Calculate profit percentage
        const gross = Number(data[i].worldwide_gross);
        const budget = Number(data[i].budget);
      if (
        !isNaN(gross) &&
        !isNaN(budget) &&
        budget > 0 &&
        ((gross - budget) / budget) * 100 < 30
      ) {
        tempProfit.push(
          ((data[i].worldwide_gross - data[i].budget) / data[i].budget) * 100
        );
      }
      console.log(i + " Movie Name: " + data[i].title + " Worldwide Gross: " + data[i].worldwide_gross + " Budget: " + data[i].budget + " Profit: " + ((data[i].worldwide_gross - data[i].budget) / data[i].budget) * 100);
    }
     setProfit(tempProfit);
 }

  //filter genre and rating functions
  function handleGenre() {
    for (let i = 0; i < data.length; i++) {
      if (genre === data[i].genre) {
       genreTemp.push(data[i].genre);
      }
    }
     setFilteredGenreList(genreTemp);
        console.log(genreTemp);
        
  }

  // function MovieDisplay() {
  //   return (
  //     <>
  //       <h3>List of Movies</h3>
  //       {setGenre}
  //       {setRating}
  //       <div className="MovieListOutput"></div>
  //     </>
  //   );
  // }

  function handleRating() {
    for (let i = 0; i < data.length; i++) {
      if (rating === data[i].rating) {
        setFilteredRatingList(filteredRatingList);
        console.log(filteredRatingList);
      }
    }
    
  }

  //Profit Button functions
  function Buttons({ onClick }) {
    return (
      <>
        <button onClick={() => findProfit()}>Less than 30%</button>
        <button onClick={onClick}>50%</button>
        <button onClick={onClick}>More than 50%</button>
      </>
    );
  }

  function Less30() {
    
    findProfit();
  }

  function Is50() {
    findProfit();
  }

  function More50() {
    findProfit();
  }

  return (
    <>
      <h1>Movies by Profit</h1>
      <h2>Less than 30% Profit Range</h2>
      <div className="filter-container">
        <h3>Filter By:</h3>
        <button onClick={handleGenre}>Genre</button>
        <button onClick={handleRating}>Rating</button>
      </div>
      <div className="movie-display">
        {/* <MovieDisplay /> */}
        {filteredGenreList}
      </div>
      <div className="profitButton-container">
        {/* <Buttons onClick={Less30} /> */}
        <button onClick={findProfit}>Less than 30%</button>
        {profit}
      </div>
    </>
  );
}
