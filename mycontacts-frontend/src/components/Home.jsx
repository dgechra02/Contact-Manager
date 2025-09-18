import React from "react";
import Header from "./Header";
import LoginButton from "./LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Header />
      <div className="flex flex-col justify-center items-center w-full h-[550px] gap-4">
        <div className="text-5xl font-bold">Welcome to Contact Manager App</div>
        <span className="text-2xl font-semibold">Create & Manage your contact</span>
        <LoginButton />
      </div>
    </div>
  );
}
