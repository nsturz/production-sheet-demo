import React from 'react';

export default function LoginPage() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5">
        <div className="col-8 login-wrapper rounded box-shadow mt-5 pb-5">
          <div className="d-flex justify-content-center mt-3 mb-3">
            <img src="/images/colorad.png" alt="" />
          </div>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <h2 className="fw-bold">Production Sheet</h2>
          </div>
          <form action="" className="d-flex justify-content-center mb-3 mt-3">
            <div className="col-lg-10">
              <div>
                <input type="email" className="form-control mb-3 mt-3" placeholder="Email"/>
                <input type="password" className="form-control mb-3 mt-3" placeholder="Password"/>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn login-btn">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
