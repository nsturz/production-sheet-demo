import React, { useState, useEffect } from 'react';

export default function NewJobModal() {
  const [values, setValues] = useState({
    year: '',
    week: '',
    companyName: '',
    jobNumber: '',
    paperDetails: '',
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
    headline: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [distributors, setDistributors] = useState([]);
  useEffect(() => {
    // FETCH method GETS all distributors in database so they can be selected in the form 👇🏼
    fetch('/api/distributors')
      .then(res => res.json())
      .then(distributors => {
        setDistributors(distributors);
      });
  }, []);

  const handleYearChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      year: event.target.value
    }));
  };
  const handleWeekChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      week: event.target.value
    }));
  };
  const handleDistributorChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      distributor: event.target.value
    }));
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
  const handlePaperDetailsChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      paperDetails: event.target.value
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
      distributorCopies: event.target.value
    }));
  };
  const handleOfficeCopiesChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      officeCopies: event.target.value
    }));
  };
  const handleStoreCopiesChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      storeCopies: event.target.value
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
  const handleAddressChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      address: event.target.value
    }));
  };
  const handleCityChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      city: event.target.value
    }));
  };
  const handleStateChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      state: event.target.value
    }));
  };
  const handleZipChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      zip: event.target.value
    }));
  };
  // console.log('values:', values)
  // console.log('distributors:', distributors)
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
                  <select name="" id="yearSelect" className='form-select fw-light' onChange={handleYearChange}>
                    <option>Select a year.</option>

                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="weekSelect" >Week</label>
                  <select name="" id="weekSelect" className='form-select fw-light' value={values.week} onChange={handleWeekChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Distributor</label>
                  <select name="" id="distributorSelect" className="form-select fw-light" value={values.distributor} onChange={handleDistributorChange} >
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
                  <label htmlFor="companyNameInput" >Company Name</label>
                  <input type="text" className="form-control" id="companyNameInput" value={values.companyName} onChange={handleCompanyNameChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="jobNumberInput" >Job Number</label>
                  <input type="text" className="form-control" id="jobNumberInput" value={values.jobNumber} onChange={handleJobNumberChange} />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperDetailsInput">Paper Details</label>
                  <input type="text" className="form-control" id="paperDetailsInput" value={values.paperDetails} onChange={handlePaperDetailsChange} />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Shipping Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light" value={values.shippingStatus} onChange={handleShippingStatusChange}>
                      <option>Shipped</option>
                      <option>Not Shipped</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="paymentStatusSelect">Payment Status</label>
                    <select name="" id="paymentStatusSelect" className="form-select fw-light" value={values.paymentStatus} onChange={handlePaymentStatusChange}>
                      <option>WOP</option>
                      <option>Paid</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Other Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light" value={values.otherStatus} onChange={handleOtherStatusChange}>
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
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" className="form-control" value={values.address} onChange={handleAddressChange}/>
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" className="form-control" value={values.city} onChange={handleCityChange}/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" className="form-control" value={values.state} onChange={handleStateChange} />
                  </div>
                  <div className="col-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" className="form-control" value={values.zip} onChange={handleZipChange} />
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
