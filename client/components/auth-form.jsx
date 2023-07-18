import React, { useState } from 'react';

export default function AuthForm(props) {
  // const [ username, setUsername ] = useState('');
  // const [ password, setPassword ] = useState('');
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setState({ [name]: value });
  }

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
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} action="" className="d-flex justify-content-center mb-3 mt-3">
      <div className="col-lg-10">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Username" onChange={handleChange} />
          <input id="password" type="password" className="form-control mb-3 mt-3" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn login-btn">Submit</button>
        </div>
      </div>
    </form>
  );
}
