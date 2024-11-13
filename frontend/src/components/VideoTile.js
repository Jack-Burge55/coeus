import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import Video from "./Video";

import toggleLikeVideo from "../userApi/toggleLikeVideo";
import getUser from "../userApi/getUser";
import * as constants from "../constants";

const VideoTile = ({ url, videoId, majorTopics, minorTopics, likeCount, usersOwn, uploadedByName, uploadedBy }) => {
  const navigate = useNavigate();
  const { coeusUser, setCoeusUser } = useContext(UserContext);
  const [userLikesVideo, setUserLikesVideo] = useState(coeusUser.likedVideos.includes(videoId))  

  // call delete video API
  const deleteVideo = async (videoId) => {
    try {
      const url = new URL(`${constants.usedUrl}/api/v1/videos/`);
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorisation: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          videoId,
        }),
      })
        .then(getUser(setCoeusUser))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {uploadedByName && <p>{uploadedByName}</p>}
      <Video
        url={url}
        majorTopics={majorTopics}
        minorTopics={minorTopics}
      ></Video>
      {!usersOwn && (
        <div>
            {uploadedBy && <button onClick={() => navigate(`/profile/${uploadedBy}`)}>Go To Profile</button>}
            <button
            onClick={() => {
              toggleLikeVideo(videoId, setCoeusUser, !userLikesVideo ? "like" : "unlike")
              setUserLikesVideo(!userLikesVideo);              
              }
            }
          >
            {userLikesVideo ? "Unlike Video" : "Like Video"}
          </button>
        </div>
      )}
      {usersOwn && (
        <div>
          <button onClick={() => deleteVideo(videoId)}>Delete Video</button>
        </div>
      )}
      <p>Like Count: {likeCount}</p>
    </>
  );
};

export default VideoTile;
