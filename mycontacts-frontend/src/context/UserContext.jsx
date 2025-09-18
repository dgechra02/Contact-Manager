import React, { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

export default function UserContext({ children }) {
  const [userAccessToken, setUserAccessToken] = useState(localStorage.getItem("userCookie") || "");

  // useEffect(() => {
  //   console.log("token : ", localStorage.getItem("userCookie"));
  // }, []);


  useEffect(() => {
    localStorage.setItem("userCookie", userAccessToken);
  }, [userAccessToken]);

  return (
    <userContext.Provider value={{ userAccessToken, setUserAccessToken }}>
      {children}
    </userContext.Provider>
  );
}
