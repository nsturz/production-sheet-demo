import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <NavBar className="navbar" />
        <div className="container col-12">
          <div className="row">
            <div className="m-3 d-flex justify-content-center">
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
          <div className="d-flex justify-content-center m-3">
            <div className="col-12">
              <h4 className="fw-light"> Weekly Totals: 424,100</h4>
            </div>
          </div>
          <ul id="job-list">
            <li className="d-flex justify-content-center m-3">
              <div className="job-container col-12 shadow m-3">
                <div className="d-flex job-statuses mt-1 mb-1">
                  <h4 id="order-number" className=" m-1">ASH23-01-001</h4>
                  <h4 id="order-status" className=" m-1 text-info">Approved</h4>
                  <h4 id="payment-status " className="m-1 text-success">Paid</h4>
                  <h4 id="shipping-status " className="m-1">Shipped</h4>
                </div>
                <div id="job-details-header-1" className="d-flex job-details-header p-1 col-12">
                  <p className=" col-2 ">Company Name</p>
                  <p className=" col-2">Paper Size</p>
                  <p className=" col-2">Paper Weight</p>
                  <p className="col-2">Ship Date</p>
                  <p className=" col-2">Due Date</p>
                  <p className=" col-2">In Home Date</p>
                </div>
                <div id="job-details-1" className="d-flex job-details p-1">
                  <p id="company-name" className="overflow-x overflow-y fw-light col-2">Furniture Connection - Clarksville</p>
                  {/* will need to figure out how to allow "quotation marks" */}
                  <p id="paper-size" className="overflow-x m-1 fw-light col-2">10.75 x 11.875 Full Bleed</p>
                  <p id="paper-weight" className="m-1 fw-light col-2">43#</p>
                  <p id="ship-date" className="m-1 fw-light col-2">12/15/22</p>
                  <p id="due-date" className="m-1 fw-light col-2">12/22/22</p>
                  <p id="in-home-date" className="m-1 fw-light col-2">1/2/23</p>
                </div>
                <div id="job-details-header-2" className="d-flex job-details-header p-1">
                  <p className="m-1 w-100 ">Instructions</p>
                  <p className="m-1 w-100">Headline</p>
                  <p className="m-1 w-100">Store Copies</p>
                  <p className="m-1 w-100">Valassis Atlanta</p>
                  <p className="m-1 w-100">Office Copies</p>
                  <p className="m-1 w-100">Total Copies</p>
                </div>
                <div id="job-details-2 " className="d-flex job-details p-1">
                  <p className="m-1 fw-light w-100 ">N/A</p>
                  <p className="m-1 fw-light w-100">NEW YEAR, NEW BRANDS, NEW...</p>
                  <p className="m-1 fw-light w-100">200</p>
                  <p className="m-1 fw-light w-100">345,000</p>
                  <p className="m-1 fw-light w-100">100</p>
                  <p className="m-1 fw-light w-100">345,3000</p>
                </div>
                <div id="job-details-header-3 " className="d-flex job-details-header p-1">
                  <p className="m-1 w-100 ">Destination</p>
                  <p className="m-1 w-100">Address</p>
                  <p className="m-1 w-100" />

                  <p className="m-1 w-100">City</p>
                  <p className="m-1 w-100">State</p>
                  <p className="m-1 w-100">Zip</p>
                </div>
                <div id="job-details-3 " className="d-flex job-details p-1">
                  <p className="m-1 fw-light w-100 h-100 ">VALASSIS ATLANTA</p>
                  <p className="m-1 fw-light w-100 h-100">7924 Troon Circle, S.W.</p>
                  <p className="m-1 fw-light w-100 h-100" />
                  <p className="m-1 fw-light w-100 h-100">Austell</p>
                  <p className="m-1 fw-light w-100 h-100">GA</p>
                  <p className="m-1 fw-light w-100 h-100">30168</p>
                </div>
                <div id="job-details-3 " className="d-flex job-details p-1">
                  <p className="m-1 fw-light w-100 h-100 ">FURNITURE CONNECTION</p>
                  <p className="m-1 fw-light w-100 h-100">2125 INTERNATIONAL BLVD</p>
                  <p className="m-1 fw-light w-100 h-100" />
                  <p className="m-1 fw-light w-100 h-100">CLARKSVILLE</p>
                  <p className="m-1 fw-light w-100 h-100">TN</p>
                  <p className="m-1 fw-light w-100 h-100">37040</p>
                </div>
                <div id="job-details-3 " className="d-flex job-details p-1">
                  <p className="m-1 fw-light w-100 h-100 ">Color Ad</p>
                  <p className="m-1 fw-light w-100 h-100">N/A</p>
                  <p className="m-1 fw-light w-100 h-100" />
                  <p className="m-1 fw-light w-100 h-100">N/A</p>
                  <p className="m-1 fw-light w-100 h-100">N/A</p>
                  <p className="m-1 fw-light w-100 h-100">N/A</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
