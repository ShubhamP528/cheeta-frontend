// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { IoIosCall, IoIosVideocam } from "react-icons/io";
// import { NODE_API_ENDPOINT } from "../utils/utils";
// import { useSocket } from "../context/SocketProvider";
// import { FaArrowLeft } from "react-icons/fa";
// import Picker from "emoji-picker-react"; // Import the emoji picker
// import { SiIconify } from "react-icons/si";
// import peer from "../service/peer";
// import {
//   setChatUserRe,
//   setContactId,
//   setMyStream,
//   setOffer,
//   setPeer,
//   setSocket,
// } from "../features/chat";
// import CallingPage from "./CallingPage";

// // import "emoji-picker-react/dist/unicode.css"; // Import the CSS for the emoji picker

// // Utility function to parse the date from "DD/MM/YYYY" format to a valid Date object
// const parseDateString = (str) => {
//   const [day, month, year] = str.split("/");
//   return new Date(`${year}-${month}-${day}`);
// };

// // Utility function to format date (e.g., today, yesterday, or specific date)
// const formatDate = (date) => {
//   const today = new Date();

//   let messageDate;
//   // If the date is in the format "DD/MM/YYYY", parse it first
//   if (date.includes("/")) {
//     messageDate = parseDateString(date);
//   } else {
//     messageDate = new Date(date); // For ISO or standard formats
//   }

//   // Check if the messageDate is valid
//   if (isNaN(messageDate)) {
//     console.error("Invalid Date:", date);
//     return "Invalid Date";
//   }

//   const isToday = today.toDateString() === messageDate.toDateString();
//   const isYesterday =
//     new Date(today.setDate(today.getDate() - 1)).toDateString() ===
//     messageDate.toDateString();

//   if (isToday) {
//     return "Today";
//   }
//   if (isYesterday) {
//     return "Yesterday";
//   }

//   return messageDate.toLocaleDateString("en-GB", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//   });
// };

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [groupedMsg, setGroupedMsg] = useState([]);
//   const [chatUser, setChatUser] = useState({});
//   const [textMessage, setTextMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const { contactId } = useParams(); // Get contactId from URL parameters
//   const currentUser = useSelector((store) => store.user.user);
//   const socket = useSocket();
//   const messagesEndRef = useRef(null); // Reference for auto-scrolling
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isRinging, setIsRinging] = useState(false);

//   useEffect(() => {
//     dispatch(setPeer(peer)); // Set the peer in Redux store
//     dispatch(setContactId(contactId)); // Set the contactId in Redux store
//     dispatch(setSocket(socket)); // Set the socket in Redux store
//   }, [contactId, dispatch, socket]);

//   // Function to scroll to the bottom of the message container
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100); // Delay the scroll to ensure the message DOM is updated
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       // Scroll to the bottom whenever messages update
//       scrollToBottom();
//     }
//   }, [messages]); // Trigger scroll whenever messages change

//   useEffect(() => {
//     // Fetch user details based on contactId
//     const getUser = async () => {
//       try {
//         const response = await fetch(
//           `${NODE_API_ENDPOINT}/chat/getuser/${contactId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${currentUser.token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Error fetching messages");
//         }

//         const data = await response.json();
//         setChatUser(data.user || {});
//         console.log("User fetched:", data.user);
//         dispatch(setChatUserRe(data.user));
//         setMessages(data.chats);
//       } catch (error) {
//         toast.error(error.message || "Error fetching messages");
//       }
//     };

//     if (contactId && currentUser.token) {
//       getUser();

//       socket.emit("room:join", { room: currentUser.username }); // Join chat room when contact is selected
//     }

//     return () => {
//       socket.off("room:join");
//     };
//   }, [contactId, currentUser.username, socket]);

//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//       if (message.from === contactId || message.to === contactId) {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [contactId, socket]);

//   const handleSendMessage = async () => {
//     if (textMessage.trim()) {
//       const time = new Date().toISOString(); // This will return the time in the desired format

//       socket.emit("chatMessage", {
//         message: textMessage,
//         from: currentUser.username,
//         to: contactId,
//         time: time, // Use the formatted time
//       });

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           message: textMessage,
//           from: currentUser.username,
//           to: contactId,
//           time: time, // Use the formatted time
//         },
//       ]);

//       setGroupedMsg(groupedMessages());
//       setTextMessage(""); // Clear input after sending

//       await fetch(`${NODE_API_ENDPOINT}/chat/storeChat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           from: currentUser.username,
//           to: contactId,
//           message: textMessage,
//         }),
//       });
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     setGroupedMsg(groupedMessages());
//   }, [messages]);

//   // Group messages by date
//   const groupedMessages = () => {
//     const grouped = [];
//     let currentDate = null;

