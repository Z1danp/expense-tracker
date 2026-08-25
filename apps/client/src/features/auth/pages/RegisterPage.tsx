import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen bg-charcoal-gray flex flex-col items-center justify-center relative overflow-hidden">

      <div className="z-10 flex flex-col items-center w-full max-w-100 px-5">
        <h1 className="self-start mb-6">
          <span className="bg-white text-red font-bebas text-3xl px-3 py-1">
            SIGN UP
          </span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-maroon border border-white p-6 w-full flex flex-col gap-2"
        >
          <label className="text-white font-barlow font-bold text-base mt-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full font-barlow p-2 text-base border-3 bg-white border-black outline-none"
          />

          <label className="text-white font-barlow font-bold text-base mt-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full font-barlow p-2 text-base border-3 bg-white border-black outline-none"
          />

          <label className="text-white font-barlow font-bold text-base mt-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-barlow p-2 text-base border-3 bg-white border-black outline-none"
          />

          <button
            type="submit"
            className="mt-4 p-1 bg-red text-white font-barlow font-bold text-xl border-3 border-white cursor-pointer w-full hover:bg-white hover:text-red hover:border-red transition-opacity"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white font-barlow font-bold mt-5 text-base">
          Already have an account?{" "}
          <span className="text-white  font-bold border-3 border-acid-yellow hover:bg-white hover:text-red hover:border-acid-yellow bg-red px-1.5 py-0.5 cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;