import { Link } from "react-router-dom";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
import useVideoList from "../hooks/useVideoList";
import InfiniteScroll from 'react-infinite-scroll-component';
import React,{ useState } from "react";

export default function Videos() {
  const [page, setPage] = useState(1)
  const { loading, error, videos, hasMore } = useVideoList(page)

console.log('component rendered')
  return (
    <div className={classes.videos}>
      {videos.length> 0 && (
        //Infitite component npm package - https://www.npmjs.com/package/react-infinite-scroll-component
      <InfiniteScroll dataLength={videos.length} next={()=> setPage(page + 8)} hasMore={hasMore}>        {/*wrapped with infinite scroll*/}
              {videos.map((video)=>{
        return (
          <Link to="/quiz-app/quiz" key={video.youtubeID} >
            <Video 
            title={video.title}
            id={video.youtubeID}
            noq={video.noq}
            />
        </Link> 
        )
      })}
     </InfiniteScroll>
      )}
      {(!loading && videos.length===0) && <div>Video data not found</div> }
      {error && <div>There was an error.</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
