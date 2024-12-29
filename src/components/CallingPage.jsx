import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyStream, setRemoteStream } from "../features/chat";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CallingPage = ({ callType }) => {
  const chatUser = useSelector((state) => state.chat.chatUser);
  const myStream = useSelector((state) => state.chat.myStream);
  const contactId = useSelector((state) => state.chat.contactId);
  const socket = useSelector((state) => state.chat.socket);
  const peer = useSelector((state) => state.chat.peer);
  const offer = useSelector((state) => state.chat.offer);
  const currentUser = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access the navigate function for navigation
  console.log(chatUser);

  const playRingtone = () => {
    const audio = new Audio("../assets/incoming.mp3");
    audio.loop = true;
    audio.play();
    return audio;
  };
  const stopRingtone = (audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    const audio = playRingtone();
    return () => stopRingtone(audio);
  }, []);

  const handleAcceptCall = useCallback(async () => {
    console.log(`Incoming Call`, offer);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", {
      to: contactId,
      from: currentUser.username,
      ans,
    });
    // Set the user's stream in Redux store
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    dispatch(setMyStream(stream));
    navigate("/videoCalling");
  }, [
    contactId,
    currentUser.username,
    dispatch,
    navigate,
    offer,
    peer,
    socket,
  ]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      console.log("peer:nego:needed", from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", {
        to: contactId,
        from: currentUser.username,
        ans,
      });
    },
    [contactId, currentUser.username, peer, socket]
  );

  const handleNegoNeedFinal = useCallback(
    async ({ ans, from }) => {
      console.log("Final negotiation needed ", from);
      await peer.setLocalDescription(ans);
    },
    [peer]
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      console.log(remoteStream);
      dispatch(setRemoteStream(remoteStream[0]));
      // setRemoteStream(remoteStream[0]);
    });
  }, [dispatch, peer.peer]);

  useEffect(() => {
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [handleNegoNeedFinal, handleNegoNeedIncomming, socket]);

  const handleDeclineCall = () => {
    socket.emit("call:rejected", {
      to: contactId,
      from: currentUser.username,
    });
    toast.success(`Call declined by the ${contactId}`);
    navigate(`/chat/${contactId}`);
    window.location.reload(); // This will reload the entire page
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <img
              src={chatUser.profilePicture}
              alt="Caller Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{chatUser.name}</h2>
            <p className="text-gray-500 text-sm">{callType}</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-center">
            {/* Accept Button */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md flex items-center space-x-2 transition w-full sm:w-auto"
              onClick={() => handleAcceptCall()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15.793 5.793a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1-1.414-1.414L17.586 9H11a6 6 0 0 0-6 6v4a1 1 0 0 1-2 0v-4a8 8 0 0 1 8-8h6.586l-1.293-1.293a1 1 0 0 1 0-1.414z" />
              </svg>
              <span>Answer</span>
            </button>

            {/* Decline Button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md flex items-center space-x-2 transition w-full sm:w-auto"
              onClick={() => handleDeclineCall()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636"
                />
              </svg>
              <span>Decline</span>
            </button>
          </div>
          <div className="mt-4 text-gray-400 text-xs">
            <p>Ringing...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallingPage;
