import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/Config';

const SignUp = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

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
        setSignupData({...signupData, [e.target.name]: e.target.value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const res = validateEmail(signupData.email);

        if (!res) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        
        const response = await supabase.auth.signUp({
            
            email: signupData.email,
            password: signupData.password,
            options: {
                data: {
                    name: signupData.name
                }
            }

        })
        
        if (response.error) {
            setError(response.error.message);
        } else {
            navigate('/signin');
        }
        
    }


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 h-fit bg-white border border-gray-300 rounded-lg px-4 py-2 flex flex-col gap-4">
        <div className="w-full h-20">
          <h1 className="text-xl text-center">Signin to Notes App</h1>
          <p className="text-sm text-center mt-2">Welcome to Notes App</p>
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <form onSubmit={handleOnSubmit}>
            <label htmlFor="name" className="text-gray-500">
              Name
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-lg px-4 my-2"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleOnChange}
            />
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
            Already have an account{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Signin
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp