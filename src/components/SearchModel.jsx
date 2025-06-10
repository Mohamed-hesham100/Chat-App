

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchDataFromApi, postData, searchUser } from "../utils/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchModal = ({ isOpen, onClose, setFriends, friends }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const user = useSelector((state) => state.user);
  const onlineUsers = useSelector((state) => state.user.onlineUser); // ✅ Online users' IDs

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        setLoading(true);
        const res = await searchUser(`/user/search-user?search=${search}`);
        setLoading(false);
        if (res.success) {
          setResults(res.users);
        } else {
          toast.error(res?.message || "An error occurred");
        }
      };
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setResults([]);
      setPreviewImage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddFriend = async (friendId) => {
    onClose();
    const res = await postData("/user/add-friend", { friendId });
    if (res.success) {
      toast.success(res.message);
      const res2 = await fetchDataFromApi("/user/friends");
      if (res2.success) {
        const formatted = res2.friends.map((friend) => ({
          id: friend._id,
          name: friend.name,
          message: "Start conversation",
          time: new Date().toLocaleTimeString(),
          isRead: false,
          isArchived: false,
          profile_pic: friend.profile_pic || "/default-avatar.png",
        }));
        setFriends(formatted);
      } else {
        toast.error(res2.message);
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      {/* Image preview window */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-2xl transition duration-300"
          />
        </div>
      )}
      {/* Main window */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
        <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-2xl relative animate-fade-in">
          {/* Close button */}
          <button
            onClick={onClose}
            className="top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-800 mb-5">
            Search for a user
          </h2>
          {/* Search input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition mb-4"
          />
          {/* Loading state */}
          {loading && (
            <div className="text-center py-2 text-sm text-gray-500 animate-pulse">
              Searching...
            </div>
          )}
          {/* Search results */}
          {!loading && search && results.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No results found.
            </p>
          )}
          {!loading && results.length > 0 && (
            <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {results.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <Link
                      to={`${user._id}`}
                      onClick={onClose}
                      className="flex items-center gap-3"
                    >
                      <div className="relative">
                        <img
                          src={user.profile_pic || "/default-avatar.png"}
                          alt={user.name}
                          className="w-11 h-11 rounded-full object-cover border border-gray-300"
                        />
                        {onlineUsers.includes(user._id) && (
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 hover:underline">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </Link>
                  </div>
                  {friends.some((f) => f.id === user._id) ? (
                    <span className="text-sm text-gray-400">friend</span>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(user._id)}
                      className="bg-pink-500 text-white px-2 py-1 text-sm rounded-full hover:bg-pink-600 transition"
                    >
                      Add friend
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
