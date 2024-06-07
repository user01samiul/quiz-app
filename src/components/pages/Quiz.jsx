import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import { useAuth } from "./../../contexts/AuthContext";

export default function Quiz() {
  const { currentUser } = useAuth();
  const { videoId } = useParams(); //returns an object
  const { loading, error, questions } = useQuestions(videoId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const onePageQuestion = questions[currentQuestion];
  const length = questions.length;
  // console.log(currentUser)

  const [useOptions, setUseOptions] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { videoTitle } = state;

  //submit answers to firebase database ()creating new node and navigate to result page
  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      //
      [videoId]: useOptions, //[id] = dynamic variable
    });

    navigate(`/result/${videoId}`, { state: useOptions }); //check the navigate syntax | sent state to useLocation()
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An error occured.</div>}
      {!loading && !error && onePageQuestion != undefined && (
        <>
          <h1>{questions[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            questions={questions}
            useOptions={useOptions}
            setUseOptions={setUseOptions}
            currentQuestion={currentQuestion}
            input={true}
          />
          <ProgressBar
            setCurrentQuestion={setCurrentQuestion}
            length={length}
            currentQuestion={currentQuestion}
            submit={submit}
          />
          <MiniPlayer id={videoId} title={videoTitle} />
        </>
      )}
      {/* { !onePageQuestion && currentQuestion>0 && <Navigate to="/quiz-app/result"/>} */}
      {!loading && questions.length === 0 && (
        <div>No question available for this video.</div>
      )}
    </>
  );
}
