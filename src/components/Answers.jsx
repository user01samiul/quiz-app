import { useEffect, useState } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
// import _ from 'lodash';

export default function Answers({
  onePageQuestion,
  questions,
  currentQuestion,
  useOptions,
  setUseOptions,
}) {
  const [overFlow, setOverFlow] = useState(false);

  //set isChecked : false, in all question options  -- on first render
  useEffect(() => {
    useOptions &&
      questions.length > 0 &&
      setUseOptions(
        questions.map((question) => {
          return {
            ...question,
            options: question.options.map((option) => {
              return { ...option, isChecked: false };
            }),
          };
        })
      );
  }, []);

  //overflow
  useEffect(() => {
    if (
      useOptions &&
      questions.length > 0 &&
      currentQuestion >= questions.length
    ) {
      setOverFlow(true);
    } else {
      setOverFlow(false);
    }
  }, [currentQuestion, questions]);

  //handle change for checked options
  const handleChange = (e, id) => {
    setUseOptions((prevOptions) => {
      return prevOptions.map((question, index) => {
        return index === currentQuestion
          ? {
              ...question,
              options: question.options.map((object, indexOfObject) => {
                return indexOfObject === id
                  ? { ...object, isChecked: e.target.checked }
                  : object;
              }),
            }
          : question;
      });
    });
  };

  // console.log(useOptions);

  const elements =
    useOptions && useOptions.length > 0 && !overFlow && (
      useOptions[currentQuestion].options.map((option, index) => {
        return (
          <Checkbox
            className={classes.answer}
            text={option.title}
            key={index}
            checked={option.isChecked}
            onChange={(e) => handleChange(e, index)}
          />
        );
      })
    ) 

  return <div className={classes.answers}>{elements}</div>;
}
