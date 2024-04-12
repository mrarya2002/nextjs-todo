'use client'
import { useState } from 'react';
// import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import Link from 'next/link'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('')

    } catch(e){
        console.error(e)
    }
  };

  return (
    <div className="h-full flex items-center justify-center pt-20">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        <p className="text-center text-white mt-2">Already Have account? <Link className="text-indigo-600" href="/login">signin</Link> </p>
      </div>
    </div>
  );
};

export default SignUp;