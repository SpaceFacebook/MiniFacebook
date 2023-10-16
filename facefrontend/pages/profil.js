import React from "react";
import { useSelector } from "react-redux";

import Profile from "../components/Profile";
import Header from "../components/Header";
const Profil = () => {
  return (
    <div>
      <Header/>
      <Profile/>
    </div>
  );
};

export default Profil;