"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import React from "react";
export const RegistrationForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // TODO: registration 
   
  };

  return (
    
      <form className="flex flex-col space-y-12 w-full px-32" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="border-b border-b-gray-200 hover:border-b-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="border-b border-b-gray-200 hover:border-b-gray-500"
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    
  );
};
