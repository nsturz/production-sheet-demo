import React from 'react';

export default function RemoveUserModal(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(props.selectedUser);
    props.setRemoveUserOverlay('overlay d-none');
    props.setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
    props.setSelectedUser({
      userId: ''
    });
  }

  return (
    <div>
      <div className={props.removeUserOverlay} />
      <div className={props.removeUserModalWrapper}>
        <div className="rounded bg-white mb-2 mt-2 p-3">
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <div>
                <h5 className='text-center mt-5'>Remove User?</h5>
                <p className="text-center">This action cannot be undone</p>
              </div>
              <div className="row d-flex flex-nowrap justify-content-center">
                <button onClick={props.closeRemoveUserModal}
                  type='button' className="btn btn-secondary mt-5 ms-3 me-3 mb-5 col-5">Close</button>
                <button type="submit"
                  className="btn btn-danger mt-5 ms-3 me-3 mb-5 col-5 ">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
