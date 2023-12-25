import { Navigate, useNavigate, useParams } from "react-router-dom";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import useQuestions from "../../hooks/useQuestions";
import { useState, useEffect } from "react";
import { useAuth } from './../../contexts/AuthContext';
import { getDatabase, ref, set } from "firebase/database";


export default function Quiz() {
  const {currentUser} = useAuth()
  const {videoId} = useParams()        //returns an object
  const {loading, error, questions} = useQuestions(videoId);
  const [currentQuestion, setCurrentQuestion] = useState(0);   
  const onePageQuestion = questions[currentQuestion]
  const length = questions.length

  const [useOptions, setUseOptions] = useState([])
  const navigate = useNavigate()


  //submit answers to firebase database ()creating new node and navigate to result page
  async function submit(){
    const {uid} = currentUser;

    const db = getDatabase()
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {      //
      [videoId] : useOptions,          //[id] = dynamic variable
    });

    navigate(`/quiz-app/result/${videoId}`, {state : useOptions}) //check the navigate syntax | sent state to useLocation()
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An error occured.</div>}
      {!loading && !error && onePageQuestion !=undefined && (
              <>
              <h1>{questions[currentQuestion].title}</h1>
              <h4 >Question can have multiple answers</h4>
              <Answers questions={questions} 
              useOptions={useOptions} 
              setUseOptions={setUseOptions}
              currentQuestion={currentQuestion}
              input = {true}
              />
              <ProgressBar setCurrentQuestion={setCurrentQuestion} length={length}
              currentQuestion={currentQuestion} submit={submit} />
              <MiniPlayer id={videoId} title={questions[currentQuestion].title}/>
              </>)
      }
      {/* { !onePageQuestion && currentQuestion>0 && <Navigate to="/quiz-app/result"/>} */}
      {questions.length===0 && <div>No question available for this video.</div>}
      

    </>
  );
}
