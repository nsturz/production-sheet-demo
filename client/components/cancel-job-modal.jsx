import React, { useState }
  from 'react';

export default function CancelJobModal(props) {
  const [jobId, setJobId] = useState('');

  function closeModal() {
    setJobId('');
  }

  function handleClick(event) {
    setJobId(Number(event.target.id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const selectedJob = {
      jobId
    };
    props.onSubmit(selectedJob);
    setJobId('');
    document.getElementById('cancel-job-form').reset();
  }

  // console.log('jobId:', jobId)
  // console.log('props.jobs:', props.jobs)
  return (
    <div>
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
                  <button type="submit" className="btn btn-primary bg-danger border-0" data-bs-dismiss="modal">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
