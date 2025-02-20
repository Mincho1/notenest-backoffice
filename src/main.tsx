import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = "524685152360-ggafgo2nioc5do7ls3248lt775j1tmtp.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <App />
      </React.StrictMode>
  </GoogleOAuthProvider>
);

