import React from 'react';

export default function SignUpForm(props) {

  return (
    <form onSubmit={props.addUser} action="" id="sign-up-form"className="d-flex justify-content-center ms-3">
      <div className="col-12">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Username" onChange={props.handleUsernameChange} required />
          <input type="password" className="form-control mb-3 mt-3" placeholder="Password" onChange={props.handleReferencePasswordChange} required />
          <input id="password" type="password" className="form-control mb-3 mt-3" placeholder="Confirm Password" onChange={props.handlePasswordChange} required />
          <input type="checkbox" id="admin-privileges" className="m-2"
                 onChange={
                   props.state.isAdmin === false
                     ? props.handleIsAdminChange
                     : props.handleIsNotAdminChange
                 } />
          <label htmlFor="admin-privileges" className="m-2">Check box to give this user admin privileges.</label>
        </div>
        {
          (props.referencePassword !== props.state.password && props.referencePassword.length !== 0 &&
            props.state.password !== 0) &&
            <div>
              <p className="text-danger">Passwords do not match</p>
            </div>
        }
        {
          (props.referencePassword === props.state.password && props.referencePassword.length !== 0) &&
          <div>
            <p className="text-success">Passwords match</p>
          </div>
        }
        <div>
          <button type="button" className="btn btn-secondary mt-2" onClick={props.hideNewUserForm}>Cancel</button>
          <button type="submit" className="btn login-btn ms-3 mt-2">Sign Up</button>
        </div>
      </div>
    </form>
  );
}
