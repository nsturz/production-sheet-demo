import React, { useState } from 'react';

export default function SignUpForm() {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const [referencePassword, setReferencePassword] = useState('');

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

  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json());
    // .then(result => {
    //   if (result.user && result.token) {
    //     props.onSignIn(result);
    //   }
    // });
    document.getElementById('sign-up-form').reset();
  }

  return (
    <form onSubmit={handleSubmit} action="" id="sign-up-form"className="d-flex justify-content-center mb-3 mt-3">
      <div className="col-lg-10">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Username" onChange={handleUsernameChange} required />
          <input type="password" className="form-control mb-3 mt-3" placeholder="Password" onChange={handleReferencePasswordChange} required />
          <input id="password" type="password" className="form-control mb-3 mt-3" placeholder="Confirm Password" onChange={handlePasswordChange} required />
        </div>
        {
          referencePassword !== state.password &&
          <div className="d-flex justify-content-center">
            <p className="text-danger">Passwords do not match</p>
          </div>
        }
        {
          (referencePassword === state.password && referencePassword.length !== 0) &&
          <div className="d-flex justify-content-center">
            <p className="text-success">Passwords match</p>
          </div>
        }
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn login-btn">Sign Up</button>
        </div>
      </div>
    </form>
  );
}
