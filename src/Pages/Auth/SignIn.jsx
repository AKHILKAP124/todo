import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/Config";
import toast from "react-hot-toast";

const SignIn = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

    const [error, setError] = useState("");
    
    const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const res = validateEmail(signinData.email);

    if (!res) {
      setError("Please enter a valid email");
      return;
    }

    const response = await supabase.auth.signInWithPassword({
      email: signinData.email,
      password: signinData.password,
    });

    if (response.error) {
      setError(response.error.message);
      toast.error(response.error.message);
    } else {
      console.log(response, "response");
      setError("");
      toast.success("Signin successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 h-fit bg-white border border-gray-300 rounded-lg px-4 py-2 flex flex-col gap-4">
        <div className="w-full h-20">
          <h1 className="text-xl text-center">Signin to Notes App</h1>
          <p className="text-sm text-center mt-2">Welcome to Notes App</p>
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <form onSubmit={handleOnSubmit}>
            <label htmlFor="email" className="text-gray-500">
              Email
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-lg px-4 my-2"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-lg px-4 my-2"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg cursor-pointer mt-6"
            >
              Signin
            </button>
          </form>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={() => {
              navigate('/signup')
            }}
            >Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
