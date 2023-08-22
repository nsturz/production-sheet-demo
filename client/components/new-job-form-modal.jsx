import React from 'react';

export default function NewJobModal(props) {

  function handleSubmit(event) {
    event.preventDefault();
    const newJob = {
      yearId: props.values.yearId,
      weekId: props.values.weekId,
      companyId: props.values.companyId,
      companyAddressId: props.values.companyAddressId,
      distributorId: props.values.distributorId,
      distributorAddressId: props.values.distributorAddressId,
      jobNumber: props.values.jobNumber,
      paperSize: props.values.paperSize,
      paperWeight: props.values.paperWeight,
      shippingStatus: props.values.shippingStatus,
      paymentStatus: props.values.paymentStatus,
      orderStatus: props.values.orderStatus,
      distributorCopies: props.values.distributorCopies,
      storeCopies: props.values.storeCopies,
      officeCopies: props.values.officeCopies,
      instructions: props.values.instructions,
      shipDate: props.values.shipDate,
      dueDate: props.values.dueDate,
      inHomeDate: props.values.inHomeDate,
      headline: props.values.headline
    };
    props.onSubmit(newJob);
    props.setValues(values => ({
      ...props.values,
      jobId: '',
      yearId: '',
      weekId: '',
      year: '',
      week: '',
      companyName: '',
      companyId: '',
      companyAddressId: '',
      distributorName: '',
      distributorId: '',
      distributorAddressId: '',
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
    }));
    props.setNewJobOverlay('overlay d-none');
    props.setNewJobModalStyle('position-absolute new-job-modal-wrapper col-10 bg-white rounded d-none');
  }

  return (
    <div>
      <div className={props.newJobOverlay} />
      <div className={props.newJobModalStyle}>
        <div className="d-flex mt-3 mb-3 ms-5 me-5 justify-content-between">
          <h5>New Job</h5>
          <button onClick={props.hideNewJobModal} type="button" className="btn pb-3">
            <p>X</p>
          </button>
        </div>
        <div className="row d-flex justify-content-center">
          <form className="col-10 mb-2 mt-2" onSubmit={handleSubmit}>
            <div className="mb-2 mt-2">
              <label htmlFor="yearSelect" >Year</label>
              <select name="" id="yearSelect" className='form-select fw-light' value={props.values.year} onChange={props.handleYearIdChange} required>
                <option>Select a year.</option>
                {
                  props.yearsList.map(event => {
                    return (
                      <option id={event.yearId} key={event.yearId}>{event.year}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="weekSelect" >Week</label>
              <select name="" id="weekSelect" className='form-select fw-light' value={props.values.week} onChange={props.handleWeekIdChange} required>
                <option>Select a week.</option>
                {
                  props.weeksList.map(event => {
                    return (
                      <option id={event.weekId} key={event.weekId}>{event.week}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="distributorSelect" >Distributor</label>
              <select name="" id="distributorSelect" value={props.values.distributorName} className="form-select fw-light" onChange={props.handleDistributorIdChange} required>
                <option>Select a distributor.</option>
                {
                  props.distributors.map(event => {
                    return (
                      <option id={event.distributorId} key={event.distributorId}>{event.distributorName}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="companySelect" >Company</label>
              <select name="" id="companySelect" value={props.values.companyName} className="form-select fw-light" onChange={props.handleCompanyIdChange}
                required>
                <option>Select a company.</option>
                {
                  props.companies.map(event => {
                    return (
                      <option id={event.companyId} key={event.companyId}>{event.companyName}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="jobNumberInput" >Job Number</label>
              <input type="text" className="form-control" id="jobNumberInput" value={props.values.jobNumber} onChange={props.handleJobNumberChange} required />
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="paperSizeInput">Paper Size</label>
              <input type="text" className="form-control" id="paperSizeInput" value={props.values.paperSize} onChange={props.handlePaperSizeChange} required />
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="paperWeightInput">Paper Weight</label>
              <input type="text" className="form-control" id="paperWeightInput" value={props.values.paperWeight} onChange={props.handlePaperWeightChange} required />
            </div>
            <div className="d-flex mb-3 mt-3 justify-content-between">
              <div className="col-3">
                <label htmlFor="shippingStatusSelect">Shipping Status</label>
                <select name="" id="shippingStatusSelect" className="form-select fw-light" value={props.values.shippingStatus} onChange={props.handleShippingStatusChange} required>
                  <option>Select one.</option>
                  <option>Shipped</option>
                  <option>Not Shipped</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="paymentStatusSelect">Payment Status</label>
                <select name="" id="paymentStatusSelect" className="form-select fw-light" value={props.values.paymentStatus} onChange={props.handlePaymentStatusChange} required>
                  <option>Select one.</option>
                  <option>WOP</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="shippingStatusSelect">Order Status</label>
                <select name="" id="shippingStatusSelect" className="form-select fw-light" value={props.values.orderStatus} onChange={props.handleOrderStatusChange} required>
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
                <input type="text" id="distributorCopies" className="form-control" value={props.values.distributorCopies} onChange={props.handleDistributorCopiesChange} required />
              </div>
              <div className="col-3">
                <label htmlFor="storeCopies">Store Copies</label>
                <input type="text" id="storeCopies" className="form-control" value={props.values.storeCopies} onChange={props.handleStoreCopiesChange} required />
              </div>
              <div className="col-3">
                <label htmlFor="officeCopies">Office Copies</label>
                <input type="text" id="officeCopies" className="form-control" value={props.values.officeCopies} onChange={props.handleOfficeCopiesChange} required />
              </div>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="instructions">Instructions</label>
              <textarea name="" id="instructions" className="form-control" value={props.values.instructions} onChange={props.handleInstructionsChange} required />
            </div>
            <div className="d-flex mb-3 mt-3 justify-content-between">
              <div className="col-3">
                <label htmlFor="shipDate">Ship Date</label>
                <input type="date" id="shipDate" className="form-control fw-light" value={props.values.shipDate} onChange={props.handleShipDateChange} required />
              </div>
              <div className="col-3">
                <label htmlFor="storeCopies">Due Date</label>
                <input type="date" id="dueDate" className="form-control fw-light" value={props.values.dueDate} onChange={props.handleDueDateChange} required />
              </div>
              <div className="col-3">
                <label htmlFor="officeCopies">In Home</label>
                <input type="date" id="inHomeDate" className="form-control fw-light" value={props.values.inHomeDate} onChange={props.handleInHomeDateChange} required />
              </div>
            </div>
            <div className="mb-2 mt-2 mb-4">
              <label htmlFor="headline">Headline</label>
              <input type="text" id="headline" className="form-control" value={props.values.headline} onChange={props.handleHeadlineChange} required />
            </div>
            <div className="modal-footer">
              <button onClick={props.hideNewJobModal} type="button" className="btn btn-secondary">Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
