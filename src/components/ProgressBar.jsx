import { Link } from "react-router-dom";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";



export default function ProgressBar({currentQuestion, setCurrentQuestion, length, submit}) {


  //next & prev button
  function nextBtn(){
    setCurrentQuestion((prev)=> {
     return prev+1;
   })
  }
  function prevBtn(){
    setCurrentQuestion((prev)=>{
       if (prev>0) {
        return prev-1;
       } else{
        return prev
       }
    })
  }

  //percentage calculation
  const percentage = length>0 && ((currentQuestion+1) / length ) *100


  return (
    <div className={classes.progressBar}>
      <Button className={currentQuestion>0? classes.backBtn : classes.backBtnInvisible}  onClick={prevBtn} >
        <span className="material-icons-outlined"> arrow_back </span>
      </Button>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>24% Cimplete!</div>
        <div className={classes.rangeBody}>
        <div className={classes.progress} style={{ width: `${percentage}%` }}></div>
      </div>
      </div>
        <Button  className={classes.next} onClick={percentage===100? submit : nextBtn} >
          <span>{percentage !== 100 ? "Next Question" : "Submit"}</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
    </div>
  );
}
