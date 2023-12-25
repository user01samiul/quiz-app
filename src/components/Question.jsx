import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({ answers }) {
  return (
    <>
      {answers &&
        answers.map((question, index) => {
          return (
            <div className={classes.question} key={index}>
              <div className={classes.qtitle}>
                <span className="material-icons-outlined"> help_outline </span>
                {question.title}
              </div>
              <Answers
                input={false}
                options={question.options}
                answers={answers} //forwarded 'answers'
              />
            </div>
          );
        })}
    </>
  );
}
