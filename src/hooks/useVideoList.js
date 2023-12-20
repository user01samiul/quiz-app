//custom hook for using data from firebase database in many components
import { useEffect, useState } from "react";

//database functions
import {
  getDatabase,
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
/*getDatabase  = to use Database | returns the instance of the Realtime 
    ref =  is a reference to the location in the database where you want to read data.
    query = The query() function is often used to create a query object with specific conditions. This object is then used to retrieve data from the Firestore database.
    get = get() is called on the reference to fetch DataSnapshot once.

  */

export default function useVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    //getting data from database is an asynchronous process,
    //but we useEffect() wants a synchornous function
    //so do the async work we'll make an async function in it.

    async function fetchVideos() {
      //database related works
      const db = getDatabase();
      const videosRef = ref(db, "videos"); //videos node 
      //we can hit anynode in firebase by using path | learn in useQuestions.js hook ***
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),   //takes string
        limitToFirst(6)       //takes number
      ); //node ref, how will i get data from videos (according to order), start getting data from(string), get first 6 from starting

      //but this will receive data only one time | we want to continue to get data while scrolling
      //we'll use this npm package - https://www.npmjs.com/package/react-infinite-scroll-component

      try {
        setError(false);
        setLoading(true);
        //request data from firebase
        const snapShot = await get(videoQuery); //fetching data once | async | returns a promise
        setLoading(false); //imp!
        if (snapShot.exists()) {
          //checking if data exists | exists() is a method of get()
          setVideos((prev) => {
            return [...prev, ...Object.values(snapShot.val())]; //converting object values into array and destructured | videoQuery values are in snapShot.val()
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos(); //must call the async function in useEffect()
  }, [page]);

  return {
    //an object
    loading,
    error,
    videos,
    hasMore,
  };
}
