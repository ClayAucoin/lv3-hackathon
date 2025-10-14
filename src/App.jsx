import { useState } from "react";
import "./App.css";

import data from "./data/bechdel-test.json";

console.log(data[50].title);
console.log(data[50].poster);

function App() {
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
        {movie.title} ({Math.trunc(data[i].year)}) ({movie.id - 1})
      </li>
    );
  }

  // movieListJSX = data.map(movie => <li> {movie.title} </li>)

  return (
    <>
      <div className="container my-container">
        <h1>Movie</h1>
        <p>
          index: {index} | length: {data.length - 1}
        </p>
        <div className="button-container d-flex justify-content-between">
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
        <h1>
          {data[index].title} ({Math.trunc(data[index].year)})
          {data[index].title} ({data[index].year})
        </h1>
        <img src={data[index].poster} />
        <br />
        {/* {data[index].poster} */}

        <ul>{movieListJSX}</ul>
      </div>
    </>
  );
}

export default App;
