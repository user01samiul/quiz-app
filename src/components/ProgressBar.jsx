import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({
  currentQuestion,
  setCurrentQuestion,
  length,
  submit,
}) {
  //hooks for tooltip
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  //next & prev button
  function nextBtn() {
    setCurrentQuestion((prev) => {
      return prev + 1;
    });
  }
  function prevBtn() {
    setCurrentQuestion((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  }

  //percentage calculation
  const percentage = length > 0 && ((currentQuestion + 1) / length) * 100;

  //tooltip
  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      //manipulated the dom dynamically | can't do this with css
      tooltipRef.current.style.left = `calc(${percentage}% - 64px)`;
      tooltipRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <Button
        className={
          currentQuestion > 0 ? classes.backBtn : classes.backBtnInvisible
        }
        onClick={prevBtn}
      >
        <span className="material-icons-outlined"> arrow_back </span>
      </Button>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {percentage}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${percentage}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={percentage === 100 ? submit : nextBtn}
      >
        <span>{percentage !== 100 ? "Next Question" : "Submit"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
