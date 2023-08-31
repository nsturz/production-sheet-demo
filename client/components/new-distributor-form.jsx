import React from 'react';

export default function NewDistributorForm(props) {
  return (
    <form onSubmit={props.addDistributor} action="" id="new-distributor-form" className="d-flex justify-content-center ms-3">
      <div className="col-12">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Distributor Name"
            onChange={props.handleDistributorNameChange}
            value={props.distributor.distributorName}
            required />
          <input type="text" className="form-control mb-3 mt-3" placeholder="Address"
            onChange={props.handleDistributorAddressChange}
            value={props.distributor.distributorAddress}
            required />
          <div className="d-flex mb-3 mt-3 justify-content-between">
            <div className="col-3">
              <input type="text" id="distributorCity" className="form-control" placeholder="City"
                onChange={props.handleDistributorCityChange}
                value={props.distributor.distributorCity}
                required />
            </div>
            <div className="col-3">
              <input type="text" id="distributorState" className="form-control" placeholder="State"
                onChange={props.handleDistributorStateChange}
                value={props.distributor.distributorState}
                required />
            </div>
            <div className="col-3">
              <input type="text" id="distributorZip" className="form-control" placeholder="Zip"
                onChange={props.handleDistributorZipChange}
                value={props.distributor.distributorZip}
                required />
            </div>
          </div>
        </div>
        <div>
          <button onClick={props.hideDistributorForm}type="button" className="btn btn-secondary mt-2">Cancel</button>
          <button type="submit" className="btn login-btn ms-3 mt-2">Submit</button>
        </div>
      </div>
    </form>
  );
}
