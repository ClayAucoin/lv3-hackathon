import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import MovieView from "./pages/MovieView";
import data from "./data/enriched-collection.json";

// build genre list
const ALL_GENRES = Array.from(
  new Set(
    data
      .flatMap((r) => (r.genres || "").split(","))
      .map((g) => g.trim().toLowerCase())
      .filter(Boolean)
  )
)
  .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
  .sort((a, b) => a.localeCompare(b));

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [currentGenre, setCurrentGenre] = useState("");

  // navigation
  function goToHome() {
    setCurrentPage("home");
  }

  function goToMovieView(index) {
    setSelectedMovieIndex(Number.isInteger(index) ? index : 0);
    setCurrentPage("movieview");
  }

  function firstGenre() {
    if (ALL_GENRES.length) setCurrentGenre(ALL_GENRES[0]);
  }

  function lastGenre() {
    if (ALL_GENRES.length) setCurrentGenre(ALL_GENRES[ALL_GENRES.length - 1]);
  }

  function nextGenre() {
    if (!ALL_GENRES.length) return;
    const i = ALL_GENRES.indexOf(currentGenre);
    const next = i === -1 ? 0 : Math.min(i + 1, ALL_GENRES.length - 1);
    setCurrentGenre(ALL_GENRES[next]);
  }

  function prevGenre() {
    if (!ALL_GENRES.length) return;
    const i = ALL_GENRES.indexOf(currentGenre);
    const prev = i === -1 ? 0 : Math.max(i - 1, 0);
    setCurrentGenre(ALL_GENRES[prev]);
  }

  let pageContent = <Home />;

  if (currentPage === "home") {
    pageContent = (
      <Home
        data={data}
        allGenres={ALL_GENRES}
        currentGenre={currentGenre}
        onChangeGenre={setCurrentGenre}
        onSelectMovie={goToMovieView}
        onFirstGenre={firstGenre}
        onPrevGenre={prevGenre}
        onNextGenre={nextGenre}
        onLastGenre={lastGenre}
      />
    );
  } else if (currentPage === "movieview") {
    pageContent = (
      <MovieView
        data={data}
        movieIndex={selectedMovieIndex}
        onBackHome={goToHome}
        currentGenre={currentGenre}
      />
    );
  }

  return (
    <>
      {/* <button type="button" onClick={goToCalculator}>
        Calculator
      </button> */}
      {pageContent}
    </>
  );
}
