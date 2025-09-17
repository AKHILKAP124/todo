import React, { useState } from 'react'
import { useUser } from '../hooks/useUser';
import { supabase } from '../supabase/Config';
import toast from 'react-hot-toast';

const Note = ({ note }) => {

  const [noteData, setNoteData] = useState({
    title: note.title,
    content: note.content,
  });

  

  const user = useUser();

  const currrentUser = user?.identities[0].user_id


  const handleDelete = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", note.id);
    if (error) {
      console.log(error);
    }
    toast.success("Note deleted successfully");
  };
  
  
  return (
    <div
      key={note.id}
      className="h-fit p-4 border border-gray-300 flex flex-col justify-between gap-4
       rounded-2xl"
    >
      <div>
        <p className="text-sm text-gray-500">tilte</p>
        <input type="text" value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />
        <p className="text-sm text-gray-500 mt-1">Content</p>

        <textarea name="" value={noteData.content} onChange={(e) => setNoteData({ ...noteData, content: e.target.value })} />
      </div>
      {note.userId === currrentUser && (
      <div className="flex gap-4 justify-end">
          <button className="px-6 py-1 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-sm cursor-pointer"
          onClick={() => {}}>
          Edit
        </button>
          <button className="px-4 py-1 bg-red-300 hover:bg-red-400 text-white font-medium rounded-sm cursor-pointer"
          onClick={handleDelete}>
          Delete
        </button>
        </div>
      )}
    </div>
  );
}

export default Note