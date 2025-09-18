import React from "react";
import UpdateContact from "./UpdateContact";
import DeleteContact from "./DeleteContact";

export default function UserCard({ contact }) {
  return (
    <div className="border-2 shadow-2xl rounded-2xl p-2 flex flex-col gap-2 w-96">
      <span>Name: {contact.name}</span>
      <span>Email: {contact.email}</span>
      <span>Phone: {contact.phone}</span>
      <div className="flex gap-2">
        <UpdateContact contact={contact} />
        <DeleteContact contact={contact} />
      </div>
    </div>
  );
}
