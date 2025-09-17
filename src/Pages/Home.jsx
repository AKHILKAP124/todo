
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import Note from "../Components/Note";
import { supabase } from "../supabase/Config";
import { useEffect, useState } from "react";

const Notes = [
  {
    id: 1,
    title: "Note 1",
    content: "Content 1",
  },
  {
    id: 2,
    title: "Note 2",
    content:
      "lorem50wkwjf wfkjwef uwqk ejfwi qf wqkfeh wqefhuwhqef wiq efqwfh wqefiq jhf gg gh ghghgjhjghbb hgh gg hg hghg",
  },
  {
    id: 3,
    title: "Note 3",
    content: "Content 3",
  },
];

const Home = () => {
      const [isLoading, setIsLoading] = useState(false);
  
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  
  
  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("notes").select("*");
    if (error) {
      console.log(error);
    }

    if (data) {
      setNotes(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <div>
      <Header />
      <div className="w-full h-full px-40 py-4">
        <div className="w-full h-full flex justify-between items-center">
          <p className="text-2xl font-bold">Notes</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-xl cursor-pointer"
            onClick={() => {
              navigate("/create");
            }}
          >
            + Create
          </button>
        </div>
      </div>
      <div className="w-full h-full px-40 py-4 grid grid-cols-4 gap-4">
        {notes.map((note) => (
          <Note note={note} fetchNotes={fetchNotes} />
        ))}
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-xl ">Loading...</p>
          </div>
        )}
        {
          notes.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-xl ">No Notes Found!</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
