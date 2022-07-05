import React from 'react';
import {Navigate } from "react-router-dom";

const RequireAuthUser = ({ loggedIn, children  }) => {
  return loggedIn ?  <Navigate to="/" /> : children
  }

export default RequireAuthUser;