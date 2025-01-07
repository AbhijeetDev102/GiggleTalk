import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Video = () => {
  const [groupid, setgroupid] = useState(null);
  const handlechange = (e) => {
    setgroupid(e.target.value);
  };

  const [offer, setOffer] = useState(null);
  const [call, setCall] = useState(false);
  const [callAccepted, setcallAccepted] = useState(false);
  const socket = useSelector((state) => state.socket.socketRef);
  const pc = useRef(new RTCPeerConnection());
  const iceCandidatesQueue = useRef([]);

  pc.current.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("ice-candidate", { data: e.candidate, groupId: groupid });
    }
  };

  const [userStream, setUserStream] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const getStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    pc.current.addStream(stream);
    setMyStream(stream);
  }, []);


  const getOtherUserStream = useCallback(async () => {
    pc.current.ontrack = (event) => {
      setUserStream(event.streams[0]);
    };
  }, []);

  const joinGroup = () => {
    if (groupid) {
      socket.emit("join-group", groupid);
    } else {
      console.error("Group ID is not set");
    }
  };

  const makeCall = () => {
    getStream().then(() => {
      pc.current.createOffer().then((offer) => {
        pc.current.setLocalDescription(offer);
        if (socket) {
          socket.emit('incoming-call', offer);
        }
        console.log(offer);
      });
      console.log("call made");
      setCall(true);
    });
  };

  const receiveCall = async () => {
    await getStream();
    await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
    pc.current.createAnswer().then((answer) => {
      pc.current.setLocalDescription(answer);
      socket.emit('accept-call', answer);
      console.log(answer);
    });
    console.log("call accepted");
    

    // Add queued ICE candidates
    while (iceCandidatesQueue.current.length > 0) {
      const candidate = iceCandidatesQueue.current.shift();
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    }

    await getOtherUserStream();
  };

  const clearPeerConnection = () => {
    pc.current.close();
    console.log("Peer connection closed");
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive-call", (offer) => {
        setOffer(offer);
        console.log("incoming call", offer);
      });

      socket.on("callAccepted", (answer) => {
        
          pc.current.setRemoteDescription(new RTCSessionDescription(answer));
          console.log("call accepted", answer);
          setcallAccepted(true);
          getOtherUserStream()
      
      });

      socket.on("new-ice-candidate", (data) => {
        if (pc.current.remoteDescription) {
          pc.current.addIceCandidate(new RTCIceCandidate(data));
        } else {
          iceCandidatesQueue.current.push(data);
        }
        console.log("new ice candidate", data);
      });

      

      return () => {
        socket.off("receive-call");
        socket.off("callAccepted");
        clearPeerConnection();
      };
    }
  }, [socket]);

  useEffect(()=>{
    getOtherUserStream()
  },[callAccepted])

  useEffect(() => {
    return () => {
      clearPeerConnection();
    };
  }, []);

  return (
    <div>
      <input type="text" onChange={handlechange} />
      <button onClick={joinGroup}>Join group</button>
      <br />
      <input type="text" />
      <button onClick={() => {
        console.log(pc.current);
        makeCall();
      }}>Call</button>

      {myStream && (
        <div>
          <p>Sender Video</p>
          <video ref={(video) => { if (video) video.srcObject = myStream }} autoPlay></video>
        </div>
      )}
      {userStream && (
        <div>
          <p>Receiver Video</p>
          <video ref={(video) => { if (video) video.srcObject = userStream }} autoPlay></video>
        </div>
      )}
      {offer && (
        <div>
          <button onClick={receiveCall}>Accept call</button><br />
          <button onClick={() => {
            clearPeerConnection();
            setCall(false);
          }}>End call</button>
        </div>
      )}
    </div>
  );
};

export default Video;