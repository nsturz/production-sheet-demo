import React from 'react';

export default function CancelJobModal(props) {

  function handleSubmit(event) {
    event.preventDefault();
    const selectedJob = {
      jobId: props.selectedJobId
    };
    props.onSubmit(selectedJob);
    props.setOverlay('overlay d-none');
    props.setDeleteModalStyle('position-fixed delete-modal-wrapper col-10 col-lg-8 d-none');
    props.setSelectedJobId('');
  }

  return (
    <div>
      <div className={props.overlay} />
      <div className={props.deleteModalStyle}>
        <div className="rounded bg-white mb-2 mt-2 p-3">
          <form className='d-flex justify-content-center' id="cancel-job-form" onSubmit={handleSubmit}>
            <div>
              <h5 className='text-center mt-5'>Are you sure you want to cancel this job?</h5>
              <div className="row d-flex flex-nowrap justify-content-center">
                <button type='button' onClick={props.hideDeleteModal}className="btn btn-secondary mt-5 me-3 me-3 mb-5 col-4">Cancel</button>
                <button type='submit' className="btn btn-danger mt-5 ms-3 me-3 mb-5 col-4">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
