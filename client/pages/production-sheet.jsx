import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <div>
          <NavBar className="navbar" />
        </div>
        <div className="container">
          <div className="m-3 d-flex flex-row flex-wrap">
            <div className="col-lg-4 col-12 p-0 ">
              <div className=" d-flex">
                <h2 className="main-title m-1">Production Sheet |  Week 1</h2>
              </div>
            </div>
            <div className="col-lg-8 col-12 p-0">
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
                <div className="m-1">
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
            <li className="mt-5 mb-5 col-12 job-container shadow">
              <div className="d-flex">
                <div className="col">
                  <div className="d-flex mt-1 mb-1">
                    <h4 id="order-number" className="job-status m-1">ASH23-01-001</h4>
                    <h4 id="order-status" className="job-status m-1 text-info">Approved</h4>
                    <h4 id="payment-status " className="job-status m-1 text-success">Paid</h4>
                    <h4 id="shipping-status " className="job-status m-1">Shipped</h4>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-end">
                    <a href=""><i className="fa-solid fa-pen-to-square m-1 edit-icon" /></a>
                  </div>
                </div>
              </div>
              <div id="job-details-header-1" className="d-flex job-details-header p-1 col-12">
                <p className="col fw-bold ">Company Name</p>
                <p className=" col fw-bold">Paper Size</p>
                <p className=" col fw-bold">Paper Weight</p>
                <p className="col fw-bold">Ship Date</p>
                <p className=" col fw-bold">Due Date</p>
                <p className=" col fw-bold">In Home Date</p>
              </div>
              <div id="job-details-1" className="d-flex job-details p-1">
                <p id="company-name" className="m-1 col">Furniture Connection - Clarksville</p>
                {/* will need to figure out how to allow "quotation marks" */}
                <p id="paper-size" className="overflow-x m-1 col">10.75 x 11.875 Full Bleed</p>
                <p id="paper-weight" className="m-1 col">43#</p>
                <p id="ship-date" className="text-danger m-1 col">12/15/22</p>
                <p id="due-date" className="text-danger m-1 col">12/22/22</p>
                <p id="in-home-date" className="text-danger m-1 col">1/2/23</p>
              </div>
              <div id="job-details-header-2" className="d-flex job-details-header p-1">
                <p className="m-1 col fw-bold ">Instructions</p>
                <p className="m-1 col fw-bold">Headline</p>
                <p className="m-1 col fw-bold">Store Copies</p>
                <p className="m-1 col fw-bold">Valassis Atlanta</p>
                <p className="m-1 col fw-bold">Office Copies</p>
                <p className="m-1 col fw-bold">Total Copies</p>
              </div>
              <div id="job-details-2 " className="d-flex job-details p-1">
                <p className="m-1 col ">N/A</p>
                <p className="m-1 col">NEW YEAR, NEW BRANDS, NEW...</p>
                <p className="m-1 col">200</p>
                <p className="m-1 col">345,000</p>
                <p className="m-1 col">100</p>
                <p className="m-1 col">345,3000</p>
              </div>
              <div id="job-details-header-3 " className="d-flex job-details-header p-1">
                <p className="m-1 col fw-bold ">Destination</p>
                <p className="m-1 col fw-bold">Address</p>
                <p className="m-1 col fw-bold">City</p>
                <p className="m-1 col fw-bold">State</p>
                <p className="m-1 col fw-bold">Zip</p>
                <p className="m-1 col fw-bold" />
              </div>
              <div id="job-details-3 " className="d-flex job-details p-1">
                <p className="m-1 col ">Valassis Atlanta</p>
                <p className="m-1 col">7924 Troon Circle, S.W.</p>
                <p className="m-1 col">Austell</p>
                <p className="m-1 col">GA</p>
                <p className="m-1 col">30168</p>
                <p className="m-1 col fw-bold" />
              </div>
              <div id="job-details-3 " className="d-flex job-details p-1">
                <p className="m-1 col ">Furniture Connection</p>
                <p className="m-1 col">2125 International Blvd.</p>
                <p className="m-1 col">Clarksville</p>
                <p className="m-1 col">TN</p>
                <p className="m-1 col">37040</p>
                <p className="m-1 col fw-bold" />
              </div>
              <div id="job-details-3 " className="d-flex job-details p-1">
                <p className="m-1 col ">Color Ad</p>
                <p className="m-1 col">N/A</p>
                <p className="m-1 col">N/A</p>
                <p className="m-1 col">N/A</p>
                <p className="m-1 col">N/A</p>
                <p className="m-1 col fw-bold" />
              </div>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
