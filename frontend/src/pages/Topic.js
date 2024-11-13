import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { VideoTile } from "../components";
import * as constants from "../constants";

const Topic = () => {
  const { coeusUser } = useContext(UserContext);
  const [topicVideos, setTopicVideos] = useState([]);
  const topicString = window.location.href.split("topic/")[1];
  const topicTitle = topicString?.split("-").map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  }).join(" ");  

  useEffect(() => { 
    try {
      const url = new URL(`${constants.usedUrl}/api/v1/videos/topic/${topicString}`);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorisation: `Bearer ${localStorage.userToken}`,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            setTopicVideos([])
          }
          return response.json();
        })
        .then((data) => {
          if (data.videos)
            {
          setTopicVideos(data.videos)
        };
        });
    } catch (error) {
      console.log(error);
    }
  }, [topicString, coeusUser]);

  return (
    <div>
      <h2>{topicTitle}</h2>
      {topicVideos.map((video) => {
        return (
          <div key={video._id}>
            <VideoTile
              url={video.url}
              videoId={video._id}
              majorTopics={video.majorTopics}
              minorTopics={video.minorTopics}
              likeCount={video.likeCount}
              usersOwn={video.uploadedBy === localStorage.userId}
              uploadedByName={video.uploadedByName}
              uploadedBy={video.uploadedBy}
            ></VideoTile>
          </div>
        );
      })}
    </div>
  );
};

export default Topic;
