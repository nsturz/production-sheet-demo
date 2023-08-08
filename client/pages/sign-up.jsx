import React from 'react';
import SignUpForm from '../components/sign-up-form';
import NavBar from '../components/navbar';

export default function SignUp() {

  // const { user, route, handleSignIn } = useContext(AppContext);

  // if (user) return <Redirect to="" />;

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-center pt-5">
          <div className="col-8 login-wrapper box-shadow rounded mt-5 pb-5 border">
            <div className="d-flex justify-content-center mt-3 mb-3">
              <img src="/images/colorad.png" alt="" />
            </div>
            <div className="d-flex justify-content-center mt-3 mb-3">
              <h2 className="fw-bold">Create New User</h2>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
