import React from 'react';

export default function CancelJobModal(props) {

  function closeModal() {
    props.setSelectedJobId('');
  }

  function handleClick(event) {
    props.setSelectedJobId(Number(event.target.id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const selectedJob = {
      jobId: props.selectedJobId
    };
    props.onSubmit(selectedJob);
    closeModal();
  }
  return (
    <div>
      <div className={props.overlay} />
      <div className={props.deleteModalStyle}>
        <div className="rounded bg-white mb-2 mt-2 p-3">
          <form className='d-flex justify-content-center'>
            <div>
              <h5 className='text-center mt-5'>Are you sure you want to cancel this job?</h5>
              <div className="row d-flex flex-nowrap justify-content-center">
                <button onClick={props.hideDeleteModal}className="btn btn-secondary mt-5 me-3 me-3 mb-5 col-4">Cancel</button>
                <button className="btn btn-danger mt-5 ms-3 me-3 mb-5 col-4">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <form id="cancel-job-form" onSubmit={handleSubmit}>
        <button type="button" className="edit-job-btn bg-transparent m-0 p-1 " data-bs-toggle="modal" data-bs-target="#cancelJobModal">
          <i className="fa-solid fa-trash edit-icon" id={props.id} onClick={handleClick}
          />
        </button>
        <div className="modal fade" id="cancelJobModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button onClick={closeModal}
                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div>
                  <h5 className="m-4 text-center">Are you sure you want to cancel this job?</h5>
                </div>
                <div className="modal-footer">
                  <button onClick={closeModal}
                  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary bg-danger border-0">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
