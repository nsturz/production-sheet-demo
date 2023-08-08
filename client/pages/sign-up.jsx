import React, { useState } from 'react';
import SignUpForm from '../components/sign-up-form';
import NavBar from '../components/navbar';

export default function SignUp() {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const [referencePassword, setReferencePassword] = useState('');
  const [overlay, setOverlay] = useState('overlay d-none');
  const [newUserWrapper, setNewUserWrapper] = useState('position-fixed new-user-modal-wrapper col-10 col-lg-8 d-none');

  const handleUsernameChange = event => {
    event.persist();
    setState({
      ...state,
      username: event.target.value
    });
  };

  const handlePasswordChange = event => {
    event.persist();
    setState({
      ...state,
      password: event.target.value
    });
  };

  const handleReferencePasswordChange = event => {
    event.persist();
    setReferencePassword(event.target.value);
  };

  function closeNewUserModal() {
    document.getElementById('sign-up-form').reset();
    setOverlay('overlay d-none');
    setNewUserWrapper('position-fixed new-user-modal-wrapper col-10 col-lg-8 d-none');
  }

  function addUser(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        if (result) {
          setOverlay('overlay');
          setNewUserWrapper('position-fixed new-user-modal-wrapper col-10 col-lg-8');
        }
      });
    setState({
      username: '',
      password: ''
    });
    setReferencePassword('');
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-center pt-5">
          <div className="col-10 login-wrapper box-shadow rounded mt-5 pb-5 border">
            <div className="d-flex justify-content-center mt-3 mb-3">
              <img src="/images/colorad.png" alt="" />
            </div>
            <div className="d-flex justify-content-center mt-3 mb-3">
              <h2 className="fw-bold">Create New User</h2>
            </div>
            <SignUpForm addUser={addUser} state={state} setState={setState} referencePassword={referencePassword}
              setReferencePassword={setReferencePassword} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}
              handleReferencePasswordChange={handleReferencePasswordChange}/>
          </div>
        </div>
        <div className={overlay} />
        <div className={newUserWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center' id="cancel-job-form">
              <div>
                <div className="d-flex">
                  <h5 className='text-center mt-5'>New User Created</h5>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-check text-success" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeNewUserModal} type='button' className="btn done-btn mt-5 ms-3 me-3 mb-5 col-5">Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
