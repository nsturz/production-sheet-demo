import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/all-users')
      .then(res => res.json())
      .then(users => {
        setUsers(users);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row mt-4 mb-4">
          <h3>Users</h3>
        </div>
        <div className="d-flex justify-content-center">
          <ul className="col-12 rounded box-shadow pt-3 pb-2 ps-2 pe-2">
            {
              users.map(event => {
                return (
                  <li className="d-flex justify-content-between p-3 mt-3 mb-3"
                    key={event.userId}
                    id={event.userId}>
                    <div className="col" >
                      <div className="d-flex flex-wrap">
                        <div className="col m-2">
                          <div className="d-flex">
                            <p className="user-info me-2">Username:</p>
                            <p className="user-info font-italic">{event.username}</p>
                          </div>
                        </div>
                        <div className="col m-2">
                          <div className="d-flex">
                            <p className="user-info me-2">Date added:</p>
                            <p className="user-info text-primary">{event.dateJoined}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex justify-content-end">
                        <button className="remove-user-btn btn btn-danger">Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
