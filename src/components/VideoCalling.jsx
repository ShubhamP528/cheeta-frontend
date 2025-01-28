import React, { useCallback, useEffect, useState } from "react";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdCallEnd, MdFlipCameraIos } from "react-icons/md";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setMyStream, setRemoteStream } from "../features/chat";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdMic, IoMdMicOff } from "react-icons/io";

const VideoCallPage = () => {
  const myStream = useSelector((state) => state.chat.myStream);
  const remoteStream = useSelector((state) => state.chat.remoteStream);
  const contactId = useSelector((state) => state.chat.contactId);
  const socket = useSelector((state) => state.chat.socket);
  const peer = useSelector((state) => state.chat.peer);
  const currentUser = useSelector((store) => store.user.user);
  const [Rstream, setRstream] = useState(null);
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  const [cameraStream, setCameraStream] = useState(null); // Store current camera stream
  const [currentCamera, setCurrentCamera] = useState(null); // Store current camera device

  const navigate = useNavigate();

  console.log(remoteStream);
  console.log(myStream);

  const dispatch = useDispatch();

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    console.log("Negotiation needed");
    socket.emit("peer:nego:needed", {
      offer,
      from: currentUser.username,
      to: contactId,
    });
  }, [contactId, currentUser.username, peer, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded, peer.peer]);

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
      sendStreams();
    },
    [peer]
  );

  // const sendStreams = useCallback(() => {
  //   for (const track of myStream.getTracks()) {
  //     console.log("Sending Tracks");
  //     peer?.peer?.addTrack(track, myStream);
  //   }
  // }, [myStream, peer.peer]);

  const sendStreams = useCallback(() => {
    // Iterate over the tracks of the stream
    myStream.getTracks().forEach((track) => {
      // Check if the track has already been added to the peer connection
      const sender = peer.peer.getSenders().find((s) => s.track === track);
      if (!sender) {
        console.log("Sending track:", track);
        peer.peer.addTrack(track, myStream); // Only add the track if it's not already added
      } else {
        console.log("Track already added:", track);
      }
    });
  }, [myStream, peer.peer]);

  const handleCallAccepted = useCallback(
    async ({ from, to, ans }) => {
      // setRemoteSocketId(from);
      console.log(`Call Accepted`, from, ans);
      peer.setLocalDescription(ans);
      sendStreams();
    },
    [peer, sendStreams]
  );

  // useEffect(() => {
  //   peer.peer.addEventListener("track", async (ev) => {
  //     const remoteStream1 = ev.streams;
  //     console.log("GOT TRACKS!!");
  //     console.log(remoteStream1);
  //     // Stop the ringtone when the remote stream is received
  //     if (audioPl) {
  //       stopRingtone(audioPl); // Make sure to stop the ringtone
  //       setAudioPl(null); // Reset the audio player if needed
  //     }
  //     dispatch(setRemoteStream(remoteStream1[0]));
  //     setRstream(remoteStream1[0]);
  //     sendStreams();
  //   });
  // }, [audioPl, dispatch, peer.peer, remoteStream, sendStreams]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream1 = ev.streams;
      console.log("GOT TRACKS!!");
      console.log(remoteStream1);

      // Dispatch the remote stream to the Redux store
      dispatch(setRemoteStream(remoteStream1[0]));
      setRstream(remoteStream1[0]);

      // Send the streams to the peer
      sendStreams();
    });
  }, [dispatch, peer.peer, sendStreams]);

  const handleRejectCall = useCallback(() => {
    console.log("Call rejected by", contactId);
    dispatch(setRemoteStream(null)); // Optionally reset remote stream in Redux state
    dispatch(setMyStream(null)); // Optionally reset remote stream in Redux state
    toast.error(`Call rejected by the ${contactId} User`);

    navigate(`/chat/${contactId}`);
    window.location.reload(); // This will reload the entire page
  }, [contactId, dispatch, navigate]); // Add dependencies (contactId, dispatch, navigate)

  useEffect(() => {
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("call:rejected", handleRejectCall);
    return () => {
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("call:rejected", handleRejectCall);
    };
  }, [
    handleCallAccepted,
    handleNegoNeedFinal,
    handleNegoNeedIncomming,
    handleRejectCall,
    socket,
  ]);

  const handleMuteUnmute = useCallback(() => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled; // Toggle mute/unmute
        setIsMuted(audioTrack.enabled); // Update mute state
        console.log(isMuted);
        toast.info(`Mic ${audioTrack.enabled ? "unmuted" : "muted"}`); // Update notification message
      }
    }
  }, [isMuted, myStream]);

  const handleFlipCamera = useCallback(async () => {
    if (cameraStream) {
      // Stop the current video track
      const tracks = cameraStream.getVideoTracks();
      tracks.forEach((track) => track.stop());

      // Get all video devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      // Switch to the next camera (or the previous one if it's the last)
      const nextCamera = videoDevices.find(
        (device) => device.deviceId !== currentCamera
      );
      setCurrentCamera(nextCamera.deviceId); // Update current camera

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: nextCamera.deviceId },
        audio: true,
      });
      toast.info(`Camera switched to ${nextCamera.label}`); // Update notification message

      // Set the new camera stream
      dispatch(setMyStream(newStream));
      setCameraStream(newStream);
    }
  }, [cameraStream, currentCamera, dispatch]);

  // New function to end the call, stop media tracks, and close the connection
  const endCall = useCallback(() => {
    // Stop local stream tracks (camera, microphone, etc.)
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        track.stop(); // Stop each track
      });
    }

    // Close the RTCPeerConnection
    if (peer && peer.peer) {
      peer.peer.close(); // Close the peer connection
    }

    // Dispatch an action to reset the remote stream
    dispatch(setRemoteStream(null)); // Optionally reset remote stream in Redux state
    setRstream(null); // Clear the local state for remote stream

    // Notify the remote peer that the call has been ended
    socket.emit("call:ended", { from: currentUser.username, to: contactId });

    // Optionally navigate back or show an alert
    // alert("Call Ended!");
    toast.success("Call Ended!", { autoClose: 3000 });
    navigate(`/chat/${contactId}`); // Navigate to the chat page with the selected contact
    window.location.reload(); // This will reload the entire page
  }, [
    myStream,
    peer,
    dispatch,
    socket,
    currentUser.username,
    contactId,
    navigate,
  ]);

  useEffect(() => {
    // Listen for the "call:ended" event from the server
    socket.on("call:ended", ({ from, to }) => {
      if (from !== currentUser.username) {
        // Call ended by the other user
        // alert(`The call with ${from} has ended.`);
        toast.success("Call Ended!", { autoClose: 3000 });
        endCall(); // Call end function to stop everything on this side
      }
    });

    return () => {
      socket.off("call:ended", endCall);
    };
  }, [socket, currentUser.username, endCall]);

  useEffect(() => {
    if (remoteStream !== null) {
      sendStreams();
    }
  }, [remoteStream, sendStreams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative w-full sm:w-4/5 h-4/5 bg-black rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 w-full h-full object-cover">
          {remoteStream ? (
            <ReactPlayer
              playing
              height="100%"
              width="100%"
              url={remoteStream}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white text-2xl">
              Calling...
            </div>
          )}
        </div>

        {/* Mini Video (Self View) */}
        <div className="absolute  sm:bottom-4 bottom-24  right-4 w-32 sm:w-40 h-24 bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700">
          <ReactPlayer
            playing
            muted
            height="100%"
            width="100%"
            url={myStream}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6 sm:space-x-8">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-md flex items-center justify-center transition"
            onClick={handleMuteUnmute}
          >
            {isMuted ? <IoMdMic /> : <IoMdMicOff />}
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-md flex items-center justify-center transition"
            onClick={endCall}
          >
            <MdCallEnd />
          </button>

          <button
            className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-md flex items-center justify-center transition"
            onClick={handleFlipCamera}
          >
            <MdFlipCameraIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
