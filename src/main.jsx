import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-gnixppt0jpmby76e.us.auth0.com"
    clientId="XunElOmZEsRb5th7xQLygn2ZOECTro1V"
    authorizationParams={{
      redirect_uri:"http://localhost:3000"
    }}
    audience="http://localhost:3001"
    scope="openid profile email"
    >
      <App /> 
    </Auth0Provider>
  </React.StrictMode>
);