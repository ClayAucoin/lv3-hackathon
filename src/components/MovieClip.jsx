import YouTube from "react-youtube";

export default function MovieClip({ trailerId }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0, // set to 1 to auto-play
    },
  };

  return (
    <div className="trailer-container">
      <YouTube videoId={trailerId} opts={opts} />
    </div>
  );
}
