import React, { useState } from 'react'
import Header from '../Components/Header'
import { supabase } from '../supabase/Config';
import { useUser } from '../hooks/useUser';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Create = () => {


    const user = useUser();

    const navigate = useNavigate();

    const [NoteData, setNoteData] = useState({
      userId: "",
      title: "",
      content: "",
    });

    const handleOnChange = (e) => {
        setNoteData({...NoteData, [e.target.name]: e.target.value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        NoteData.userId = user?.identities[0].user_id

        const response = await supabase.from('notes').insert(NoteData);
        if (response.error) {
            console.log(response.error.message);
            toast.error(response.error.message);
        }
        else {
            toast.success("Note created successfully");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }
  return (
      <div>
          <Header />
          <div className='w-full h-full px-40 py-4'>
              <p className='text-xl '>Create Note</p>
              
              <form onSubmit={handleOnSubmit} className=" flex flex-col py-6 ">
                  <input className='w-80 h-10 border border-gray-300 rounded-lg px-4 my-2' type="text" placeholder='Title' name='title' onChange={handleOnChange}/>
                  <textarea className='w-80 h-10 border border-gray-300 rounded-lg px-4 my-2' type="text" placeholder='Content' name='content' onChange={handleOnChange} />
                  <button type='submit' className='w-80 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg cursor-pointer mt-6'>Create</button>

              </form>
              
          </div>
    </div>
  )
}

export default Create