
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Building2,
  CircleHelp,
  LayoutDashboard,
  MessageSquareText,
  Star,
} from "lucide-react";
import { MessageCircleHeart } from "lucide-react";

const menuItems = [
  {
    to: "/message",
    icon: <MessageSquareText size={18} />,
    label: "Messages",
    badge: 5,
  },
  {
    to: "/dashboard",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    badge: 0,
  },
  {
    to: "/dashboard",
    icon: <Building2 size={18} />,
    label: "Bookings",
    badge: 0,
  },
  {
    to: "/dashboard",
    icon: <Bell size={18} />,
    label: "Notifications",
    badge: 4,
  },
  {
    to: "/dashboard",
    icon: <Star size={18} />,
    label: "Reviews",
    badge: 0,
  },
  {
    to: "/dashboard",
    icon: <CircleHelp size={18} />,
    label: "Help",
    badge: 0,
  },
];

const HomeSidebar = () => {
  return (
    <section className="bg-[#0A0A0A] h-full flex flex-col justify-between">
      {/* Logo */}
      <div className="pt-6 px-3">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-pink-400 to-pink-600 p-1 rounded-full shadow-xl">
            <MessageCircleHeart className="text-white w-6 h-6" />
          </div>
          <p className="text-white text-xl font-semibold">Chat App</p>
        </NavLink>
      </div>
      {/* Menu Links */}
      <ul className="flex flex-col gap-2 px-2 mt-6 flex-1">
        {menuItems.map(({ to, icon, label, badge }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block ${
                  isActive ? "bg-[#252525] text-white" : "text-white hover:bg-[#1f1f1f]"
                } rounded-full transition-all`
              }
            >
              <div className="flex items-center justify-between w-full h-12 px-5">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="text-[14px]">{label}</span>
                </div>
                {badge > 0 && (
                  <span className="bg-pink-400 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeSidebar;