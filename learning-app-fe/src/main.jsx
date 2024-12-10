import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={import.meta.VITE_APP_CLIENT_ID_GOOGLE}>
        <App />
    </GoogleOAuthProvider>
);
