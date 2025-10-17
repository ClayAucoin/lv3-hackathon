//Profit Calculator Page

import { useState } from "react";
import data from "../data/enriched-collection.json";
import "./Profit.css";

export default function Profit(){
    const [profit, setProfit] = useState(0);
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [filteredGenreList, setFilteredGenreList] = useState("");
    const [filteredRatingList, setFilteredRatingList] = useState(""); 

    //if click genre button, filter list , show list of movies of genre
    //if click rating button, filter list, show list of ratings in order
   //calculate profit
    function findProfit (){
    for (let i = 0; i < data.length; i++){
        profit = profit + data[i].worldwide_gross / data[i].budget;
        }
        setProfit(profit);
   }

   //filter genre and rating functions
   function handleGenre(){
    for (let i = 0; i < data.length; i++){
        if (genre === data[i].genre){
            setFilteredGenreList(filteredGenreList);
            console.log(filteredGenreList);
        }
    }
        findProfit();
   }

   function MovieDisplay(){
        return(
            <>
                <h3>List of Movies</h3>
                {setGenre}
                {setRating}
                {findProfit}
            </>
        );
   }

   function handleRating(){
    for (let i = 0; i < data.length; i++){
        if (rating === data[i].rating){
            setFilteredRatingList(filteredRatingList);
            console.log(filteredRatingList);
        }
    }
        findProfit();
   }

   //Profit Button functions
   function Buttons ({onClick}){
        return(
            <>
                <button onClick={onClick}>Less than 30%</button>
                <button onClick={onClick}>50%</button>
                <button onClick={onClick}>More than 50%</button>
            </>
        );
   }

   function Less30(){
    findProfit();
   }

   function Is50(){
    findProfit();
   }

   function More50(){
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
                    <MovieDisplay />
                </div>
                <div className="profitButton-container">
                    <Buttons onClick={Less30} />
                    <Buttons onClick={Is50} />
                    <Buttons onClick={More50} />
                </div>
        </>
    );
}