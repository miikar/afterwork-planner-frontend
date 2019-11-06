import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../Firebase/firebase";

import "./header.styles.scss";

const Header = ({ user }) => (
  <div className="header">
    {/* <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link> */}
    <div className="options">
      <Link className="option" to="/event">
        Event
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {user ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

export default Header;
