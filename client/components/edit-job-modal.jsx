import React from 'react';

export default function EditModal(props) {
  function getJob(event) {
    const jobId = Number(event.target.id);
    fetch(`/api/jobs/${jobId}`)
      .then(response => response.json())
      .then(job => {
        props.setValues({
          yearId: job.yearId,
          weekId: job.weekId,
          companyName: job.companyName,
          companyAddress: job.companyAddress,
          companyCity: job.companyCity,
          companyState: job.companyState,
          companyZip: job.companyZip,
          distributorId: job.distributorId,
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
    const editedJob = {
      yearId: props.values.yearId,
      weekId: props.values.weekId,
      companyName: props.values.companyName,
      companyAddress: props.values.companyAddress,
      companyCity: props.values.companyCity,
      companyState: props.values.companyState,
      companyZip: props.values.companyZip,
      distributorId: props.values.distributorId,
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
    // console.log('editedJob:', editedJob)
    props.onSubmit(editedJob);
    props.setValues({
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
    // console.log('props.values at end of handleSubmit:', props.values)
  }

  // console.log('props.values:', props.values)
  return (
    <div>
      <button
      onClick={getJob}
      type="button" className="edit-job-btn bg-transparent " data-bs-toggle="modal" data-bs-target="#editModal">
        <i className="fa-solid fa-pen-to-square m-1 edit-icon" id={props.id} />
      </button>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Edit Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form id="edit-job-form" onSubmit={handleSubmit} >
                <div className="mb-2 mt-2">
                  <label htmlFor="yearSelect" >Year</label>
                  <select name="" id="editYear" className='form-select fw-light' required>
                    <option>Year</option>
                    {/* {
                      props.years.map(event => {
                        return (
                          <option id={event.yearId} key={event.yearId}>{event.year}</option>
                        );
                      })
                    } */}
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="editWeek" >Week</label>
                  <select name="" id="editWeek" className='form-select fw-light' required>
                    <option value="1">Week</option>
                    {/* {
                      props.weeks.map(event => {
                        return (
                          <option id={event.weekId} key={event.weekId}>{event.week}</option>
                        );
                      })
                    } */}
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Distributor</label>
                  <select name="" id="editDistributor" className="form-select fw-light" required>
                    <option>Distributor</option>
                    {/* {
                      props.distributors.map(event => {
                        return (
                          <option id={event.distributorId} key={event.distributorId}>{event.distributorName}</option>
                        );
                      })
                    } */}
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="jobNumberInput" >Job Number</label>
                  <input value={props.values.jobNumber} type="text" className="form-control" id="editJobNumber" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperSizeInput">Paper Size</label>
                  <input value={props.values.paperSize} type="text" className="form-control" id="editPaperSize" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperWeightInput">Paper Weight</label>
                  <input value={props.values.paperWeight} type="text" className="form-control" id="editPaperWeight" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Shipping Status</label>
                    <select value={props.values.shippingStatus} name="" id="editShippingStatus" className="form-select fw-light" required>
                      <option>Select one.</option>
                      <option>Shipped</option>
                      <option>Not Shipped</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="paymentStatusSelect">Payment Status</label>
                    <select value={props.values.paymentStatus} name="" id="editPaymentStatus" className="form-select fw-light" required>
                      <option>Select one.</option>
                      <option>WOP</option>
                      <option>Paid</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Order Status</label>
                    <select value={props.values.orderStatus} name="" id="editOrderStatus" className="form-select fw-light" required>
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
                    <input value={props.values.distributorCopies} type="text" id="editDistributorCopies" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Store Copies</label>
                    <input value={props.values.storeCopies} type="text" id="editStoreCopies" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">Office Copies</label>
                    <input value={props.values.officeCopies} type="text" id="editOfficeCopies" className="form-control" required />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="instructions">Instructions</label>
                  <textarea value={props.values.instructions} name="" id="editInstructions" className="form-control" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shipDate">Ship Date</label>
                    <input value={props.values.shipDate} type="date" id="editShipDate" className="form-control fw-light" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Due Date</label>
                    <input value={props.values.dueDate} type="date" id="editDueDate" className="form-control fw-light" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">In Home</label>
                    <input value={props.values.inHomeDate} type="date" id="editInHomeDate" className="form-control fw-light" required />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="headline">Headline</label>
                  <input value={props.values.headline} type="text" id="editHeadline" className="form-control" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Company Name</label>
                  <input value={props.values.companyName} type="text" className="form-control" id="editCompanyNameInput" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="address">Company Address</label>
                  <input value={props.values.companyAddress} type="text" id="editAddress" className="form-control" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="city">City</label>
                    <input value={props.values.companyCity} type="text" id="editCity" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="state">State</label>
                    <input value={props.values.companyState} type="text" id="editState" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="zip">Zip</label>
                    <input value={props.values.companyZip} type="text" id="editZip" className="form-control" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
