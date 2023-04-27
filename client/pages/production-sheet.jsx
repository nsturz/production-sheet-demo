import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import NewJobModal from '../components/new-job-form-modal';
import EditModal from '../components/edit-job-modal';

export default function ProductionSheet(props) {
  const [weeks, setWeeks] = useState([]);

  const [totalCopies, setTotalCopies] = useState('');

  const [values, setValues] = useState({
    yearId: '',
    weekId: '',
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    distributorId: '',
    jobNumber: '',
    paperSize: '',
    paperWeight: '',
    shippingStatus: '',
    paymentStatus: '',
    orderStatus: '',
    distributorCopies: '',
    storeCopies: '',
    officeCopies: '',
    instructions: '',
    shipDate: '',
    dueDate: '',
    inHomeDate: '',
    headline: ''
  });

  // FETCH method GETS all distributors in database so they can be selected in the form 👇🏼
  const [distributors, setDistributors] = useState([]);
  useEffect(() => {
    fetch('/api/distributors')
      .then(res => res.json())
      .then(distributors => {
        setDistributors(distributors);
      });
  }, []);

  // this grabs all the years from the database first so that it can be displayed
  // both on ProductionSheet, and NewJobModal 👇🏼
  const [years, setYears] = useState([]);
  useEffect(() => {
    fetch('/api/years')
      .then(res => res.json())
      .then(years => {
        setYears(years);
      });
  }, []);

  // These useState variables allow the "search" button to work properly when pressed
  // it gets cleared immediately after submitting the form 👇🏼
  const [searchParams, setSearchParams] = useState({
    yearId: '',
    weekId: '',
    year: '',
    week: ''
  });

  // These useState variables grab the value from searchParams, and store them so
  // they can be rendered 👇🏼
  const [weekAndYear, setWeekAndYear] = useState({
    year: '',
    week: ''
  });

  const handleYearChange = event => {
    event.persist();
    for (let i = 0; i < years.length; i++) {
      if (Number(event.target.value) === years[i].year) {
        fetch(`/api/weeks/${years[i].yearId}`)
          .then(res => res.json())
          .then(weeks => {
            setWeeks(weeks);
          });
        setSearchParams({
          ...searchParams,
          yearId: years[i].yearId,
          year: years[i].year
        });
      }
    }
  };
  const handleWeekChange = event => {
    event.persist();
    for (let i = 0; i < weeks.length; i++) {
      if (Number(event.target.value) === weeks[i].week) {
        setSearchParams({
          ...searchParams,
          weekId: weeks[i].weekId,
          week: weeks[i].week
        });
      }
    }
  };

  // This state and useEffect GETS 1 job form the database, might delete later. 👇🏼
  const [job, setJob] = useState('');
  useEffect(() => {
    fetch('/api/jobs/1')
      .then(res => res.json())
      .then(job => {
        setJob(job);
      });
  }, []);

  // All code from "START 🏁" to "FINISH 🏁" is used for the form in <NewJobModal /> 👇🏼
  // START 🏁
  const handleYearIdChange = event => {
    event.persist();
    for (let i = 0; i < years.length; i++) {
      if (Number(event.target.value) === years[i].year) {
        fetch(`/api/weeks/${years[i].yearId}`)
          .then(res => res.json())
          .then(weeks => {
            setWeeks(weeks);
          });
        setValues(values => ({
          ...values,
          yearId: years[i].yearId
        }));
      }
    }
  };

  const handleWeekIdChange = event => {
    event.persist();
    for (let i = 0; i < weeks.length; i++) {
      if (Number(event.target.value) === weeks[i].week) {
        setValues(values => ({
          ...values,
          weekId: weeks[i].weekId
        }));
      }
    }
  };

  const handleDistributorIdChange = event => {
    event.persist();
    for (let i = 0; i < distributors.length; i++) {
      if (event.target.value === distributors[i].distributorName) {
        setValues(values => ({
          ...values,
          distributorId: distributors[i].distributorId
        }));
      }
    }
  };
  const handleCompanyNameChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      companyName: event.target.value
    }));
  };
  const handleJobNumberChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      jobNumber: event.target.value
    }));
  };
  const handlePaperSizeChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      paperSize: event.target.value
    }));
  };
  const handlePaperWeightChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      paperWeight: event.target.value
    }));
  };
  const handleShippingStatusChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      shippingStatus: event.target.value
    }));
  };
  const handlePaymentStatusChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      paymentStatus: event.target.value
    }));
  };
  const handleOrderStatusChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      orderStatus: event.target.value
    }));
  };
  const handleDistributorCopiesChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      distributorCopies: Number(event.target.value)
    }));
  };
  const handleOfficeCopiesChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      officeCopies: Number(event.target.value)
    }));
  };
  const handleStoreCopiesChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      storeCopies: Number(event.target.value)
    }));
  };
  const handleInstructionsChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      instructions: event.target.value
    }));
  };
  const handleShipDateChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      shipDate: event.target.value
    }));
  };
  const handleDueDateChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      dueDate: event.target.value
    }));
  };
  const handleInHomeDateChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      inHomeDate: event.target.value
    }));
  };
  const handleHeadlineChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      headline: event.target.value
    }));
  };
  const handleCompanyAddressChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      companyAddress: event.target.value
    }));
  };
  const handleCityChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      companyCity: event.target.value
    }));
  };
  const handleStateChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      companyState: event.target.value
    }));
  };
  const handleZipChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      companyZip: Number(event.target.value)
    }));
  };

  function addJob(newJob, event) {
    fetch('/api/new-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then(response => {
        response.json();
      })
      .catch(console.error);
  }

  function editJob(editedJob) {

  }

  function handleSubmit(event) {
    event.preventDefault();
    const params = {
      yearId: searchParams.yearId,
      weekId: searchParams.weekId
    };
    props.onSubmit(params);
    fetch(`/api/total-copies/${params.yearId}/${params.weekId}`)
      .then(res => res.json())
      .then(totalCopies => {
        setTotalCopies(totalCopies);
      });
    setWeekAndYear({
      year: searchParams.year,
      week: searchParams.week
    });
    setSearchParams({
      yearId: '',
      weekId: '',
      year: '',
      week: ''
    });
    document.getElementById('search-job-form').reset();
  }
  // FINISH 🏁
  // console.log('props.jobs[0].jobId:', props.jobs[0].jobId)
  return (
    <div>
      <div>
        <NavBar className="navbar" />
      </div>
      <div className="container">
        <div className="mt-3 d-flex flex-row flex-wrap">
          <div className="col-12 p-0 ">
            <div className=" d-flex main-title-wrapper justify-space-between">
              <h3 className="main-title m-1">Production Sheet</h3>
              {
                (typeof weekAndYear.year === 'number' &&
                  typeof weekAndYear.week === 'number' &&
                  props.jobs.length !== 0)
                  ? <div>
                    <h3 className="main-title m-1 "> | Week {weekAndYear.week} of {weekAndYear.year}</h3>
                  </div>
                  : <div />
              }
            </div>
            <div className="d-flex main-title-wrapper">
              {
                (typeof weekAndYear.year === 'number' &&
                  typeof weekAndYear.week === 'number' &&
                  props.jobs.length !== 0)
                  ? <div>
                    <h4 className="m-1 fw-light"> Weekly Totals: {totalCopies}</h4>
                  </div>
                  : <div />
              }
            </div>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap">
          <div className="col-12 p-0">
            <form id="search-job-form" className="d-flex" onSubmit={handleSubmit}>
              <select className="form-select fw-light m-1" aria-label="Default select example" onChange={handleYearChange}>
                <option>Select a year.</option>
                {
                  years.map(event => {
                    return (
                      <option id={event.yearId} key={event.yearId}>{event.year}</option>
                    );
                  })
                }
              </select>
              <select className=" form-select fw-light m-1" aria-label="Default select example" onChange={handleWeekChange}>
                <option>Select a week.</option>
                {
                  weeks.map(event => {
                    return (
                      <option id={event.weekId} key={event.weekId}>{event.week}</option>
                    );
                  })
                }
              </select>
              <div className="m-1">
                <button type="submit" className="btn btn-success ">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-3  d-flex flex-row justify-space-between">
          <NewJobModal
            onSubmit={addJob} job={job} values={values} setValues={setValues} years={years} weeks={weeks} distributors={distributors} handleYearIdChange={handleYearIdChange}
            handleWeekIdChange={handleWeekIdChange} handleDistributorIdChange={handleDistributorIdChange}
            handleJobNumberChange={handleJobNumberChange} handlePaperSizeChange={handlePaperSizeChange}
            handlePaperWeightChange={handlePaperWeightChange} handleShippingStatusChange={handleShippingStatusChange}
            handlePaymentStatusChange={handlePaymentStatusChange} handleOrderStatusChange={handleOrderStatusChange}
            handleDistributorCopiesChange={handleDistributorCopiesChange} handleStoreCopiesChange={handleStoreCopiesChange}
            handleOfficeCopiesChange={handleOfficeCopiesChange} handleInstructionsChange={handleInstructionsChange}
            handleShipDateChange={handleShipDateChange} handleDueDateChange={handleDueDateChange} handleInHomeDateChange={handleInHomeDateChange}
            handleHeadlineChange={handleHeadlineChange} handleCompanyNameChange={handleCompanyNameChange}
            handleCompanyAddressChange={handleCompanyAddressChange} handleCityChange={handleCityChange}
            handleStateChange={handleStateChange} handleZipChange={handleZipChange} />
        </div>
        {
          // ternary operator renders message when nothing has been searched yet 👇🏼
          props.jobs.length === 0
            ? <div className="col-12"><p className="text-center">Nothing to display yet.</p></div>
          // ternary operator renders message when nothing matches the search results 👇🏼
            : props.jobs[0] === undefined
              ? <div className="col-12"><p className="text-center">That search does not match any criteria.</p></div>
              // this is rendered when we successfully have search results 👇🏼
              : <ul id="job-list">
                {
                props.jobs.map(event => {
                  return (
                    <li className="mt-3 mb-5 col-12 job-container" key={event.jobId}>
                      <div className="d-flex flex-row">
                        <div className="col">
                          <div className="d-flex mt-1 mb-1">
                            <h4 id="order-number" className="job-status m-1">{event.jobNumber}</h4>
                            <h4 id="order-status" className="job-status m-1 text-info">{event.orderStatus}</h4>
                            <h4 id="payment-status " className="job-status m-1 text-success">{event.paymentStatus}</h4>
                            <h4 id="shipping-status " className="job-status m-1">{event.shippingStatus}</h4>
                          </div>
                        </div>
                        <div className="col">
                          <div className="d-flex justify-content-end">
                            <EditModal onSubmit={editJob} id={event.jobId} values={values} setValues={setValues} years={years} weeks={weeks}/>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="col-12 box-shadow">
                          <div id="job-details-header-1" className="d-flex job-details-header p-1">
                            <p className="col fw-bold ">Company Name</p>
                            <p className=" col fw-bold">Paper Size</p>
                            <p className=" col fw-bold">Paper Weight</p>
                            <p className="col fw-bold">Ship Date</p>
                            <p className=" col fw-bold">Due Date</p>
                            <p className=" col fw-bold">In Home Date</p>
                          </div>
                          <div id="job-details-1" className="d-flex job-details p-1">
                            <p id="company-name" className="m-1 col">{event.companyName}</p>
                            {/* will need to figure out how to allow "quotation marks" */}
                            <p id="paper-size" className="overflow-x m-1 col">{event.paperSize}</p>
                            <p id="paper-weight" className="m-1 col">{event.paperWeight}</p>
                            <p id="ship-date" className="text-danger m-1 col">{event.shipDate}</p>
                            <p id="due-date" className="text-danger m-1 col">{event.dueDate}</p>
                            <p id="in-home-date" className="text-danger m-1 col">{event.inHomeDate}</p>
                          </div>
                          <div id="job-details-header-2" className="d-flex job-details-header p-1">
                            <p className="m-1 col fw-bold ">Instructions</p>
                            <p className="m-1 col fw-bold">Headline</p>
                            <p className="m-1 col fw-bold">Store Copies</p>
                            <p className="m-1 col fw-bold">{event.distributorName} Copies</p>
                            <p className="m-1 col fw-bold">Office Copies</p>
                            <p className="m-1 col fw-bold">Total Copies</p>
                          </div>
                          <div id="job-details-2 " className="d-flex job-details p-1">
                            <p className="m-1 col ">{event.instructions}</p>
                            <p className="m-1 col">{event.headline}</p>
                            <p className="m-1 col">{event.storeCopies}</p>
                            <p className="m-1 col">{event.distributorCopies}</p>
                            <p className="m-1 col">{event.officeCopies}</p>
                            <p className="m-1 col">{event.totalCopies}</p>
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
                            <p className="m-1 col ">{event.distributorName}</p>
                            <p className="m-1 col">{event.distributorAddress}</p>
                            <p className="m-1 col">{event.distributorCity}</p>
                            <p className="m-1 col">{event.distributorState}</p>
                            <p className="m-1 col">{event.distributorZip}</p>
                            <p className="m-1 col fw-bold" />
                          </div>
                          <div id="job-details-3 " className="d-flex job-details p-1">
                            <p className="m-1 col ">{event.companyName}</p>
                            <p className="m-1 col">{event.companyAddress}</p>
                            <p className="m-1 col">{event.companyCity}</p>
                            <p className="m-1 col">{event.companyState}</p>
                            <p className="m-1 col">{event.companyZip}</p>
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
                        </div>
                      </div>
                    </li>
                  );
                })
            }
              </ul>
        }
      </div>
    </div>
  );
}
