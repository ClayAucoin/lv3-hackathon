import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import MovieView from "./pages/MovieView";
import Profit from "./pages/Profit";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  function goToHome() {
    setCurrentPage("home");
  }

  function goToGallery() {
    setCurrentPage("gallery");
  }

  function goToAbout() {
    setCurrentPage("about");
  }

  function goToMovieView() {
    setCurrentPage("movieview");
  }

  function goToProfit() {
    setCurrentPage("profit")
  }

  let pageContent = <Home />;

  if (currentPage === "home") {
    pageContent = <Home />;
  } else if (currentPage === "gallery") {
    pageContent = <Gallery />;
  } else if (currentPage === "about") {
    pageContent = <About />;
  } else if (currentPage === "movieview") {
    pageContent = <MovieView />;
  } else if (currentPage === "profit") {
    pageContent = <Profit />;
  }

  return (
    <>
      <div>app</div>
      <button type="button" onClick={goToHome}>
        Home
      </button>
      <button type="button" onClick={goToGallery}>
        Gallery
      </button>
      <button type="button" onClick={goToAbout}>
        About
      </button>
      <button type="button" onClick={goToMovieView}>
        Movie View
      </button>
      <button type="button" onClick={goToProfit}>
        Profit Calculator
      </button>
      {pageContent}
    </>
  );
}
