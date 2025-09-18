import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { userContext } from "../context/UserContext";

export default function LoginButton() {
  const [email, setEmail] = useState("rajendra@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");

    const {setUserAccessToken} = useContext(userContext);
  
  const navigate = useNavigate();

  async function handleLogin(e) {
    setError("");
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("All fields are mandatory!");
      return;
    }
    const body = { email, password };

    try {
      const res = await fetch(`https://contact-manager-op0d.onrender.com/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    //   console.log("res : ", res);
      const data = await res.json();
      console.log("data login: ", data);
      if (data.accessToken) {
        console.log("User logged in");
        setUserAccessToken(data.accessToken);
        return navigate("/user");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Network Error");
      console.log(err);
    }
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Login</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Welcome back
        </Dialog.Description>

        <Flex direction="column" gap="3">
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
          <Button onClick={(e) => handleLogin(e)}>Submit</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
