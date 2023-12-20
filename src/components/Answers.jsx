import { useState, useEffect } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
import _ from 'lodash';



export default function Answers({questions,currentQuestion}) {

  const [useOptions, setUseOptions] = useState([])

    const onePageQuestion = questions[currentQuestion]
    const [isPresent, setIsPresent] = useState(false)
    const cloned = onePageQuestion.options;
    

  useEffect(()=>{   //adding false to the cloned object
    setIsPresent(false)
    questions.length>0 && setUseOptions(cloned.map((object)=>{
      return {...object, isChecked : false}
    }))
    setIsPresent(true)

  },[cloned, questions.length])

  const handleChange = (e,id)=>{
      setUseOptions((prevData)=>{
        return prevData.map((object,index)=>{
          return id===index? {...object, isChecked : e.target.checked} : object
        })
      })
  }


    
    console.log(useOptions)

    const elements = isPresent ? useOptions.map((option,index)=>{
      return <Checkbox  className={classes.answer} text={option.title} key={index} 
      checked={option.isChecked}
      onChange={(e)=>handleChange(e,index)}
      />
    }) : <div>Aquiring data...</div>

  
    return (
      <div className={classes.answers}>
        {elements}
      </div>
    );
  }
  
// }
