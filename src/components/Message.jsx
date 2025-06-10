
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CheckCheck, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { fetchDataFromApi, useFetchData } from "../utils/api";
import SearchModal from "./SearchModel";
import { useSelector } from "react-redux";

const Message = () => {
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state.user);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const onlineUsers = user?.onlineUser || [];
  const archiveCount = friends.filter((msg) => msg.isArchived).length;
  const generalCount = friends.filter((msg) => !msg.isArchived).length;

  const handleSearchUser = () => {
    setSearch(search.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(search);
    }, 700);
    return () => clearTimeout(timeout);
  }, [search]);

  const { users, loading, error } = useFetchData(
    `/user/search-user?search=${debounceQuery}`
  );

  useEffect(() => {
    if (socketConnection && user?._id) {
      socketConnection.emit("sidebar", user?._id);

      // Receive Sidebar updates
      socketConnection.on("sidebar", (data) => {
        setFriends(data);
      });

      // Accept connection socket reason
      socketConnection.on("error", (data) => {
        toast.error(data.message || "An error occurred");
      });

      return () => {
        socketConnection.off("sidebar");
      };
    }
  }, [socketConnection, user?._id]);

  // Add new friend
  const handleAddFriend = (friendId) => {
    if (socketConnection) {
      socketConnection.emit("add-friend", {
        userId: user?._id,
        friendId,
      });
    }
  };

  return (
    <div className="grid grid-cols-[350px_1fr] h-full bg-white">
      {/* Sidebar */}
      <aside className="border-r border-[#f1f1f1] p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <UserPlus
            onClick={() => setShowSearchModal(true)}
            size={28}
            className="mb-3 text-gray-700 bg-gray-200 hover:bg-gray-300 p-1.5 rounded-md shadow-sm transition-all duration-200"
          />
          <SearchModal
            isOpen={showSearchModal}
            onClose={() => setShowSearchModal(false)}
            setFriends={setFriends}
            friend={friends}
            onAddFriend={handleAddFriend} // Pass add friend function
            friends={friends}
          />
        </div>
        {/* Tabs */}
        <div className="relative w-full max-w-sm mx-auto mb-6">
          <div className="absolute inset-0 flex bg-gray-100 dark:bg-gray-800 rounded-full">
            <div
              className={`absolute inset-0 w-1/2 h-full bg-pink-400 rounded-full transition-all duration-300 ${
                activeTab === "general" ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
          <div className="relative z-10 flex gap-1 bg-transparent rounded-full">
            <button
              onClick={() => setActiveTab("archive")}
              className={`w-1/2 text-center text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === "archive"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Archive
              <span className="ml-1 text-xs font-semibold opacity-80">
                ({archiveCount})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`w-1/2 text-center py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === "general"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              General
              <span className="ml-1 text-xs font-semibold opacity-80">
                ({generalCount})
              </span>
            </button>
          </div>
        </div>
        {/* Search input */}
        <div className="mb-4 px-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pr-10 pl-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => e.key === "Enter" && handleSearchUser()}
            />
            <span
              onClick={handleSearchUser}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            >
              <Search size={18} />
            </span>
          </div>
        </div>
        {/* Friends list */}
        {(activeTab === "general"
          ? friends.filter((f) => !f.isArchived)
          : friends.filter((f) => f.isArchived)
        ).map((msg) => {
          const isOnline = onlineUsers.includes(msg.id);
          return (
            <Link key={msg.id} to={`/message/${msg.id}`}>
              <div className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <div className="relative mr-3">
                  <img
                    src={msg.profile_pic}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 mx-3 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 relative">
                      <img
                        src={msg.profile_pic}
                        alt="mini"
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {msg.name.split(" ")[0]}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-xs text-gray-600 truncate max-w-[180px]">
                      {msg.message}
                    </p>
                    {msg.isRead ? (
                      <div className="text-pink-400 text-xs ml-2">
                        <CheckCheck size={18} />
                      </div>
                    ) : msg.unreadCount > 0 ? (
                      <div className="bg-pink-400 text-white text-xs px-1.5 py-0.5 flex items-center justify-center rounded-full ml-2">
                        {msg.unreadCount}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {activeTab === "archive" &&
          friends.filter((msg) => msg.isArchived).length === 0 && (
            <p className="text-center text-gray-500 mt-6">No archive here</p>
          )}
      </aside>
      {/* Content area */}
      <div className="bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Message;
