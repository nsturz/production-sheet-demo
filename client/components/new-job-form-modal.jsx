import React from 'react';

export default function NewJobModal() {
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
                  <select name="" id="yearSelect" className='form-select fw-light '>
                    <option value="">2022</option>
                    <option selected>2023</option>
                    <option value="">2024</option>
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="weekSelect" >Week</label>
                  <select name="" id="weekSelect" className='form-select fw-light '>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="companyNameInput" >Company Name</label>
                  <input type="text" className="form-control" id="companyNameInput" />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="jobNumberInput" >Job Number</label>
                  <input type="text" className="form-control" id="jobNumberInput" />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="paperDetailsInput">Paper Details</label>
                  <input type="text" className="form-control" id="paperDetailsInput" />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Shipping Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light">
                      <option value="1">Shipped</option>
                      <option value="2">Not Shipped</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="paymentStatusSelect">Payment Status</label>
                    <select name="" id="paymentStatusSelect" className="form-select fw-light">
                      <option value="1">WOP</option>
                      <option value="2">Paid</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="shippingStatusSelect">Other Status</label>
                    <select name="" id="shippingStatusSelect" className="form-select fw-light">
                      <option value="1">WOO</option>
                      <option value="2">WOA</option>
                      <option value="3">ZNS</option>
                      <option value="4">WOOA</option>
                      <option value="5">NR</option>
                      <option value="6">WOZ</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="distributorCopies">Distributor Copies</label>
                    <input type="text" id="distributorCopies" className="form-control"/>
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Store Copies</label>
                    <input type="text" id="storeCopies" className="form-control" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">Office Copies</label>
                    <input type="text" id="officeCopies" className="form-control" />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="instructions">Instructions</label>
                  <textarea name="" id="instructions" className="form-control" />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="shipDate">Ship Date</label>
                    <input type="date" id="shipDate" className="form-control" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="storeCopies">Due Date</label>
                    <input type="date" id="dueDate" className="form-control" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="officeCopies">In Home Date</label>
                    <input type="date" id="inHomeDate" className="form-control" />
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="headline">Headline</label>
                  <input type="text" id="headline" className="form-control" />
                </div>
                <div className="mb-2 mt-2">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" className="form-control" />
                </div>
                <div className="d-flex mb-3 mt-3 justify-content-between">
                  <div className="col-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" className="form-control" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" className="form-control" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" className="form-control" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
