//custom hook
import { useEffect, useState } from "react";
import { getDatabase, get, orderByKey, query, ref } from "firebase/database";

export default function useQuestions(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      //we can hit anynode in firebase by using path
      const questionsRef = ref(db, "quiz/" + videoId + "/questions");
      const questionQuery = query(
        questionsRef,
        orderByKey()
        //we'll get all the questions so no need startAt() & limitToFirst()
      );

      try {
        setError(false);
        setLoading(true);
        //request data from firebase
        const snapShot = await get(questionQuery); //fetching is an async process
        setLoading(false);

        if (snapShot.exists()) {
          setQuestions((prev) => {
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
    questions,
    hasMore,
  };
}
