import image from "../assets/images/success.png";
import classes from "../styles/Summary.module.css";

export default function Summary(props) {
  const {userScore: score} = props;      //alias
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />{score} out of 100
        </p>
      </div>

      <div className={classes.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
}
