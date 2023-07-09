import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Config';
import {AiOutlineLoading} from 'react-icons/ai'

function Home() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(userCollectionRef);
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserList(users);
        setLoading(false);
        console.log(users);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();

    if(!auth.currentUser){
      navigate('/signin')
    }else{
      navigate('/')
    }
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-0 p-0 bg-white min-h-screen max-h-auto pt-10 pb-20 flex flex-col justify-center items-center">
      {loading ? 
       <div className="flex items-center justify-center h-full">
        <AiOutlineLoading className="animate-spin text-blue-500 text-4xl" />
      </div>
      : (
      <div className="w-full max-w-lg mx-auto bg-gray-50 p-10 rounded-md">
        <div className="bg-white shadow-md rounded-md">
          <h2 className="text-xl underline font-bold mb-2 p-4">Users List</h2>
          <table className="w-full">
            <tbody>
              {userList.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.fName || '{ Unknown Name }'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {userList
          .filter((user) => user.userUID === auth.currentUser?.uid)
          .map((user) => (
            <div key={user.id}>
              <h1 className="text-4xl mt-12 font-bold mb-8">"{user.fName}"s</h1>
              <ul>
                <li className="mb-4">
                  <p className="text-lg font-semibold">Name: {user.fName}</p>
                  <p className="text-lg font-semibold">Email: {user.Email}</p>
                  <p className="text-lg font-semibold">Number: {user.Number}</p>
                  <p className="text-lg font-semibold">Place: {user.Place}</p>
                </li>
              </ul>
            </div>
          ))}
      </div>
      )}
      {auth.currentUser && (
        <div className="flex mt-12 space-x-6 items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
