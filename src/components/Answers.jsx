import { useState, useEffect } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
// import _ from 'lodash';



export default function Answers({onePageQuestion}) {

  const [useOptions, setUseOptions] = useState([])
  const cloned = onePageQuestion && onePageQuestion.options;
    

  useEffect(()=>{   //adding false to the cloned object
    onePageQuestion && setUseOptions(cloned.map((object)=>{
      return {...object, isChecked : false}
    }))
  },[cloned, onePageQuestion])

  const handleChange = (e,id)=>{
      setUseOptions((prevData)=>{
        return prevData.map((object,index)=>{
          return id===index? {...object, isChecked : e.target.checked} : object ;
        })
      })
  }

    const elements = onePageQuestion && useOptions.map((option,index)=>{
      return <Checkbox  className={classes.answer} text={option.title} key={index} 
      checked={option.isChecked}
      onChange={(e)=>handleChange(e,index)}
      />
    }) 


    return (
      <div className={classes.answers}>
        {elements}
      </div>
    );
  }
  
