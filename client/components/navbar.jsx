import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function NavBar(props) {
  const { user, handleSignOut } = useContext(AppContext);

  return (
    <nav className="navbar navbar-expand-lg">
      <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon text-white" />
      </button>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-light" aria-current="page" href="#">
                <img src="/images/colorad.png" alt="" />
              </a>
            </li>
            <li className="nav-item">
              {user !== null &&
                <button className="btn btn-dark" onClick={handleSignOut}>
                  Sign out
                </button>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
