import React, { useContext } from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function Auth() {

  const { user, route, handleSignIn } = useContext(AppContext);

  if (user) return <Redirect to="" />;
  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5">
        <div className="col-lg-8 col login-wrapper box-shadow rounded mt-5 pb-5 border">
          <div className="d-flex justify-content-center mt-3 mb-3">
            <img src="/images/colorad.png" alt="" />
          </div>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <h2 className="fw-bold">Production Sheet</h2>
          </div>
          <AuthForm
            key={route.path}
            action={route.path}
            onSignIn={handleSignIn} />
        </div>
      </div>
    </div>
  );
}
