import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div className="flex-row space-between">
        <h1>
          <font color="#F4EB72">2</font>doozies
        </h1>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <button href="/" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
