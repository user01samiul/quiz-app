import Analysis from "../Analysis";
import Summary from "../Summary";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash"
import { useEffect } from "react";

export default function Result() {
  const {videoId} = useParams()
  const {state} = useLocation()   //received state from useLocation()
  const {loading, error, answers} = useAnswers(videoId)
  const qna = state



  // calculating score
  function calculateScore(){
    let score = 0
    
    answers && answers.forEach((question, index1)=>{
      const correctAnswers = []   // generating arrayfor each question 
      const userAnswers = []      //               ''
  
        question.options.forEach((object,index2)=>{
    //setting correct answers array | pushing correfct answer's object indexes into array
          if(object.correct) { correctAnswers.push(index2) }
    //setting user answers array | if isChecked === true we'll push the objects index
          if(qna[index1].options[index2].isChecked === true) {
          userAnswers.push(index2)
          object.isChecked = true;    //set new object key and property | pushed user answers to 'answers object'

        }
      })
      //lodash function to check if both arrays are structurally same (no matter how nested)
      if(_.isEqual(correctAnswers, userAnswers)) {
        score = score+1;
      }
    })


    //score in percentage
    const length = state && state.length;
    const percentage = (score/length) *100;
    return percentage;

  }   //function end

  const userScore = calculateScore()
    console.log(answers)
  
  return (
    <>
      <Summary userScore={userScore}/>
      <Analysis answers={answers} videoId={videoId}/>
    </>
  );
}
