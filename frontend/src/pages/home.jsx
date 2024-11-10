import React from "react";
import Feedposts from "../components/feedposts.jsx";
import { useSelector } from "react-redux";
const Home = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div>
      {token}
      <Feedposts />
    </div>
  );
};

export default Home;
