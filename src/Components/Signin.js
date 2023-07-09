import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/Config';
import { Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';


function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      navigate('/');
      alert('successed signin');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    }
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form className='flex flex-col  '>
            <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              required
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              required
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600 transition duration-200"
            onClick={handleSignin}
          >
            Sign In
          </button>
             <h2 className="text-end text-sm w-full underline text-blue-500 font-medium py-2 px-4 ">
             <span className=' opacity-80'>Don't have an accound ! </span>
            <Link to="/Signup">
              Sign up
            </Link>
             </h2>
        </form>
      </div>
    </div>
  );
}

export default Signin;