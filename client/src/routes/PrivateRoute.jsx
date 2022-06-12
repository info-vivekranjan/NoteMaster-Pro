import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalData } from "../utils/localStorage";

function PrivateRoute({ children }) {
  const logSuccess = getLocalData("userInfo")?.token?.length;
  return logSuccess > 0 ? children : <Navigate to="/" />;
}
export default PrivateRoute;