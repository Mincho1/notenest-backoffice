import { useEffect, useState } from "react";
import axios from "axios";

interface NoteTag {
  id: string;
  name: string;
}

const ListAllNoteTags = () => {
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoteTags = async () => {
      try {
        const response = await axios.get("http://84.21.205.113:3001/api/note-tags"); 
        setNoteTags(response.data); 
        setLoading(false);
      } catch (err: any) {
        setError("Грешка при зареждане на Note Tags.");
        setLoading(false);
      }
    };

    fetchNoteTags();
  }, []);

  if (loading) {
    return <div>Зареждане...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Списък с всички Note Tags</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        {noteTags.length === 0 ? (
          <p className="text-center py-4">Няма налични Note Tags.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {noteTags.map((noteTag) => (
              <li key={noteTag.id} className="px-6 py-4">
                <span>{noteTag.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListAllNoteTags;