//     messages.forEach((message) => {
//       const messageDate = formatDate(message.time); // Use formatDate to process the time field
//       if (messageDate !== currentDate) {
//         grouped.push({ date: messageDate, messages: [message] });
//         currentDate = messageDate;
//       } else {
//         grouped[grouped.length - 1].messages.push(message);
//       }
//     });

//     return grouped;
//   };

//   const handleEmojiSelect = (emoji) => {
//     setTextMessage(textMessage + emoji.emoji); // Append emoji to message input
//     setShowEmojiPicker(false); // Close the picker after selecting an emoji
//   };

//   const handleVideoCall = async () => {
//     // Implement video call logic here

//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     console.log({
//       to: contactId,
//       from: currentUser.username,
//       offer,
//     });
//     socket.emit("videoCalling", {
//       to: contactId,
//       from: currentUser.username,
//       offer,
//     });

//     console.log(stream);

//     dispatch(setMyStream(stream)); // Set the user's stream in Redux store
//     navigate("/videoCalling");
//   };

//   const handleIncomingVideoCall = useCallback(
//     async ({ from, offer }) => {
//       // setRemoteSocketId(from);
//       // const stream = await navigator.mediaDevices.getUserMedia({
//       //   audio: true,
//       //   video: true,
//       // });
//       // dispatch(setMyStream(stream));
//       console.log(`Incoming Video Call`, from, offer);
//       dispatch(setOffer(offer));
//       setIsRinging(true);

//       // console.log(`Incoming Call`, from, offer);
//       // const ans = await peer.getAnswer(offer);
//       // socket.emit("call:accepted", {
//       //   to: contactId,
//       //   from: currentUser.username,
//       //   ans,
//       // });
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     socket.on("incomming:videCall", handleIncomingVideoCall);
//     // socket.on("call:accepted", handleCallAccepted);
//     // socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     // socket.on("peer:nego:final", handleNegoNeedFinal);
//     return () => {
//       socket.off("incomming:videCall", handleIncomingVideoCall);
//       // socket.off("call:accepted", handleCallAccepted);
//       // socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       // socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [handleIncomingVideoCall, socket]);

//   if (isRinging) {
//     return <CallingPage callType={"Video Call"} />;
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header with Contact Name and Call Options */}
//       <div className="flex items-center justify-between bg-gradient-to-br from-teal-500 to-teal-800 text-white p-4 shadow-lg">
//         <div className="flex items-center gap-3">
//           {/* Back button */}
//           <Link to="/contact-list" className="text-white text-xl font-bold">
//             <FaArrowLeft />{" "}
//           </Link>
//           <img
//             src={chatUser.profilePicture} // Use default or fetched contact profile image
//             alt="Contact"
//             className="h-12 w-full rounded-full"
//           />
//           <span className="text-lg font-semibold">{contactId}</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button
//             className="hover:text-gray-200"
//             title="Video Call"
//             onClick={() => handleVideoCall()}
//           >
//             <IoIosVideocam className="text-2xl" />
//           </button>
//           <button
//             className="hover:text-gray-200"
//             title="Audio Call"
//             onClick={() => toast.warning("Feature in progress")}
//           >
//             <IoIosCall className="text-2xl" />
//           </button>
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col ">
//         {/* Messages Container with Scroll */}
//         <div
//           className="flex-1 p-4 bg-white rounded-lg shadow-lg overflow-y-auto"
//           style={{ maxHeight: "calc(100vh - 20vh)" }}
//         >
//           <div className="space-y-4">
//             {groupedMsg.map((group, index) => (
//               <div key={index}>
//                 <div className="text-center text-sm text-gray-500 py-2">
//                   {group.date}
//                 </div>
//                 {group.messages.map((message, msgIndex) => (
//                   <div
//                     key={msgIndex}
//                     className={`flex ${
//                       message.from === currentUser.username
//                         ? "justify-end"
//                         : "justify-start"
//                     } gap-3 mb-2`}
//                   >
//                     <div
//                       className={`message-bubble ${
//                         message.from === currentUser.username
//                           ? "message-bubble-sender"
//                           : "message-bubble-receiver"
//                       }`}
//                     >
//                       <div className="pl-2 text-wrap">{message.message}</div>
//                       <div className="text-xs text-right text-gray-400 ml-10">
//                         {new Date(message.time).toLocaleTimeString("en-GB", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </div>
//                     </div>
//                     <div ref={messagesEndRef} />
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Message Input */}
//         <div className="p-4 bg-white border-t border-gray-200 flex items-center">
//           <button
//             className="mr-2 text-xl"
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           >
//             <SiIconify />
//           </button>
//           <input
//             type="text"
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!contactId} // Disable input if no contact is selected
//             onKeyPress={handleKeyPress}
//           />
//           <button
//             className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//             onClick={handleSendMessage}
//             disabled={!textMessage.trim()} // Disable button if message is empty
//           >
//             Send
//           </button>
//         </div>

