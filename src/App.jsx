import { useState } from "react";
import "./App.css";
import data from "./data/enriched-collection.json";
import MovieClip from "./components/MovieClip";

export default function App() {
  const [index, setIndex] = useState(randomNumber(0, data.length - 1));

  function handleNextMovie() {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  }

  function handlePreviousMovie() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function goStart() {
    setIndex(0);
  }

  function goEnd() {
    setIndex(data.length - 1);
  }

  let movieListJSX = [];
  for (let i = 0; i < data.length; i++) {
    let movie = data[i];
    movieListJSX.push(
      <li key={movie.id}>
        {movie.title} ({Math.trunc(data[i].year)}) ({movie.id - 1}){movie.title}{" "}
      </li>
    );
  }
  // movieListJSX = data.map(movie => <li> {movie.title} </li>)

  let movieGridJSX = [];
  for (let i = 0; i < 24; i++) {
    let movie = data[i];
    movieGridJSX.push(
      <img
        key={movie.id}
        onClick={() => changeMovie(i)}
        className="movie-grid"
        src={movie.poster}
        alt={movie.title}
      />
    );
  }

  // main

  function randomNumber(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  }

  function MovieTitle() {
    return (
      <div className="col-12 col-md-6">
        <h1 className="movie-title">
          {data[index].title} ({Math.trunc(data[index].year)})
        </h1>
      </div>
    );
  }

  function MovieNavButtons() {
    return (
      <div className="d-flex justify-content-center">
        <div className="button-container">
          <button className="btn btn-secondary" type="button" onClick={goStart}>
            {"<<"}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handlePreviousMovie}
          >
            Previous
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleNextMovie}
          >
            Next
          </button>
          <button className="btn btn-secondary" type="button" onClick={goEnd}>
            {">>"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="containter">
        <div className="my-container border-1">
          <header className="mb-3">
            <div className="row g-3 align-items-center">
              <MovieTitle />

              <div className="col-12 col-md-6 text-md-end">
                <div className="d-flex row justify-content-end">
                  <div className="col-6">
                    <div className="page-title">
                      <h1>Oby & Aucoin's</h1>
                      <h4>Movie Profit Calculator</h4>
                      <p>
                        index: {index} | length: {data.length - 1}
                      </p>
                    </div>

                    <MovieNavButtons />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="">
            <article>
              <section className="image">
                <img className="img-fluid" src={data[index].poster} />
              </section>
              <section className="trailer">
                <MovieClip trailerId={data[index].yt_trailer_id} />
              </section>
            </article>

            <article className="d-flex align-items-start gap-4 flex-nowrap info">
              <section className="description text-start">
                <p>{data[index].description}</p>
              </section>

              <section className="details-pane d-flex text-start">
                <div className="details">
                  <ul>
                    <li>
                      <b>4Producers:</b> {data[index].producers}
                    </li>
                    <li>
                      <b>Directors:</b> {data[index].directors}
                    </li>
                    <li>
                      <b>Stars:</b> {data[index].stars}
                    </li>
                  </ul>
                </div>
                <div className="details">
                  <ul>
                    <li>
                      <b>Released:</b> {formatDate(data[index].released)}
                    </li>
                    <li>
                      <b>Runtime:</b> {data[index].runtime}
                    </li>
                    <li>
                      <b>Rating:</b> {data[index].rating}
                    </li>
                    <li>
                      <b>Genre(s):</b> {formatGenres(data[index].genres)}
                    </li>
                    {data[index].budget !== "-" && (
                      <li>
                        <b>Budget:</b> {convertToCurrency(data[index].budget)}
                      </li>
                    )}
                    {data[index].worldwide_gross !== "-" && (
                      <li>
                        <b>Gross:</b>{" "}
                        {convertToCurrency(data[index].worldwide_gross)}
                      </li>
                    )}
                  </ul>
                </div>
              </section>
            </article>

            <article>
              <section>
                <div className="d-flex flex-wrap justify-content-center movie-grid">
                  {movieGridJSX}
                </div>
              </section>
            </article>
          </main>
        </div>
      </div>
    </>
  );
}

function convertToCurrency(amount) {
  const usdFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return usdFormatted;
}

function formatGenres(genreString) {
  if (!genreString) return "";
  return genreString
    .split(",") // split into an array
    .map((g) => g.trim()) // remove extra spaces
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1)) // capitalize
    .join(", "); // join back with comma+space
}

function formatDate(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; // fallback if invalid date

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
