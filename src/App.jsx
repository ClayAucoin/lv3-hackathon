import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

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

  let pageContent = <Home />;

  if (currentPage === "home") {
    pageContent = <Home />;
  } else if (currentPage === "gallery") {
    pageContent = <Gallery />;
  } else if (currentPage === "about") {
    pageContent = <About />;
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
      {pageContent}
    </>
  );
}
