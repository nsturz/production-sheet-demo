import React, { useState } from 'react';
import NavBar from '../components/navbar';

export default function Users(props) {

  const [overlay, setOverlay] = useState('overlay d-none');
  const [removeUserModalWrapper, setRemoveUserModalWrapper] = useState('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
  const [selectedUser, setSelectedUser] = useState({
    userId: ''
  });

  // console.log('selectedUser:', selectedUser)

  function showRemoveUserModal(event) {
    event.preventDefault();
    setSelectedUser({
      userId: Number(event.target.id)
    });
    setOverlay('overlay');
    setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8');
  }

  function closeRemoveUserModal() {
    setOverlay('overlay d-none');
    setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
    setSelectedUser({
      userId: ''
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(selectedUser);
    setOverlay('overlay d-none');
    setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
    setSelectedUser({
      userId: ''
    });
  }

  // console.log('props.users:', props.users)
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
                          onClick={showRemoveUserModal}>
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
        <div className={overlay} />
        <div className={removeUserModalWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center'>
              <form onSubmit={handleSubmit}>
                <div>
                  <h5 className='text-center mt-5'>Remove User?</h5>
                  <p className="text-center">This action cannot be undone</p>
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeRemoveUserModal}
                    type='button' className="btn btn-secondary mt-5 ms-3 me-3 mb-5 col-5">Close</button>
                  <button type="submit"
                    className="btn btn-danger mt-5 ms-3 me-3 mb-5 col-5 ">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
