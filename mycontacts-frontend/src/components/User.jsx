import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import CreateContact from "./CreateContact";
import UserCard from "./UserCard";

export default function User() {
  const [contacts, setContacts] = useState([]);
  const {userAccessToken} = useContext(userContext);
  // console.log("token ", use)
  
  useEffect(() => {
    async function getContacts() {
      try {
        const res = await fetch("http://localhost:5001/api/contacts", {
          headers: {
            Authorization: `Bearer ${userAccessToken}`
          }
        });
        const data = await res.json();

        console.log("contacts ", data);
        if (res.status == 200) {
          setContacts(data);
        } else {
          console.log("user is not authenticated");
        }
      } catch (err) {
        console.log("Network error ", err);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-4">
      <header>

      <h3 className="font-semibold text-2xl">Your Contacts</h3>
      <CreateContact />
      </header>
      <hr />
      <div className="flex gap-4 flex-wrap ">
        {contacts?.map((contact) => {
          return (<UserCard key={contact._id} contact={contact}/>
            
          );
        })}
      </div>
    </div>
  );
}
