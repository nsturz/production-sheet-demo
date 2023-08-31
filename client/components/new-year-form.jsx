import React from 'react';

export default function NewYear(props) {
  return (
    <form onSubmit={props.addYear} action="" id="new-year-form" className="d-flex justify-content-center ms-3">
      <div className="col-12">
        <div>
          <input type="text" className="form-control mb-3 mt-3" placeholder="Year" onChange={props.handleYearChange} required />
        </div>
        <div>
          <button onClick={props.hideYearForm} type="button" className="btn btn-secondary mt-2">Cancel</button>
          <button type="submit" className="btn login-btn ms-3 mt-2">Submit</button>
        </div>
      </div>
    </form>
  );
}
