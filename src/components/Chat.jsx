import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import {
  MdOutlineImage,
  MdOutlineEmojiEmotions,
  MdOutlineVideoLibrary,
  MdBlock,
} from "react-icons/md";
import { FaEllipsis } from "react-icons/fa6";
import { GoMute } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { CheckCheck, SendHorizontal } from "lucide-react";
import { HiOutlineMicrophone } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import uploadFile from "../utils/uploadFile";
import Loading from "./Loading";

const Chat = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dataUser, setUserData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    bio: "",
    online: true,
  });
  const { userId } = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [messages, setMessages] = useState([]);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showFooterMenu, setShowFooterMenu] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!socketConnection || !userId) return;

    socketConnection.emit("message-page", userId);

    socketConnection.on("message-user", (data) => {
      setUserData(data);
    });

    socketConnection.on("message", (conversation) => {
      const formattedMessages = conversation.messages.map((msg) => ({
        from: msg.sender === user?._id ? "me" : "them",
        text: msg.text || "",
        imageUrl: msg.imageUrl || "",
        videoUrl: msg.videoUrl || "",
        time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(formattedMessages);
    });

    // Add listener for new messages
    socketConnection.on("new message", (msg) => {
      const newMessage = {
        from: msg.sender === user?._id ? "me" : "them",
        text: msg.text || "",
        imageUrl: msg.imageUrl || "",
        videoUrl: msg.videoUrl || "",
        time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketConnection.off("message-user");
      socketConnection.off("message");
      socketConnection.off("new message");
    };
  }, [socketConnection, userId, user?._id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    const newMessage = {
      from: "me",
      text: "",
      imageUrl: uploadPhoto?.url || "",
      videoUrl: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (socketConnection) {
      socketConnection.emit("new message", {
        sender: user?._id,
        receiver: userId,
        text: "",
        imageUrl: uploadPhoto?.url || "",
        videoUrl: "",
        messageByUserId: user?._id,
      });
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const uploadVideo = await uploadFile(file, "video");
    setLoading(false);
    const newMessage = {
      from: "me",
      text: "",
      imageUrl: "",
      videoUrl: uploadVideo?.url || "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (socketConnection) {
      socketConnection.emit("new message", {
        sender: user?._id,
        receiver: userId,
        text: "",
        imageUrl: "",
        videoUrl: uploadVideo?.url || "",
        messageByUserId: user?._id,
      });
    }
  };

  const handleOnChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      from: "me",
      text: messageText,
      imageUrl: "",
      videoUrl: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (socketConnection) {
      socketConnection.emit("new message", {
        sender: user?._id,
        receiver: userId,
        text: messageText,
        imageUrl: "",
        videoUrl: "",
        messageByUserId: user?._id,
      });
    }
    setMessageText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto border-r border-[#f1f1f1] overflow-hidden shadow-lg">
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-2xl transition duration-300 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Header */}
      <div className="flex items-center p-3 sm:p-4 border-b bg-white relative">
        <button
          onClick={() => navigate("/message")}
          className="transition-transform duration-300 hover:-translate-x-1 mr-2"
        >
          <IoMdArrowBack className="text-xl sm:text-2xl text-gray-800 cursor-pointer" />
        </button>
        <img
          src={dataUser.profile_pic}
          alt="User"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 cursor-pointer"
          onClick={() => setPreviewImage(dataUser.profile_pic)}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold flex items-center gap-2 text-sm sm:text-base truncate">
            {dataUser.name}
            <span
              className={`flex items-center text-xs font-normal ${
                dataUser.online ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-1 ${
                  dataUser.online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              {dataUser.online ? "Online" : "Offline"}
            </span>
          </p>
          {dataUser.bio && (
            <p className="text-xs text-gray-500 italic mt-1 truncate">{dataUser.bio}</p>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2 rounded-md transition-all duration-200 shadow">
            <FiPhone className="text-gray-600 text-lg sm:text-xl" />
          </div>
          <div className="relative">
            <div
              onClick={() => setShowHeaderMenu(!showHeaderMenu)}
              className="bg-gray-200 p-1.5 sm:p-2 rounded-md hover:bg-gray-300 shade"
            >
              <FaEllipsis className="text-gray-600 text-lg sm:text-xl" />
            </div>
            {showHeaderMenu && (
              <div className="absolute top-10 right-0 w-40 sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="hover:bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                  <GoMute size={16} className="sm:text-lg" /> Mute notifications
                </div>
                <div className="hover:bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                  <MdBlock size={16} className="sm:text-lg" /> Block user
                </div>
                <div className="hover:bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                  <AiOutlineDelete size={16} className="sm:text-lg" /> Delete chat
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "them" && (
              <img
                src={dataUser.profile_pic}
                alt="user"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`relative max-w-[70%] sm:max-w-[60%] px-2 sm:px-3 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm ${
                msg.from === "me"
                  ? "bg-pink-400 text-white"
                  : "bg-[#f1f1f1] text-gray-900 shade"
              }`}
            >
              {msg.from === "them" && (
                <div className="absolute -left-2 bottom-1 border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent border-r-[8px] sm:border-r-[10px] border-r-[#f1f1f1]"></div>
              )}
              {msg.from === "me" && (
                <div className="absolute -right-1 bottom-1 border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent border-l-[8px] sm:border-l-[10px] border-l-pink-400"></div>
              )}
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Apartment"
                  className="rounded-md mb-2 w-full max-w-full object-cover cursor-pointer"
                  onClick={() => setPreviewImage(msg.imageUrl)}
                />
              )}
              {msg.videoUrl && (
                <video
                  controls
                  className="rounded-md mb-2 w-full max-w-full object-cover"
                >
                  <source src={msg.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <p className="break-words">{msg.text}</p>
              <div className="flex justify-end text-xs mt-1">
                <span
                  className={`text-[9px] sm:text-[10px] ${
                    msg.from === "me" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {msg.time}
                </span>
                {msg.from === "me" && (
                  <CheckCheck size={12} className="ml-1 text-white sm:text-sm" />
                )}
              </div>
            </div>
            {msg.from === "me" && (
              <img
                src={user?.profile_pic}
                alt="me"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <Loading />
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center p-2 sm:p-3 bg-white relative">
        <button onClick={() => setShowFooterMenu(!showFooterMenu)}>
          <MdOutlineImage className="text-xl sm:text-2xl text-gray-500 mr-2 sm:mr-3 hover:scale-105 transition duration-200" />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 placeholder:text-gray-400"
        />
        <button
          className="ml-2 sm:ml-3 p-1 sm:p-1.5 text-white bg-pink-400 rounded-md hover:bg-pink-500 transition-all duration-300 hover:scale-95 focus:outline-none"
          onClick={handleSendMessage}
        >
          <SendHorizontal className="text-lg sm:text-xl" />
        </button>
        <button className="ml-2 sm:ml-3 text-gray-600">
          <HiOutlineMicrophone className="text-xl sm:text-2xl hover:scale-105 transition duration-200" />
        </button>
        {showFooterMenu && (
          <div className="absolute bottom-14 sm:bottom-16 left-2 sm:left-4 bg-white border rounded-xl shadow-lg p-2 sm:p-3 flex flex-col space-y-2 z-10 w-40 sm:w-52">
            <label className="flex items-center text-xs sm:text-sm hover:bg-gray-100 p-1 sm:p-2 rounded-md transition cursor-pointer">
              <MdOutlineImage className="mr-1 sm:mr-2 text-base sm:text-lg text-blue-500" />
              Upload image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <label className="flex items-center text-xs sm:text-sm hover:bg-gray-100 p-1 sm:p-2 rounded-md transition cursor-pointer">
              <FaVideo className="mr-1 sm:mr-2 text-base sm:text-lg text-red-500" />
              Upload video
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;