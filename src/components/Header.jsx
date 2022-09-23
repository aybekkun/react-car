import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import LeafImg from "../assets/images/leaf.svg"
const Header = () => {
  return (
    <>
      <Navbar className="nav p-3" expand="lg">
        <Link to="/"><img width={45} src={LeafImg} alt="Logo" /></Link>
      </Navbar>
    </>
  );
};

export default Header;
