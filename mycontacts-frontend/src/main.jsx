import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router";
import User from "./components/User.jsx";
import UserContext from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="user" element={<User />} />
            <Route path="*" element={<div>404 not found</div>} />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </Theme>
  </StrictMode>
);
