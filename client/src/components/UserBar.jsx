import { Avatar } from "@mui/material";
import React, { useRef } from "react";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { setCallMade, setMyVideoStream, setOtherVideoStream, setRemoteConnectionInstance } from "../reduxStore/slices/call-slice";
import { useDispatch, useSelector } from "react-redux";

const UserBar = ({ group }) => {
  const dispatch = useDispatch();

  const remotePeerIdList = useSelector((state) => state.call.remotePeerIdList);
  const peer = useSelector((state) => state.call.peer);
  const groupId = useSelector((state) => state.socket.groupId);

  // function to make a call using webrtc
  const call = (remotePeerIdList) => {
    dispatch(setCallMade(true));
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        dispatch(setMyVideoStream(stream));


        const obj = remotePeerIdList.find((remotePeerId) => remotePeerId.groupId === groupId);
        if (obj) {
          console.log(obj);
          const connection = peer.connect(obj.peerId);
connection.on('open', () => {
  console.log('Connection established');
  dispatch(setRemoteConnectionInstance(connection));
});
          const call = peer.call(obj.peerId, stream);
          
          call.on("stream", (remoteStream) => {
            dispatch(setOtherVideoStream(remoteStream));
          });
        } else {
          console.log("No matching remote peer ID found");
        }
      })
      .catch((err) => {
        console.log("Failed to get local stream", err);
      });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar
          className="h-10 w-10 ring-2 ring-slate-300"
          alt={`${group.groupName}`}
          src={`${group.groupDP}`}
        />
        <h2 className="text-slate-300 text-xl">{group.groupName}</h2>
      </div>
      <div className="flex">
        <button
          className="theme-sm text-white rounded-2xl p-2 h-full w-16 flex justify-center items-center theme-hover"
          onClick={() => call(remotePeerIdList)}
        >
          <CallIcon />
        </button>
        <button
          className="theme-sm text-white rounded-2xl p-2 h-full w-16 flex justify-center items-center theme-hover"
          onClick={() => call(remotePeerIdList)}
        >
          <VideoCallIcon />
        </button>
      </div>
    </>
  );
};

export default UserBar;
