import React from 'react';
import NavBar from '../components/navbar';
import RemoveUserModal from '../components/remove-user-modal';

export default function Users(props) {

  function closeRemoveUserModal() {
    props.setRemoveUserOverlay('overlay d-none');
    props.setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
    props.setSelectedUser({
      userId: ''
    });
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row mt-4 mb-4">
          <h3>Users</h3>
        </div>
        <div className="d-flex justify-content-center">
          <ul className="col-lg-12 col rounded box-shadow pt-3 pb-2 ps-2 pe-2">
            {
              props.users.map(event => {
                return (
                  <li className="d-flex justify-content-between p-3 mt-4 mb-4"
                    key={event.userId}
                    id={event.userId}>
                    <div className="col-lg-8 m-2" >
                      <div className="d-flex flex-wrap">
                        <div className="col-7">
                          <div className="d-flex">
                            <p className="user-info me-2">Username:</p>
                            <p className="user-info font-italic">{event.username}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="d-flex">
                            <p className="user-info me-2">Date added:</p>
                            <p className="user-info text-primary">{event.dateJoined}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex justify-content-end">
                        <button id={event.userId}
                          className="remove-user-btn btn btn-sm btn-danger mt-2"
                          onClick={props.showRemoveUserModal}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <RemoveUserModal
          onSubmit={props.removeUser}
          removeUserOverlay={props.removeUserOverlay}
          setRemoveUserOverlay={props.setRemoveUserOverlay}
          removeUserModalWrapper={props.removeUserModalWrapper}
          setRemoveUserModalWrapper={props.setRemoveUserModalWrapper}
          closeRemoveUserModal={closeRemoveUserModal}
          selectedUser={props.selectedUser}
          setSelectedUser={props.setSelectedUser} />
      </div>
    </div>
  );
}
