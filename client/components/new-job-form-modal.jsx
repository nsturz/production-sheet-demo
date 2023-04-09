import React, { useState, useEffect } from 'react';

export default function NewJobModal() {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: ''
  });
  const [values, setValues] = useState({
    yearId: '',
    weekId: '',
    companyId: '',
    distributorId: '',
    jobNumber: '',
    paperSize: '',
    paperWeight: '',
    shippingStatus: '',
    paymentStatus: '',
    otherStatus: '',
    distributorCopies: '',
    storeCopies: '',
    officeCopies: '',
    instructions: '',
    shipDate: '',
    dueDate: '',
    inHomeDate: '',
    headline: ''
  });
  const [weeks, setWeeks] = useState([]);
  const [distributors, setDistributors] = useState([]);
  useEffect(() => {
    // FETCH method GETS all distributors in database so they can be selected in the form 👇🏼
    fetch('/api/distributors')
      .then(res => res.json())
      .then(distributors => {
        setDistributors(distributors);
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
    setCompanyInfo(companyInfo => ({
      ...companyInfo,
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
  const handleOtherStatusChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      otherStatus: event.target.value
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
    setCompanyInfo(companyInfo => ({
      ...companyInfo,
      companyAddress: event.target.value
    }));
  };
  const handleCityChange = event => {
    event.persist();
    setCompanyInfo(companyInfo => ({
      ...companyInfo,
      companyCity: event.target.value
    }));
  };
  const handleStateChange = event => {
    event.persist();
    setCompanyInfo(companyInfo => ({
      ...companyInfo,
      companyState: event.target.value
    }));
  };
  const handleZipChange = event => {
    event.persist();
    setCompanyInfo(companyInfo => ({
      ...companyInfo,
      companyZip: Number(event.target.value)
    }));
  };

  // const handleSubmit = event => {
  //   event.persist();
  //   const company = {
  //     companyAddress: companyAddress
  //   }
  // }
  // console.log('values:', values)
  // console.log('companyInfo:', companyInfo)
  // console.log('weeks', weeks)
  // console.log('distributors:', distributors)
  // console.log('years:', years)
  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        New Job +
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">New Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form action="">
                <div className="mb-2 mt-2">
                  <label htmlFor="yearSelect" >Year</label>
                  <select name="" id="yearSelect" className='form-select fw-light' onChange={handleYearIdChange}>
                    <option>Select a year.</option>
                    {
                      years.map(event => {
                        return (
                          <option id={event.yearId} key={event.yearId}>{event.year}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="weekSelect" >Week</label>
                  <select name="" id="weekSelect" className='form-select fw-light' value={values.week} onChange={handleWeekIdChange}>
                    <option value="1">Select a week.</option>
                    {
                      weeks.map(event => {
                        return (
                          <option id={event.weekId} key={event.weekId}>{event.week}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Distributor</label>
                  <select name="" id="distributorSelect" className="form-select fw-light" value={values.distributor} onChange={handleDistributorIdChange} >
                    <option>Select a distributor.</option>
                    {
                      distributors.map(event => {
                        return (
                          <option id={event.distributorId} key={event.distributorId}>{event.distributorName}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="jobNumberInput" >Job Number</label>
                  <input type="text" className="form-control" id="jobNumberInput" value={values.jobNumber} onChange={handleJobNumberChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperDetailsInput">Paper Size</label>
                  <input type="text" className="form-control" id="paperDetailsInput" value={values.paperSize} onChange={handlePaperSizeChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperDetailsInput">Paper Weight</label>
                  <input type="text" className="form-control" id="paperDetailsInput" value={values.paperweight} onChange={handlePaperWeightChange} />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Shipping Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light" value={values.shippingStatus} onChange={handleShippingStatusChange}>
                      <option>Select one.</option>
                      <option>Shipped</option>
                      <option>Not Shipped</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="paymentStatusSelect">Payment Status</label>
                    <select name="" id="paymentStatusSelect" className="form-select fw-light" value={values.paymentStatus} onChange={handlePaymentStatusChange}>
                      <option>Select one.</option>
                      <option>WOP</option>
                      <option>Paid</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Other Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light" value={values.otherStatus} onChange={handleOtherStatusChange}>
                      <option>Select one.</option>
                      <option>Approved</option>
                      <option>WOO</option>
                      <option>WOA</option>
                      <option>ZNS</option>
                      <option>WOOA</option>
                      <option>NR</option>
                      <option>WOZ</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="distributorCopies">Distributor Copies</label>
                    <input type="text" id="distributorCopies" className="form-control" value={values.distributorCopies} onChange={handleDistributorCopiesChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Store Copies</label>
                    <input type="text" id="storeCopies" className="form-control" value={values.storeCopies} onChange={handleStoreCopiesChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">Office Copies</label>
                    <input type="text" id="officeCopies" className="form-control" value={values.officeCopies} onChange={handleOfficeCopiesChange}/>
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="instructions">Instructions</label>
                  <textarea name="" id="instructions" className="form-control" value={values.instructions} onChange={handleInstructionsChange} />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shipDate">Ship Date</label>
                    <input type="date" id="shipDate" className="form-control fw-light" value={values.shipDate} onChange={handleShipDateChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Due Date</label>
                    <input type="date" id="dueDate" className="form-control fw-light" value={values.dueDate} onChange={handleDueDateChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">In Home</label>
                    <input type="date" id="inHomeDate" className="form-control fw-light" value={values.inHomeDate} onChange={handleInHomeDateChange} />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="headline">Headline</label>
                  <input type="text" id="headline" className="form-control" value={values.headline} onChange={handleHeadlineChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Company Name</label>
                  <input type="text" className="form-control" id="companyNameInput" value={values.companyName} onChange={handleCompanyNameChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="address">Company Address</label>
                  <input type="text" id="address" className="form-control" value={companyInfo.companyAddress} onChange={handleCompanyAddressChange}/>
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" className="form-control" value={companyInfo.companyCity} onChange={handleCityChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" className="form-control" value={companyInfo.companyState} onChange={handleStateChange} />
                  </div>
                  <div className="col-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" className="form-control" value={companyInfo.companyZip} onChange={handleZipChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
