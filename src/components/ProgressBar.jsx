import { Link } from "react-router-dom";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";



export default function ProgressBar({setCurrentQuestion}) {


  function nextBtn(){
    setCurrentQuestion((prev)=> {
     return prev+1;
   })
  }
  function prevBtn(){
    setCurrentQuestion((prev)=>{
      return prev-1;
    })
  }


  return (
    <div className={classes.progressBar}>
      <Button className={classes.backButton}  onClick={prevBtn} >
        <span className="material-icons-outlined"> arrow_back </span>
      </Button>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>24% Cimplete!</div>
        <div className={classes.rangeBody}>
        <div className={classes.progress} style={{ width: "20%" }}></div>
      </div>
      </div>
      <Link >
        <Button  className={classes.next} onClick={nextBtn} >
          <span>Next Question</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      </Link>
    </div>
  );
}
