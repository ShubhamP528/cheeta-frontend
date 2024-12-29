import React, { useState, useCallback, useEffect } from "react";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setMyStream, setRemoteStream } from "../features/chat";
import { useNavigate } from "react-router-dom";

const AudioCalling = () => {
  // const myStream = useSelector((state) => state.chat.myStream);
  // const remoteStream = useSelector((state) => state.chat.remoteStream);
  // const contactId = useSelector((state) => state.chat.contactId);
  // const socket = useSelector((state) => state.chat.socket);
  // const currentUser = useSelector((store) => store.user.user);
  // const [isMuted, setIsMuted] = useState(false); // Track mute state
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // // Function to handle mute/unmute
  // const handleMuteUnmute = useCallback(() => {
  //   if (myStream) {
  //     const audioTrack = myStream.getAudioTracks()[0];
  //     if (audioTrack) {
  //       audioTrack.enabled = !audioTrack.enabled; // Toggle mute/unmute
  //       setIsMuted(audioTrack.enabled); // Update mute state
  //       toast.info(`Mic ${audioTrack.enabled ? "unmuted" : "muted"}`);
  //     }
  //   }
  // }, [myStream]);

  // // End the call and stop media tracks
  // const endCall = useCallback(() => {
  //   if (myStream) {
  //     myStream.getTracks().forEach((track) => {
  //       track.stop(); // Stop each track
  //     });
  //   }
  //   // Close the connection and reset streams
  //   dispatch(setRemoteStream(null)); // Reset remote stream in Redux state
  //   dispatch(setMyStream(null)); // Reset my stream in Redux state
  //   socket.emit("call:ended", { from: currentUser.username, to: contactId });
  //   toast.success("Call Ended!", { autoClose: 3000 });
  //   navigate(`/chat/${contactId}`); // Navigate back to chat
  // }, [myStream, socket, currentUser.username, contactId, dispatch, navigate]);

  // // Handle when the call is rejected by the other user
  // const handleRejectCall = useCallback(() => {
  //   dispatch(setRemoteStream(null));
  //   dispatch(setMyStream(null));
  //   toast.error(`Call rejected by ${contactId}`);
  //   navigate(`/chat/${contactId}`);
  // }, [dispatch, contactId, navigate]);

  // useEffect(() => {
  //   socket.on("call:rejected", handleRejectCall);
  //   return () => {
  //     socket.off("call:rejected", handleRejectCall);
  //   };
  // }, [socket, handleRejectCall]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {/* Audio Call UI */}
      <div className="relative w-4/5 h-4/5 bg-black rounded-lg shadow-lg flex items-center justify-center text-white">
        {/* Call Status */}
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <div className="text-2xl">
            {"remoteStream" ? "Call in progress..." : "Calling..."}
          </div>
        </div>

        {/* Controls Section */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8">
          {/* Mute/Unmute Button */}
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-md flex items-center justify-center transition"
            onClick={"handleMuteUnmute"}
          >
            {"isMuted" ? <IoMdMicOff /> : <IoMdMic />}
          </button>

          {/* End Call Button */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-md flex items-center justify-center transition"
            onClick={"endCall"}
          >
            <MdCallEnd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCalling;
