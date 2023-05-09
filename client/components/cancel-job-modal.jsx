import React from 'react';

export default function CancelJobModal() {

  return (
    <div>
      <button
        type="button" className="edit-job-btn bg-transparent " data-bs-toggle="modal" data-bs-target="#cancelJobModal">
        <i className="fa-solid fa-trash m-1 edit-icon" />
      </button>
      <div className="modal fade" id="cancelJobModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Cancel Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <h1> hello :3</h1>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
