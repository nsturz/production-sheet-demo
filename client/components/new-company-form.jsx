import React from 'react';

export default function NewCompanyForm(props) {
  return (
    <form action="" id="new-company-form" className="d-flex justify-content-center ms-3">
      <div className="col-12">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Company Name" onChange={props.handleCompanyNameChange} required />
          <input type="text" className="form-control mb-3 mt-3" placeholder="Address" onChange={props.handleCompanyAddressChange} required />
          <div className="d-flex mb-3 mt-3 justify-content-between">
            <div className="col-3">
              <input type="text" id="companyCity" className="form-control" placeholder="City" onChange={props.handleCompanyCityChange} required />
            </div>
            <div className="col-3">
              <input type="text" id="companyState" className="form-control" placeholder="State" onChange={props.handleCompanyStateChange} required />
            </div>
            <div className="col-3">
              <input type="text" id="companyZip" className="form-control" placeholder="Zip" onChange={props.handleCompanyZipChange} required />
            </div>
          </div>
        </div>
        <div>
          <button onClick={props.hideCompanyForm} type="button" className="btn btn-secondary mt-2">Cancel</button>
          <button type="submit" className="btn login-btn ms-3 mt-2">Submit</button>
        </div>
      </div>
    </form>
  );
}
