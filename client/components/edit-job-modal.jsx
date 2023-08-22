import React
  from 'react';

export default function EditModal(props) {
  function getJob(event) {
    const jobNumber = event.target.value;
    fetch(`/api/job-number/${jobNumber}`)
      .then(response => response.json())
      .then(job => {
        props.setValues({
          jobId: job.jobId,
          yearId: job.yearId,
          weekId: job.weekId,
          companyName: job.companyName,
          companyId: job.companyId,
          companyAddressId: job.companyAddressId,
          distributorName: job.distributorName,
          distributorId: job.distributorId,
          distributorAddressId: job.distributorAddressId,
          jobNumber: job.jobNumber,
          paperSize: job.paperSize,
          paperWeight: job.paperWeight,
          shippingStatus: job.shippingStatus,
          paymentStatus: job.paymentStatus,
          orderStatus: job.orderStatus,
          distributorCopies: job.distributorCopies,
          storeCopies: job.storeCopies,
          officeCopies: job.officeCopies,
          instructions: job.instructions,
          shipDate: job.shipDate,
          dueDate: job.dueDate,
          inHomeDate: job.inHomeDate,
          headline: job.headline
        });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const editedJob = {
      jobId: props.values.jobId,
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
    props.onSubmit(editedJob);
    props.setValues({
      yearId: '',
      weekId: '',
      year: '',
      week: '',
      companyId: '',
      companyAddressId: '',
      companyName: '',
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
    });
    props.setEditOverlay('overlay d-none');
    props.setEditModalStyle('position-absolute edit-modal-wrapper col-10 bg-white rounded d-none');
  }
  return (
    <div>
      <div className={props.editOverlay} />
      <div className={props.editModalStyle}>
        <div className="d-flex mt-3 mb-3 ms-5 me-5 justify-content-between">
          <h5>Edit Job</h5>
          <button onClick={props.hideEditModal} type="button" className="btn pb-3">
            <p>X</p>
          </button>
        </div>
        <div className="row d-flex justify-content-center">
          <form className="col-10 mb-2 mt-2" onSubmit={handleSubmit}>
            <div className="mb-2 mt-2">
              <label htmlFor="jobSelect" >Job</label>
              <select value={props.values.jobNumber} onChange={getJob} name="" id="jobSelect" className='form-select fw-light'>
                <option value="">Select a job to edit</option>
                {
                  props.jobs.map(event => {
                    return (
                      <option id={event.jobId} key={event.jobId}>{event.jobNumber}</option>
                    );
                  })
                }
              </select>
            </div>

            {/* 👇🏼 will keep year and week options out of the edit functionality for the time being 👇🏼 */}
            {/* <div className="mb-2 mt-2">
              <label htmlFor="yearSelect" >Year</label>
              <select value={year.year} onChange={props.handleYearIdChange} name="" id="editYear" className='form-select fw-light' required>
                {
                  props.yearsList.map((event, index) => {
                    return (
                      <option id={event.yearId} key={index}>{event.year}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="editWeek" >Week</label>
              <select value={week.week} onChange={props.handleWeekIdChange} name="" id="editWeek" className='form-select fw-light' required>
                {
                  props.weeksList.map(event => {
                    return (
                      <option id={event.weekId} key={event.weekId}>{event.week}</option>
                    );
                  })
                }
              </select>
            </div> */}

            <div className="mb-2 mt-2">
              <label htmlFor="editDistributor" >Distributor</label>
              <select value={props.values.distributorName} onChange={props.handleDistributorIdChange} name="" id="editDistributor" className="form-select fw-light" required>
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
              <label htmlFor="editCompany" >Company</label>
              <select value={props.values.companyName} onChange={props.handleCompanyIdChange} name="" id="editCompany" className="form-select fw-light" required>
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
              <input value={props.values.jobNumber} onChange={props.handleJobNumberChange} type="text" className="form-control" id="editJobNumber" required />
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="paperSizeInput">Paper Size</label>
              <input value={props.values.paperSize} onChange={props.handlePaperSizeChange} type="text" className="form-control" id="editPaperSize" required />
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="paperWeightInput">Paper Weight</label>
              <input value={props.values.paperWeight} onChange={props.handlePaperWeightChange} type="text" className="form-control" id="editPaperWeight" required />
            </div>
            <div className="d-flex mb-3 mt-3 justify-content-between">
              <div className="col-3">
                <label htmlFor="shippingStatusSelect">Shipping Status</label>
                <select value={props.values.shippingStatus} onChange={props.handleShippingStatusChange} name="" id="editShippingStatus" className="form-select fw-light" required>
                  <option>Select one.</option>
                  <option>Shipped</option>
                  <option>Not Shipped</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="paymentStatusSelect">Payment Status</label>
                <select value={props.values.paymentStatus} onChange={props.handlePaymentStatusChange} name="" id="editPaymentStatus" className="form-select fw-light" required>
                  <option>Select one.</option>
                  <option>WOP</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="shippingStatusSelect">Order Status</label>
                <select value={props.values.orderStatus} onChange={props.handleOrderStatusChange} name="" id="editOrderStatus" className="form-select fw-light" required>
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
                <input value={props.values.distributorCopies} onChange={props.handleDistributorCopiesChange} type="text" id="editDistributorCopies" className="form-control" required />
              </div>
              <div className="col-3">
                <label htmlFor="storeCopies">Store Copies</label>
                <input value={props.values.storeCopies} onChange={props.handleStoreCopiesChange} type="text" id="editStoreCopies" className="form-control" required />
              </div>
              <div className="col-3">
                <label htmlFor="officeCopies">Office Copies</label>
                <input value={props.values.officeCopies} onChange={props.handleOfficeCopiesChange} type="text" id="editOfficeCopies" className="form-control" required />
              </div>
            </div>
            <div className="mb-2 mt-2">
              <label htmlFor="instructions">Instructions</label>
              <textarea value={props.values.instructions} onChange={props.handleInstructionsChange} name="" id="editInstructions" className="form-control" required />
            </div>
            <div className="d-flex mb-3 mt-3 justify-content-between">
              <div className="col-3">
                <label htmlFor="shipDate">Ship Date</label>
                <input value={props.values.shipDate} onChange={props.handleShipDateChange} type="date" id="editShipDate" className="form-control fw-light" required />
              </div>
              <div className="col-3">
                <label htmlFor="storeCopies">Due Date</label>
                <input value={props.values.dueDate} onChange={props.handleDueDateChange} type="date" id="editDueDate" className="form-control fw-light" required />
              </div>
              <div className="col-3">
                <label htmlFor="officeCopies">In Home</label>
                <input value={props.values.inHomeDate} onChange={props.handleInHomeDateChange} type="date" id="editInHomeDate" className="form-control fw-light" required />
              </div>
            </div>
            <div className="mb-2 mt-2 mb-4">
              <label htmlFor="headline">Headline</label>
              <input value={props.values.headline} onChange={props.handleHeadlineChange} type="text" id="editHeadline" className="form-control" required />
            </div>
            <div className="modal-footer">
              <button onClick={props.hideEditModal} type="button" className="btn btn-secondary">Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
