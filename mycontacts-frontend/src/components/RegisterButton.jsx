import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function RegisterButton() {
  const [username, setUsername] = useState("echra@123");
  const [email, setEmail] = useState("echra@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  async function handleRegister(e) {
    setError("");
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are mandatory!");
      return;
    }
    const body = { username, email, password };

    try {
      const res = await fetch(`${import.meta.HOST_LINK}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //   console.log("res : ", res);
      const data = await res.json();
      console.log("data login: ", data);
      if (data._id) {
        alert("Registerd successfully, now you can log in");
        setFormOpen(false);
      } else {
        alert("something went wrong");
      }
    } catch (err) {
      setError("Network Error");
      console.log(err);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={() => setFormOpen(true)}>Register</Button>
      </Dialog.Trigger>

      {formOpen ? (
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Register</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Register yourself for contact manager
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Root
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
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
                Password
              </Text>
              <TextField.Root
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Button onClick={(e) => handleRegister(e)}>Submit</Button>
          </Flex>
        </Dialog.Content>
      ) : null}
    </Dialog.Root>
  );
}
