import image from "../assets/images/3.jpg";
import classes from "../styles/Video.module.css";

export default function Video({title, id, noq}) {
  return (
      <div className={classes.video}>
        <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
        <p>{title}</p>
        <div className={classes.qmeta}>
          <p>{noq} Questions</p>
          {noq ? <p>Total Points : 100</p> : <p>Total Points : None</p>}
          
        </div>
      </div>
  );
}

//getting image (thumb) from yooutube using id in max resolution = http://img.youtube.com/vi/${id}/maxresdefault.jpg