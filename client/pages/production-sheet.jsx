import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import NewJobModal from '../components/new-job-form-modal';

export default function ProductionSheet() {
  const [job, setJob] = useState('');
  useEffect(() => {
    fetch('/api/jobs/1')
      .then(res => res.json())
      .then(job => {
        setJob(job);
      });
  }, []);

  const [years, setYears] = useState([]);
  useEffect(() => {
    // FETCH method GETS all years in database so they can be selected in the form 👇🏼
    fetch('/api/years')
      .then(res => res.json())
      .then(years => {
        setYears(years);
      });
  }, []);

  return (
    <div>
      <div>
        <NavBar className="navbar" />
      </div>
      <div className="container">
        <div className="m-3 d-flex flex-row flex-wrap">
          <div className="col-lg-4 col-12 p-0 ">
            <div className=" d-flex">
              <h3 className="main-title m-1">Production Sheet |  Week 1</h3>
            </div>
          </div>
          <div className="col-lg-8 col-12 p-0">
            <div className="d-flex">
              <select className="form-select fw-light m-1" aria-label="Default select example">
                <option>Select a year.</option>
                {
                  years.map(event => {
                    return (
                      <option id={event.yearId} key={event.yearId}>{event.year}</option>
                    );
                  })
                }
              </select>
              <select className=" form-select fw-light m-1" aria-label="Default select example">
                <option defaultValue>Week</option>
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
            <NewJobModal />
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
              <p id="company-name" className="m-1 col">{job.companyName}</p>
              {/* will need to figure out how to allow "quotation marks" */}
              <p id="paper-size" className="overflow-x m-1 col">{job.paperSize}</p>
              <p id="paper-weight" className="m-1 col">{job.paperWeight}</p>
              <p id="ship-date" className="text-danger m-1 col">{job.shipDate}</p>
              <p id="due-date" className="text-danger m-1 col">{job.dueDate}</p>
              <p id="in-home-date" className="text-danger m-1 col">{job.inHomeDate}</p>
            </div>
            <div id="job-details-header-2" className="d-flex job-details-header p-1">
              <p className="m-1 col fw-bold ">Instructions</p>
              <p className="m-1 col fw-bold">Headline</p>
              <p className="m-1 col fw-bold">Store Copies</p>
              <p className="m-1 col fw-bold">{job.distributorName} Copies</p>
              <p className="m-1 col fw-bold">Office Copies</p>
              <p className="m-1 col fw-bold">Total Copies</p>
            </div>
            <div id="job-details-2 " className="d-flex job-details p-1">
              <p className="m-1 col ">{job.instructions}</p>
              <p className="m-1 col">{job.headline}</p>
              <p className="m-1 col">{job.storeCopies}</p>
              <p className="m-1 col">{job.distributorCopies}</p>
              <p className="m-1 col">{job.officeCopies}</p>
              <p className="m-1 col">{job.distributorCopies + job.storeCopies + job.officeCopies}</p>
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
              <p className="m-1 col ">{job.distributorName}</p>
              <p className="m-1 col">{job.distributorAddress}</p>
              <p className="m-1 col">{job.distributorCity}</p>
              <p className="m-1 col">{job.distributorState}</p>
              <p className="m-1 col">{job.distributorZip}</p>
              <p className="m-1 col fw-bold" />
            </div>
            <div id="job-details-3 " className="d-flex job-details p-1">
              <p className="m-1 col ">{job.companyName}</p>
              <p className="m-1 col">{job.companyAddress}</p>
              <p className="m-1 col">{job.companyCity}</p>
              <p className="m-1 col">{job.companyState}</p>
              <p className="m-1 col">{job.companyZip}</p>
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
