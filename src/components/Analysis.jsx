import classes from "../styles/Analysis.module.css";
import Question from "./Question";

export default function Analysis({answers, videoId}) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <Question answers={answers} videoId={videoId}/>
    </div>
  );
}
