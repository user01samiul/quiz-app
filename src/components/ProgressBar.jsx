import { Link } from "react-router-dom";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({setCurrentQuestion}) {

  function nextBtn(){
    setCurrentQuestion((prev)=> {
     return prev+1;
   })
}

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>24% Cimplete!</div>
        <div className={classes.rangeBody}>
        <div className={classes.progress} style={{ width: "20%" }}></div>
      </div>
      </div>
      <Link>
        <Button  className={classes.next} onClick={nextBtn}>
          <span>Next Question</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      </Link>
    </div>
  );
}
