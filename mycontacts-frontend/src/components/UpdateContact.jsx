import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { userContext } from "../context/UserContext";

export default function UpdateContact({ contact }) {
  const [name, setName] = useState(contact.name || "");
  const [email, setEmail] = useState(contact.email || "");
  const [phone, setPhone] = useState(contact.phone || "");
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const { userAccessToken } = useContext(userContext);

  async function handleUpdate(e) {
    setError("");
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("All fields are mandatory!");
      return;
    }
    const body = { name, email, phone };

    try {
      const res = await fetch(`http://localhost:5001/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data._id) {
        console.log("Contact updated");
        alert("Contact updated");
        setFormOpen(false);
      } else {
        setError("Unauthorized user");
      }
    } catch (err) {
      setError("Network Error");
      console.log(err);
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button onClick={() => setFormOpen(true)}>Edit</Button>
        </Dialog.Trigger>

        {formOpen ? (
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Update</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Update this contact
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Name
                </Text>
                <TextField.Root
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Email"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Root
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Phone
                </Text>
                <TextField.Root
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" color="red">
                  {error}
                </Text>
              </label>
            </Flex>
            <Flex gap="3" mt="4" justify="center">
              <Button onClick={(e) => handleUpdate(e)}>Submit</Button>
            </Flex>
          </Dialog.Content>
        ) : null}
      </Dialog.Root>
    </div>
  );
}
