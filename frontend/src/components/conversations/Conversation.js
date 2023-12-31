import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => {
      //error in conversation part
      return m !== currentUser._id;
    });
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversation-image"
      />
      <span className="conversation-name">{user?.username}</span>
    </div>
  );
}
