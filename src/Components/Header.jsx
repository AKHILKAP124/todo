import React from "react";
import { useUser } from "../hooks/useUser";
import { supabase } from "../supabase/Config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useUser();

  const navigate = useNavigate();
  
  const handleSignout = async () => {
    let { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
      toast.error(error.message);
    }

    toast.success("Signout successful");
    setTimeout(() => {
      navigate("/signin");
    }, 2000);

  };

  return (
    <div className="w-full h-24 px-2 lg:px-40 py-8 font-medium border-b border-gray-300 flex justify-between">
      <h1 className="text-3xl">Welcome to Notes App</h1>
      <div>
        {user?.user_metadata?.email ? (
          <div className="flex gap-2">
            <div>
              <p className="text-lg font-medium">{user.user_metadata.name}</p>
              <p className="text-sm text-gray-500">
                {user.user_metadata.email}
              </p>
            </div>
            <button className="px-4 py-1 bg-red-300 hover:bg-red-400 text-white text-sm font-medium rounded-sm cursor-pointer"
              onClick={handleSignout}>
              Logout
            </button>
          </div>
        ) : (
            
            <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-sm cursor-pointer"
        onClick={() => navigate("/signin")}    >Signin</button>
        )}
      </div>
    </div>
  );
};

export default Header;
