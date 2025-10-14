import { useState } from "react";
import "./App.css";
// import data from "./data/bechdel-test.json";
import data from "./data/enriched-collection.json";
import MovieClip from "./components/MovieClip";

export default function App() {
  const [index, setIndex] = useState(1157);

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

  return (
    <>
      <div className="containter">
        <div className="my-container">
          <header className="mb-3">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-6">
                <h1 className="movie-name">
                  {data[index].title} ({Math.trunc(data[index].year)})
                </h1>
              </div>
              <div className="col-12 col-md-6 text-md-end">
                <h1>Movie Lookup</h1>
                <p>
                  index: {index} | length: {data.length - 1}
                </p>
                <div className="button-outter-container">
                  <div className="button-container">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={goStart}
                    >
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
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={goEnd}
                    >
                      {">>"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <article>
              <section className="image">
                <img className="img-fluid" src={data[index].poster} />
              </section>
              <section className="description">
                <MovieClip trailerId={data[index].yt_trailer_id} />
              </section>
            </article>
            <article className="d-flex info">
              <section className="text-start me-4">
                <p>{data[index].description}</p>
              </section>
              <section className="d-flex text-start ms-4 details">
                <div className="details">
                  <ul className="details">
                    <li>
                      <b>Released:</b> {data[index].released}
                    </li>
                    <li>
                      <b>Runtime:</b> {data[index].runtime}
                    </li>
                    <li>
                      <b>Rating:</b> {data[index].rating}
                    </li>
                    <li>
                      <b>Genre(s):</b> {data[index].genres}
                    </li>
                    {data[index].budget !== "-" && (
                      <li>
                        <b>Budget:</b> {data[index].budget}
                      </li>
                    )}
                    {data[index].worldwide_gross !== "-" && (
                      <li>
                        <b>Gross:</b> {data[index].worldwide_gross}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="details">
                  <ul className="details">
                    <li>
                      <b>Producers:</b> {data[index].producers}
                    </li>
                    <li>
                      <b>Directors:</b> {data[index].directors}
                    </li>
                    <li>
                      <b>Stars:</b> {data[index].stars}
                    </li>
                    <li>
                      <b>Genre(s):</b> {data[index].genres}
                    </li>
                  </ul>
                </div>
              </section>
            </article>
          </main>
        </div>
      </div>
    </>
  );
}
