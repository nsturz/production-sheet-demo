import React from 'react';

export default function EditModal(props) {
  // console.log('edit modal fired!')
  return (
    <div>
      <a type="button" className="edit-job-btn bg-transparent " data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i className="fa-solid fa-pen-to-square m-1 edit-icon" />
      </a>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Edit Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form id="edit-job-form" >
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
                  <input type="text" className="form-control" id="editJobNumber" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperSizeInput">Paper Size</label>
                  <input type="text" className="form-control" id="editPaperSize" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperWeightInput">Paper Weight</label>
                  <input type="text" className="form-control" id="editPaperWeight" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Shipping Status</label>
                    <select name="" id="editShippingStatus" className="form-select fw-light" required>
                      <option>Select one.</option>
                      <option>Shipped</option>
                      <option>Not Shipped</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="paymentStatusSelect">Payment Status</label>
                    <select name="" id="editPaymentStatus" className="form-select fw-light" required>
                      <option>Select one.</option>
                      <option>WOP</option>
                      <option>Paid</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Order Status</label>
                    <select name="" id="editOrderStatus" className="form-select fw-light" required>
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
                    <input type="text" id="editDistributorCopies" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Store Copies</label>
                    <input type="text" id="editStoreCopies" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">Office Copies</label>
                    <input type="text" id="editOfficeCopies" className="form-control" required />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="instructions">Instructions</label>
                  <textarea name="" id="editInstructions" className="form-control" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shipDate">Ship Date</label>
                    <input type="date" id="editShipDate" className="form-control fw-light" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Due Date</label>
                    <input type="date" id="editDueDate" className="form-control fw-light" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">In Home</label>
                    <input type="date" id="editInHomeDate" className="form-control fw-light" required />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="headline">Headline</label>
                  <input type="text" id="editHeadline" className="form-control" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Company Name</label>
                  <input type="text" className="form-control" id="editCompanyNameInput" required />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="address">Company Address</label>
                  <input type="text" id="editAddress" className="form-control" required />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="editCity" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="editState" className="form-control" required />
                  </div>
                  <div className="col-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="editZip" className="form-control" required />
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
