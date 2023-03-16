import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <NavBar className="navbar" />
        <div className="d-flex m-3 justify-content-center">
          <div className="m-3 d-flex justify-content-center col-11">
            <div className="col-4 ">
              <div className=" d-flex">
                <h3 className="main-title m-1">
                  Production Sheet |  Week 1
                  <i className="fa-solid fa-clipboard-list ms-3  text-success" />
                </h3>
              </div>
            </div>
            <div className="col ">
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
            <div className="">
              <div className="d-flex m-1">
                <button type="button" className="btn btn-success ">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex m-3 justify-content-center">
          <div className=" col-11">
            <h4 className="fw-light"> Weekly Totals: 424,100</h4>
          </div>
        </div>
        <ul id="job-list">
          <li className="d-flex justify-content-center m-3">
            <div className="job-container col-12 shadow">
              <div className="d-flex job-statuses mt-1 mb-1">
                <h4 id="order-number"className=" m-1">ASH23-01-001</h4>
                <h4 id="order-status"className=" m-1 text-info">Approved</h4>
                <h4 id="payment-status "className="m-1 text-success">Paid</h4>
                <h4 id="shipping-status "className="m-1">Shipped</h4>
              </div>
              <div id="job-details-header-1" className="d-flex job-details-header p-1">
                <p className="m-1 border border-primary w-100 ">Company Name</p>
                <p className="m-1 border border-primary w-100">Paper Size</p>
                <p className="m-1 border border-primary w-100">Paper Weight</p>
                <p className="m-1 border border-primary w-100">Ship Date</p>
                <p className="m-1 border border-primary w-100">Due Date</p>
                <p className="m-1 border border-primary w-100">In Home Date</p>
              </div>
              <div id="job-details-1" className="d-flex job-details p-1">
                <p id="company-name" className="overflow-x m-1 fw-light border border-primary w-100 h-100 overflow-x">Furniture Connection - Clarksville</p>
                {/* will need to figure out how to allow "quotation marks" */}
                <p id="paper-size" className="m-1 fw-light border border-primary w-100">10.75 x 11.875 Full Bleed</p>
                <p id="paper-weight" className="m-1 fw-light border border-primary w-100">43#</p>
                <p id="ship-date" className="m-1 fw-light border border-primary w-100">12/15/22</p>
                <p id="due-date" className="m-1 fw-light border border-primary w-100">12/22/22</p>
                <p id="in-home-date" className="m-1 fw-light border border-primary w-100">1/2/23</p>
              </div>
              <div id="job-details-header-2" className="d-flex job-details-header p-1">
                <p className="m-1 ">Company Name</p>
                <p className="m-1">Paper Size</p>
                <p className="m-1">Paper Weight</p>
                <p className="m-1">Ship Date</p>
                <p className="m-1">Due Date</p>
                <p className="m-1">In Home Date</p>
              </div>
              <div id="job-details-2 " className="d-flex job-details p-1">
                <p className="m-1 fw-light ">Company Name</p>
                <p className="m-1 fw-light">Paper Size</p>
                <p className="m-1 fw-light">Paper Weight</p>
                <p className="m-1 fw-light">Ship Date</p>
                <p className="m-1 fw-light">Due Date</p>
                <p className="m-1 fw-light">In Home Date</p>
              </div>
              <div id="job-details-3 " className="d-flex job-details p-1">
                <p className="m-1 fw-light ">Company Name</p>
                <p className="m-1 fw-light">Paper Size</p>
                <p className="m-1 fw-light">Paper Weight</p>
                <p className="m-1 fw-light">Ship Date</p>
                <p className="m-1 fw-light">Due Date</p>
                <p className="m-1 fw-light">In Home Date</p>
              </div>
              <div id="job-details-4 " className="d-flex job-details p-1">
                <p className="m-1 fw-light ">Company Name</p>
                <p className="m-1 fw-light">Paper Size</p>
                <p className="m-1 fw-light">Paper Weight</p>
                <p className="m-1 fw-light">Ship Date</p>
                <p className="m-1 fw-light">Due Date</p>
                <p className="m-1 fw-light">In Home Date</p>
              </div>
            </div>
          </li>
        </ul>

      </div>
    );
  }
}
