import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { supabase } from '../supabase/Config';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect( () => {
        
        const fetchNote = async () => {
            
            const [data, error] = await supabase.from('notes').select("*").eq('id', id).single();
    
            if (error) {
                console.log(error);
                toast.error(error.message);
            }
    
            if (data) {
                setTitle(data?.title);
                setContent(data?.content);

                console.log(data);
            }
        }

        fetchNote();
      }, [id]);



    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await supabase.from('notes').update({title, content}).eq('id', id);
        if (response.error) {
            console.log(response.error.message);
            toast.error(response.error.message);
        }
        else {
            toast.success("Note updated successfully");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }
  return (
      <div>
          <Header />
          <div className='w-full h-full lg:px-40 px-4 py-4'>
              <p className='text-xl '>Update Note</p>
              
              <form onSubmit={handleOnSubmit} className=" flex flex-col py-6 ">
                  <input className='w-80 h-10 border border-gray-300 rounded-lg px-4 my-2' value={title} type="text" placeholder='Title' name='title' onChange={(e)=>{setTitle(e.target.value)}}/>
                  <textarea className='w-80 h-10 border border-gray-300 rounded-lg px-4 my-2' value={content} type="text" placeholder='Content' name='content' onChange={(e) => { setContent(e.target.value) }} />
                  <button type='submit' className='w-80 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg cursor-pointer mt-6'>Update</button>

              </form>
              
          </div>
    </div>
  )
}

export default Update