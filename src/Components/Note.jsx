import React from "react";
import { useUser } from "../hooks/useUser";
import { supabase } from "../supabase/Config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Note = ({ note, fetchNotes }) => {
  const user = useUser();

  const currrentUser = user?.identities[0].user_id;

  const navigate = useNavigate();

  const handleDelete = async () => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", note.id);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
    toast.success("Note deleted successfully");
    fetchNotes();
  };

  return (
    <div
      key={note.id}
      className="h-fit p-4 border border-gray-300 flex flex-col justify-between gap-4
       rounded-2xl"
    >
      <div>
        <p className="text-sm text-gray-500">tilte</p>
        <input type="text" value={note.title} />
        <p className="text-sm text-gray-500 mt-1">Content</p>

        <p className=" h-20 overflow-hidden text-sm text-gray-700 border border-gray-300 p-1 rounded-lg ">
          {note.content}
        </p>
      </div>
      {note.userId === currrentUser && (
        <div className="flex gap-4 justify-end">
          <button
            className="px-6 py-1 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-sm cursor-pointer"
            onClick={() => {
              navigate(`/update/${note.id}`);
            }}
          >
            Edit
          </button>
          <button
            className="px-4 py-1 bg-red-300 hover:bg-red-400 text-white font-medium rounded-sm cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Note;
