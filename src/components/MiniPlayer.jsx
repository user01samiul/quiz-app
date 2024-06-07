import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, videoTitle }) {
  //miniplayer functionality
  const [status, setStatus] = useState(false);
  const buttonRef = useRef();

  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  function toggleMiniPlayer() {
    if (!status) {
      setStatus(true);
      buttonRef.current.classList.remove(classes.floatingBtn);
    } else {
      setStatus(false);
      buttonRef.current.classList.add(classes.floatingBtn);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      {/* <img src={image} alt="Alt Tag" /> */}
      <ReactPlayer
        url={videoUrl}
        width={`300px`}
        height="168px"
        playing={status}
        controls
      />
      <p>{videoTitle}</p>
    </div>
  );
}
