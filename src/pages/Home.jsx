import "./Home.css";

export default function Home(props) {
  // retrieve props
  const {
    data,
    currentGenre,
    onSelectMovie,
    allGenres,
    onChangeGenre,
    onFirstGenre,
    onLastGenre,
    onPrevGenre,
    onNextGenre,
  } = props;

  // build movie grid for current genre
  let movieGridJSX = [];
  for (let index = 0; index < data.length; index++) {
    const movie = data[index];
    const movieGenres = movie.genres || "";

    if (
      movieGenres
        .toLowerCase()
        .split(",")
        .map((g) => g.trim())
        .includes(currentGenre.toLowerCase())
    ) {
      movieGridJSX.push(
        <img
          key={index}
          onClick={() => onSelectMovie(index)}
          id={index}
          className="movie-grid"
          src={movie.poster}
          alt={movie.title}
        />
      );
    }
  }

  // filter: get qty of movies in current genre
  const matchingMovies = data.filter((movie) =>
    (movie.genres || "")
      .toLowerCase()
      .split(",")
      .map((genre) => genre.trim())
      .includes(currentGenre.toLowerCase())
  );

  return (
    <>
      <div className="containter">
        <main>
          {/* ************************************************ */}
          {/* **              side-by-side                  ** */}
          {/* ************************************************ */}
          <header className="mb-3">
            <div className="row">
              <div className="col-4 align-self-center page-title">
                <h1>Oby-Aucoin's</h1>
                <h4>Movie List</h4>
              </div>
              <div className="col-8">
                <section className="d-flex justify-content-center genre-btns">
                  <div className="genre-flex">
                    {allGenres.map((genre) => (
                      <button
                        onClick={() => onChangeGenre(genre)}
                        className={`btn btn-primary ${
                          genre === currentGenre ? "is-active" : ""
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </header>
          {/* ************************************************ */}
          {/* **             stacked                        ** */}
          {/* ************************************************ */}
          {/* <header className="mb-3">
            <div className="page-title">
              <h1>Oby-Aucoin's</h1>
              <h4>Movie List</h4>
            </div>
          </header>
          <article>
            <section className="d-flex justify-content-center genre-btns">
              <div className="genre-flex">
                {allGenres.map((genre) => (
                  <button
                    onClick={() => onChangeGenre(genre)}
                    className={`btn btn-primary ${
                      genre === currentGenre ? "is-active" : ""
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </section>
          </article> */}
          {/* ************************************************ */}
          {/* **                                            ** */}
          {/* ************************************************ */}
          <article>
            <section className="current-genre">
              {currentGenre && (
                <h1>
                  {currentGenre} ({matchingMovies.length})
                </h1>
              )}

              {currentGenre && (
                <div className="genre-nav-buttons">
                  <button className="genre-nav-button" onClick={onFirstGenre}>
                    ⏮
                  </button>
                  <button className="genre-nav-button" onClick={onPrevGenre}>
                    ◀
                  </button>
                  <button className="genre-nav-button" onClick={onNextGenre}>
                    ▶
                  </button>
                  <button className="genre-nav-button" onClick={onLastGenre}>
                    ⏭
                  </button>
                </div>
              )}
            </section>
            {currentGenre && (
              <section className="movie-grid justify-content-center">
                {movieGridJSX}
              </section>
            )}
          </article>
        </main>
      </div>
    </>
  );
}
