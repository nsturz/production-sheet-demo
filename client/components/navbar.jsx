import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function NavBar(props) {
  const { user, handleSignOut } = useContext(AppContext);

  // console.log('user:', user.username)
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
          </ul>
          {
            user.username === 'anonymous' &&
            <div className="dropdown show">
              <a className="btn btn-secondary dropdown-toggle mt-3" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a href="#sign-up" className="new-user-link ms-2">New User</a>
              </div>
            </div>
          }
          {user !== null &&
            <button className="btn btn-dark bg-transparent border-0 mt-3" onClick={handleSignOut}>
              Sign out
            </button>
          }
        </div>
      </div>
    </nav>
  );
}
