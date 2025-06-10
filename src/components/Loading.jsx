const Loading = () => {
  return (
    <div className="max-w-xs px-3 py-2 rounded-2xl bg-pink-100 text-pink-600 text-sm shadow relative">
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-3 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
