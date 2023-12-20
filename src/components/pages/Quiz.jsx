import { useParams } from "react-router-dom";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import useQuestions from "../../hooks/useQuestions";
import { useState } from "react";


export default function Quiz() {
  const {videoId} = useParams()        //returns an object
  const {loading, error, questions} = useQuestions(videoId);
  const [currentQuestion, setCurrentQuestion] = useState(0)   //
  // console.log(questions.length)


  // console.log(clonedOptions)
  

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>An error occured.</div>}
      {!loading && !error && (<>
              <h1>{questions[currentQuestion].title}</h1>
              <h4 >Question can have multiple answers</h4>
              <Answers questions={questions} currentQuestion={currentQuestion}/>
              <ProgressBar setCurrentQuestion={setCurrentQuestion} />
              <MiniPlayer />
              </>
      )}
    </>
  );
}
