//custom hook
import { useEffect, useState } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      //we can hit anynode in firebase by using path
      const answersRef = ref(db, "answers/" + videoId + "/questions");
      const answerQuery = query(
        answersRef,
        orderByKey()
        //we'll get all the questions so no need startAt() & limitToFirst()
      );

      try {
        setError(false);
        setLoading(true);
        //requesting data from firebase
        const snapShot = await get(answerQuery); //fetching is an async process
        setLoading(false);

        if (snapShot.exists()) {
          setAnswers((prev) => {
            return [...prev, ...Object.values(snapShot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
