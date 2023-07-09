import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc , collection } from 'firebase/firestore';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [place, setPlace] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        await updateProfile(result.user, {
          displayName: fullName,
          email:email
        });

        const userCollectionRef = collection(db, 'users');
        await addDoc(userCollectionRef, {
          fName: fullName,
          Email: email,
          Password: password,
          Number: contactNumber,
          Place: place,
          userUID: result.user.uid
        });

        alert('Successful signup');
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form className='flex flex-col  '>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
             required
              type="text"
              id="fullName"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
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
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              required
              type="text"
              id="contactNumber"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-700">
              Place
            </label>
            <input
             required
              type="text"
              id="place"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-indigo-500 text-white rounded-lg py-2 px-4 hover:bg-indigo-600 transition duration-200"
            onClick={handleSignup}
          >
            Sign Up
          </button>
             <h2 className="text-end text-sm w-full underline text-blue-500 font-medium py-2 px-4 ">
              <span className='opacity-80'>Already have an accound ! </span> 
          <Link to="/Signin">
              Sign in.?
           </Link>
             </h2>
        </form>
      </div>
    </div>
  );
}

export default Signup;
