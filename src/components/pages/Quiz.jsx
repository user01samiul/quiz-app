import { Navigate, useNavigate, useParams } from "react-router-dom";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import useQuestions from "../../hooks/useQuestions";
import { useState, useEffect } from "react";


export default function Quiz() {
  const {videoId} = useParams()        //returns an object
  const {loading, error, questions} = useQuestions(videoId);
  const [currentQuestion, setCurrentQuestion] = useState(0);   
  const onePageQuestion = questions[currentQuestion]

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An error occured.</div>}
      {!loading && !error && onePageQuestion !=undefined && (
              <>
              <h1>{questions[currentQuestion].title}</h1>
              <h4 >Question can have multiple answers</h4>
              <Answers questions={questions} onePageQuestion={onePageQuestion}/>
              <ProgressBar setCurrentQuestion={setCurrentQuestion} length={length}
              currentQuestion={currentQuestion} />
              <MiniPlayer />
              </>)
      }
      { !onePageQuestion && currentQuestion>0 && <Navigate to="/quiz-app/result"/>}
      

    </>
  );
}
