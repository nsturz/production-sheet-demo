import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <NavBar className="navbar" />
        <div className="m-3 d-flex ">
          <div className="col-4">
            <div className=" d-flex">
              <h3 className="main-title m-1">
                Production Sheet |  Week 1
                <i className="fa-solid fa-clipboard-list ms-3  text-success" />
              </h3>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex">
              <select className="form-select fw-light m-1" aria-label="Default select example">
                <option selected>Year</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select className=" form-select fw-light m-1" aria-label="Default select example">
                <option selected>Week</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="col">
            <div className="d-flex m-1">
              <button type="button" className="btn btn-success ">Search</button>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <h4 className="fw-light"> Weekly Totals: 424,100</h4>
          </div>
        </div>
        <div className="d-flex m-3 ">
          <div className="order-details col-12">
            <div className="d-flex">
              <h4 className="order-number m-1">ASH23-01-001</h4>
              <h4 className="order-status m-1 text-info">Approved</h4>
              <h4 className="payment-status m-1 text-success">Paid</h4>
              <h4 className="shipping-status m-1">Shipped</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
