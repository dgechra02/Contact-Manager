import { Button } from "@radix-ui/themes";
import { useContext } from "react";
import { userContext } from "../context/UserContext";

export default function DeleteContact({ contact }) {
  const { userAccessToken } = useContext(userContext);

  async function handleDelete(e) {
    e.preventDefault();

    const sure = confirm("Are you sure?");
    if (sure) {
      try {
        const res = await fetch(
          `${import.meta.HOST_LINK}/api/contacts/${contact._id}`,
          {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userAccessToken}`,
            },
          }
        );
        const data = await res.json();
        if (data._id) {
          console.log("Contact deleted");
          alert("Contact deleted");
        } else {
          alert("Unauthorized user");
        }
      } catch (err) {
        alert("Network Error");
        console.log(err);
      }
    }
  }

  return (
    <Button onClick={(e) => handleDelete(e)} color="red">
      Delete
    </Button>
  );
}
