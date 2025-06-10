import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { useDispatch } from "react-redux";
import {
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import HomeSidebar from "../components/HomeSidebar";
import UserCard from "../components/UserCard";
import { LoadingPage } from "../components/LoadingPage";
import { io } from "socket.io-client";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    const res = await fetchDataFromApi("/user/user-details");
    if (res.success) {
      dispatch(setUser(res.user));
    } else {
      console.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // socket connection
  useEffect(() => {
    const token = localStorage.getItem("token");

    const socket = io("https://chat-app-production-eae0.up.railway.app", {
      auth: { token },
    });

    socket.on("onlineUser", (data) => {
      console.log("👥 Online users: ", data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socket));

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10">
        <LoadingPage />
      </p>
    );

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <HomeSidebar />
        <UserCard fetchUserDetails={fetchUserDetails} />
      </div>

      {/* Main content */}
      <main className="bg-gray-100 h-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
