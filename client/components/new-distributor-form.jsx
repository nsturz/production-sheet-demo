import React from 'react';

export default function NewDistributorForm() {
  return (
    <form action="" id="new-distributor-form" className="d-flex justify-content-center ms-3">
      <div className="col-12">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Distributor Name"required />
          <input type="text" className="form-control mb-3 mt-3" placeholder="Address" required />
          <div className="d-flex mb-3 mt-3 justify-content-between">
            <div className="col-3">
              <input type="text" id="distributorCity" className="form-control" placeholder="City" required />
            </div>
            <div className="col-3">
              <input type="text" id="distributorState" className="form-control" placeholder="State" required />
            </div>
            <div className="col-3">
              <input type="text" id="distributorZip" className="form-control" placeholder="Zip" required />
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-secondary mt-2">Cancel</button>
          <button type="submit" className="btn login-btn ms-3 mt-2">Submit</button>
        </div>
      </div>
    </form>
  );
}
