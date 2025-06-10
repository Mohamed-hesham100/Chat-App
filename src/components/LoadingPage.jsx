import { MessageCircleHeart } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-pulse bg-pink-400 p-6 rounded-full shadow-xl">
        <MessageCircleHeart className="text-white w-12 h-12" />
      </div>
      <p className="mt-4 text-pink-500 font-semibold tracking-wide">Loading...</p>
    </div>
  );
};

