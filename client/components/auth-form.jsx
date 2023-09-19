import React, { useState } from 'react';

export default function AuthForm(props) {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const [validationMessage, setValidationMessage] = useState('text-danger d-none');

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

  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          props.onSignIn(result);
        } setValidationMessage('text-danger');
      });
  }
  return (
    <form onSubmit={handleSubmit} action="" className="d-flex justify-content-center mb-3 mt-3">
      <div className="col-lg-10 col">
        <div className="p-3">
          <input type="text" className="form-control mb-3 mt-3" placeholder="Username" onChange={handleUsernameChange} required />
          <input id="password" type="password" className="form-control mb-3 mt-3" placeholder="Password" onChange={handlePasswordChange} required />
        </div>
        <div className="d-flex justify-content-center">
          <p className={validationMessage}>Invalid Login</p>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn login-btn">Submit</button>
        </div>
      </div>
    </form>
  );
}
