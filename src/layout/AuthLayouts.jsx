import logo from "../../public/images/logo2.png";

const AuthLayouts = ({ children }) => {
  return (
    <div>
      <header className="flex items-center justify-center px-8 py-4 h-28 w-full shadow-md bg-white">
       
      </header>

      <div className="flex items-center space-x-4">{children}</div>
    </div>
  );
};

export default AuthLayouts;
