
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import EditUserDetails from "./EditUserDetails";

const UserCard = ({ fetchUserDetails }) => {
  const [editUserOpen, setEditUserOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const socket = useSelector((state) => state.user.socketConnection);

  const handleLogout = () => {
    if (socket) {
      socket.emit("logout");
    }
    localStorage.removeItem("token");
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  };

  const isOnline = user?.onlineUser.includes(user?._id);

  return (
    <div className="px-4 pb-4 bg-[#0A0A0A]">
      {/* Footer text */}
      <div className="text-gray-500 text-xs mb-3 text-center">
        © 2025 ChatApp. All rights reserved.
      </div>
      {/* User card */}
      <div className="bg-white rounded-xl flex items-center justify-between p-3 shadow">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setEditUserOpen(true)}
            style={{ position: "relative", width: "50px", height: "50px" }}
          >
            <img
              src={user.profile_pic}
              alt="User"
              style={{ width: "80%", height: "80%", borderRadius: "50%" }}
            />
            {isOnline && (
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "5px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  border: "3px solid white",
                }}
                className="bg-green-500"
              ></div>
            )}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-gray-800">
              {user.name}
            </p>
            <p className="text-xs text-white bg-black px-2 py-0.5 rounded-full inline-block">
              {user.role || "user"}
            </p>
          </div>
        </div>
        {/* Logout icon */}
        <button
          onClick={handleLogout}
          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
      {editUserOpen && (
        <EditUserDetails
          onClose={() => setEditUserOpen(false)}
          user={user}
          fetchUserDetails={fetchUserDetails}
        />
      )}
    </div>
  );
};

export default UserCard;