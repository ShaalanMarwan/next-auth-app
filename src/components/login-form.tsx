"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";
export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setError("");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          setError(JSON.parse(res.error).message);
        } else {
          clearInputs();
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(e);
        setError(err);
      });
  };

  return (
    <form
      className="flex flex-col space-y-12 w-full px-32"
      onSubmit={handleSubmit}
    >
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
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};