//         {/* Emoji Picker */}
//         {showEmojiPicker && (
//           <div className="absolute bottom-20 right-6 z-10">
//             <Picker onEmojiClick={handleEmojiSelect} />
//           </div>
//         )}
//       </div>

//       {/* Inline Styles for Message Bubbles */}
//       <style jsx>{`
//         .message-bubble {
//           position: relative;
//           padding: 10px;
//           border-radius: 15px;
//           max-width: 75%;
//           word-wrap: break-word;
//         }
//         .message-bubble-sender {
//           background-color: #007bff;
//           color: white;
//           align-self: flex-end;
//           border-top-right-radius: 0;
//         }
//         .message-bubble-receiver {
//           background-color: #e5e5ea;
//           color: black;
//           align-self: flex-start;
//           border-top-left-radius: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Chat;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosCall, IoIosVideocam } from "react-icons/io";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSocket } from "../context/SocketProvider";
import { FaArrowLeft } from "react-icons/fa";
import Picker from "emoji-picker-react";
import { SiIconify } from "react-icons/si";
import peer from "../service/peer";
import {
  setChatUserRe,
  setContactId,
  setMyStream,
  setOffer,
  setPeer,
  setSocket,
} from "../features/chat";
import CallingPage from "./CallingPage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [groupedMsg, setGroupedMsg] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [textMessage, setTextMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { contactId } = useParams();
  const currentUser = useSelector((store) => store.user.user);
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    dispatch(setPeer(peer));
    dispatch(setContactId(contactId));
    dispatch(setSocket(socket));
  }, [contactId, dispatch, socket]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${NODE_API_ENDPOINT}/chat/getuser/${contactId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error fetching messages");

        const data = await response.json();
        setChatUser(data.user || {});
        dispatch(setChatUserRe(data.user));
        setMessages(data.chats);
      } catch (error) {
        toast.error(error.message || "Error fetching messages");
      }
    };

    if (contactId && currentUser.token) {
      getUser();
      socket.emit("room:join", { room: currentUser.username });
    }

    return () => socket.off("room:join");
  }, [contactId, currentUser.username, socket]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.from === contactId || message.to === contactId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [contactId, socket]);

  const handleSendMessage = async () => {
    if (textMessage.trim()) {
      const time = new Date().toISOString();

      socket.emit("chatMessage", {
        message: textMessage,
        from: currentUser.username,
        to: contactId,
        time: time,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: textMessage,
          from: currentUser.username,
          to: contactId,
          time: time,
        },
      ]);

      setGroupedMsg(groupedMessages());
      setTextMessage("");

      await fetch(`${NODE_API_ENDPOINT}/chat/storeChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: currentUser.username,
          to: contactId,
          message: textMessage,
        }),
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    setGroupedMsg(groupedMessages());
  }, [messages]);

  const groupedMessages = () => {
    const grouped = [];
    let currentDate = null;

    messages.forEach((message) => {
      const messageDate = new Date(message.time).toLocaleDateString();
      if (messageDate !== currentDate) {
        grouped.push({ date: messageDate, messages: [message] });
        currentDate = messageDate;
      } else {
        grouped[grouped.length - 1].messages.push(message);
      }
    });

    return grouped;
  };

  const handleEmojiSelect = (emoji) => {
    setTextMessage(textMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleVideoCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();

    socket.emit("videoCalling", {
      to: contactId,
      from: currentUser.username,
      offer,
    });

    dispatch(setMyStream(stream));
    navigate("/videoCalling");
  };

  if (isRinging) {
    return <CallingPage callType={"Video Call"} />;
  }

  return (
    <div className="flex flex-col h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-br from-teal-500 to-teal-800 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/contact-list" className="text-white text-xl">
            <FaArrowLeft />
          </Link>
          <img
            src={chatUser.profilePicture}
            alt="Contact"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-lg font-semibold">{contactId}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="hover:text-gray-200"
            title="Video Call"
            onClick={handleVideoCall}
          >
            <IoIosVideocam className="text-2xl" />
          </button>
          <button
            className="hover:text-gray-200"
            title="Audio Call"
            onClick={() => toast.warning("Feature in progress")}
          >
            <IoIosCall className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4">
        {groupedMsg.map((group, index) => (
          <div key={index}>
            <div className="text-center text-sm text-gray-500 dark:text-gray-300">
              {group.date}
            </div>
            {group.messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.from === currentUser.username
                    ? "justify-end"
                    : "justify-start"
                } gap-3 mb-2`}
              >
                <div
                  className={`p-2 rounded-lg max-w-sm ${
                    message.from === currentUser.username
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {message.message}
                  <div className="text-xs mt-1 text-right">
                    {new Date(message.time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Bar */}
      <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800">
        <button
          className="mr-2"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <SiIconify />
        </button>
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-teal-500"
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 bg-teal-600 text-white px-4 py-2 rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4">
          <Picker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default Chat;
