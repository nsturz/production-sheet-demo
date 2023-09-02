import React, { useState, useContext } from 'react';
import SignUpForm from '../components/sign-up-form';
import NavBar from '../components/navbar';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import NewDistributorForm from '../components/new-distributor-form';
import NewCompanyForm from '../components/new-company-form';
import NewYear from '../components/new-year-form';

export default function CreateNew() {
  const { user } = useContext(AppContext);

  // Values in state for Form inputs: 👇🏼
  const [state, setState] = useState({
    username: '',
    password: '',
    isAdmin: false
  });

  const [distributor, setDistributor] = useState({
    distributorAddress: '',
    distributorCity: '',
    distributorState: '',
    distributorZip: '',
    distributorName: ''
  });

  const [company, setCompany] = useState({
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    companyName: ''
  });

  const [year, setYear] = useState({
    year: ''
  });

  const [referencePassword, setReferencePassword] = useState('');
  // Overlay states:  👇🏼
  const [overlay, setOverlay] = useState('overlay d-none');
  const [errorModalOverlay, setErrorModalOverlay] = useState('overlay d-none');
  const [distributorModalOverlay, setDistributorModalOverlay] = useState('overlay d-none');
  const [companyModalOverlay, setCompanyModalOverlay] = useState('overlay d-none');
  const [yearModalOverlay, setYearModalOverlay] = useState('overlay d-none');
  // Wrapper states: 👇🏼
  const [newUserWrapper, setNewUserWrapper] = useState('position-fixed new-user-modal-wrapper col-10 col-lg-8 d-none');
  const [errorModalWrapper, setErrorModalWrapper] = useState('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  const [distributorModalWrapper, setDistributorModalWrapper] = useState('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  const [companyModalWrapper, setCompanyModalWrapper] = useState('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  const [yearModalWrapper, setYearModalWrapper] = useState('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  // Form Container states: 👇🏼
  const [signUpContainer, setSignUpContainer] = useState('col-10 pb-5 ms-4 d-none');
  const [distributorFormContainer, setDistributorFormContainer] = useState('col-10 pb-5 ms-4 d-none');
  const [companyFormContainer, setCompanyFormContainer] = useState('col-10 pb-5 ms-4 d-none');
  const [yearFormContainer, setYearFormContainer] = useState('col-10 pb-5 ms-4 d-none');
  // Pointer states:  👇🏼
  const [newUserPointer, setNewUserPointer] = useState('fa-solid fa-angle-right fa-xs mt-3 ms-2');
  const [newDistributorPointer, setNewDistributorPointer] = useState('fa-solid fa-angle-right fa-xs mt-3 ms-2');
  const [newCompanyPointer, setNewCompanyPointer] = useState('fa-solid fa-angle-right fa-xs mt-3 ms-2');
  const [newYearPointer, setNewYearPointer] = useState('fa-solid fa-angle-right fa-xs mt-3 ms-2');

  // handleChange functions for form inputs 👇🏼
  const handleUsernameChange = event => {
    event.persist();
    setState({
      ...state,
      username: event.target.value
    });
  };

  const handlePasswordChange = event => {
    event.persist();
    setState({
      ...state,
      password: event.target.value
    });
  };

  const handleIsAdminChange = event => {
    event.persist();
    setState({
      ...state,
      isAdmin: true
    });
  };

  const handleIsNotAdminChange = event => {
    event.persist();
    setState({
      ...state,
      isAdmin: false
    });
  };

  const handleReferencePasswordChange = event => {
    event.persist();
    setReferencePassword(event.target.value);
  };

  const handleDistributorNameChange = event => {
    event.persist();
    setDistributor({
      ...distributor,
      distributorName: event.target.value
    });
  };

  const handleCompanyNameChange = event => {
    event.persist();
    setCompany({
      ...company,
      companyName: event.target.value
    });
  };

  const handleDistributorAddressChange = event => {
    event.persist();
    setDistributor({
      ...distributor,
      distributorAddress: event.target.value
    });
  };

  const handleCompanyAddressChange = event => {
    event.persist();
    setCompany({
      ...company,
      companyAddress: event.target.value
    });
  };

  const handleDistributorCityChange = event => {
    event.persist();
    setDistributor({
      ...distributor,
      distributorCity: event.target.value
    });
  };

  const handleCompanyCityChange = event => {
    event.persist();
    setCompany({
      ...company,
      companyCity: event.target.value
    });
  };

  const handleDistributorStateChange = event => {
    event.persist();
    setDistributor({
      ...distributor,
      distributorState: event.target.value
    });
  };

  const handleCompanyStateChange = event => {
    event.persist();
    setCompany({
      ...company,
      companyState: event.target.value
    });
  };

  const handleDistributorZipChange = event => {
    event.persist();
    setDistributor({
      ...distributor,
      distributorZip: Number(event.target.value)
    });
  };

  const handleCompanyZipChange = event => {
    event.persist();
    setCompany({
      ...company,
      companyZip: Number(event.target.value)
    });
  };

  const handleYearChange = event => {
    event.persist();
    setYear({
      year: Number(event.target.value)
    });
  };

  // functions to show and hide modals / forms 👇🏼
  function closeNewUserModal() {
    document.getElementById('sign-up-form').reset();
    setSignUpContainer('col-10 pb-5 ms-4 d-none');
    setNewUserPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setOverlay('overlay d-none');
    setNewUserWrapper('position-fixed new-user-modal-wrapper col-10 col-lg-8 d-none');
  }

  function closeNewDistributorModal() {
    document.getElementById('new-distributor-form').reset();
    setDistributorFormContainer('col-10 pb-5 ms-4 d-none');
    setNewDistributorPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setDistributorModalOverlay('overlay d-none');
    setDistributorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  }

  function closeNewCompanyModal() {
    document.getElementById('new-company-form').reset();
    setCompanyFormContainer('col-10 pb-5 ms-4 d-none');
    setNewCompanyPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setCompanyModalOverlay('overlay d-none');
    setCompanyModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  }

  function closeNewYearModal() {
    document.getElementById('new-year-form').reset();
    setYearFormContainer('col-10 pb-5 ms-4 d-none');
    setNewYearPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setYearModalOverlay('overlay d-none');
    setYearModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8 d-none');

  }

  function closeErrorModal() {
    document.getElementById('sign-up-form').reset();
    setErrorModalOverlay('overlay d-none');
    setErrorModalWrapper('osition-fixed error-modal-wrapper col-10 col-lg-8 d-none');
  }

  // functions to make FETCH requests 👇🏼
  function addUser(event) {
    event.preventDefault();
    if (state.password !== referencePassword && state.password.length !== 0 &&
      referencePassword.length !== 0) {
      return window.alert('passwords do not match');
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setErrorModalOverlay('overlay');
          setErrorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        } else {
          setOverlay('overlay');
          setNewUserWrapper('position-fixed new-user-modal-wrapper col-10 col-lg-8');
        }
      });
    setState({
      username: '',
      password: '',
      isAdmin: false
    });
    setReferencePassword('');
  }

  function addDistributor(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(distributor)
    };
    fetch('/api/new-distributor', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setErrorModalOverlay('overlay');
          setErrorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        } else {
          setDistributorModalOverlay('overlay');
          setDistributorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        }
      });
    setDistributor({
      distributorName: '',
      distributorAddress: '',
      distributorCity: '',
      distributorState: '',
      distributorZip: ''
    });
  }

  function addCompany(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(company)
    };
    fetch('/api/new-company', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setErrorModalOverlay('overlay');
          setErrorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        } else {
          setCompanyModalOverlay('overlay');
          setCompanyModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        }
        setCompany({
          companyName: '',
          companyAddress: '',
          companyCity: '',
          companyState: '',
          companyZip: ''
        });
      });
  }

  function addYear(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(year)
    };
    fetch('/api/new-year', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setErrorModalOverlay('overlay');
          setErrorModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        } else {
          setYearModalOverlay('overlay');
          setYearModalWrapper('position-fixed error-modal-wrapper col-10 col-lg-8');
        }
        setYear({
          year: ''
        });
      });
  }

  // Functions to show / hide forms 👇🏼
  function showNewUserForm() {
    setSignUpContainer('col-10 pb-5 ms-4');
    setNewUserPointer('fa-solid fa-angle-down fa-xs mt-3 ms-2');
  }

  function hideNewUserForm() {
    setSignUpContainer('col-10 pb-5 ms-4 d-none');
    setNewUserPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setState({
      username: '',
      password: '',
      isAdmin: false
    });
    setReferencePassword('');
    document.getElementById('sign-up-form').reset();
  }

  function showDistributorForm() {
    setDistributorFormContainer('col-10 pb-5 ms-4');
    setNewDistributorPointer('fa-solid fa-angle-down fa-xs mt-3 ms-2');
  }

  function hideDistributorForm() {
    setDistributorFormContainer('col-10 pb-5 ms-4 d-none');
    setNewDistributorPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setDistributor({
      distributorName: '',
      distributorAddress: '',
      distributorCity: '',
      distributorState: '',
      distributorZip: ''
    });
  }

  function showYearForm() {
    setYearFormContainer('col-10 pb-5 ms-4');
    setNewYearPointer('fa-solid fa-angle-down fa-xs mt-3 ms-2');
  }
  function hideYearForm() {
    setYearFormContainer('col-10 pb-5 ms-4 d-none');
    setNewYearPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setYear({
      year: ''
    });
  }

  function showCompanyForm() {
    setCompanyFormContainer('col-10 pb-5 ms-4');
    setNewCompanyPointer('fa-solid fa-angle-down fa-xs mt-3 ms-2');
  }

  function hideCompanyForm() {
    setCompanyFormContainer('col-10 pb-5 ms-4 d-none');
    setNewCompanyPointer('fa-solid fa-angle-right fa-xs mt-3 ms-2');
    setCompany({
      companyAddress: '',
      companyCity: '',
      companyState: '',
      companyZip: '',
      companyName: ''
    });
  }

  if (user === null) return <Redirect to="" />;
  if (user.isAdmin !== true) return <Redirect to="" />;
  return (
    <div>
      <NavBar />
      <div className="container">
        <h4 className="mt-4">Create New</h4>
        <div className="new-user-wrapper d-flex justify-content-center pt-5">
          <div className="col-12 box-shadow rounded">
            <div className="d-flex">
              <button className="create-new-btn"
               onClick={
                newUserPointer === 'fa-solid fa-angle-right fa-xs mt-3 ms-2'
                  ? showNewUserForm
                  : hideNewUserForm}>
                <i className={newUserPointer} />
              </button>
              <p className="m-3">New User</p>
            </div>
            <div>
              <div className={signUpContainer}>
                <SignUpForm
                  addUser={addUser}
                  state={state}
                  setState={setState}
                  referencePassword={referencePassword}
                  setReferencePassword={setReferencePassword}
                  handleUsernameChange={handleUsernameChange}
                  handlePasswordChange={handlePasswordChange}
                  handleIsAdminChange={handleIsAdminChange}
                  handleIsNotAdminChange={handleIsNotAdminChange}
                  handleReferencePasswordChange={handleReferencePasswordChange}
                  hideNewUserForm={hideNewUserForm} />
              </div>
            </div>
          </div>
        </div>
        <div className="new-distributor-wrapper d-flex justify-content-center pt-5">
          <div className="col-12 box-shadow rounded">
            <div className="d-flex">
              <button className="create-new-btn"
                onClick={
                  newDistributorPointer === 'fa-solid fa-angle-right fa-xs mt-3 ms-2'
                    ? showDistributorForm
                    : hideDistributorForm
                }>
                <i className={newDistributorPointer} />
              </button>
              <p className="m-3">New Distributor</p>
            </div>
            <div className={distributorFormContainer}>
              <NewDistributorForm
                addDistributor={addDistributor}
                distributor={distributor}
                handleDistributorNameChange={handleDistributorNameChange}
                handleDistributorAddressChange={handleDistributorAddressChange}
                handleDistributorCityChange={handleDistributorCityChange}
                handleDistributorStateChange={handleDistributorStateChange}
                handleDistributorZipChange={handleDistributorZipChange}
                hideDistributorForm={hideDistributorForm} />
            </div>
          </div>
        </div>
        <div className="new-company-wrapper d-flex justify-content-center pt-5">
          <div className="col-12 box-shadow rounded">
            <div className="d-flex">
              <button
                onClick={
                  newCompanyPointer === 'fa-solid fa-angle-right fa-xs mt-3 ms-2'
                    ? showCompanyForm
                    : hideCompanyForm}
                 className="create-new-btn">
                <i className={newCompanyPointer} />
              </button>
              <p className="m-3">New Company</p>
            </div>
            <div className={companyFormContainer}>
              <NewCompanyForm
                addCompany={addCompany}
                company={company}
                handleCompanyNameChange={handleCompanyNameChange}
                handleCompanyAddressChange={handleCompanyAddressChange}
                handleCompanyCityChange={handleCompanyCityChange}
                handleCompanyStateChange={handleCompanyStateChange}
                handleCompanyZipChange={handleCompanyZipChange}
                hideCompanyForm={hideCompanyForm}/>
            </div>
          </div>
        </div>
        <div className="new-year-wrapper d-flex justify-content-center pt-5">
          <div className="col-12 box-shadow rounded">
            <div className="d-flex">
              <button
                onClick={
                  newYearPointer === 'fa-solid fa-angle-right fa-xs mt-3 ms-2'
                    ? showYearForm
                    : hideYearForm
                }className="create-new-btn">
                <i className={newYearPointer} />
              </button>
              <p className="m-3">New Year</p>
            </div>
            <div className={yearFormContainer}>
              <NewYear
                addYear={addYear}
                handleYearChange={handleYearChange}
                hideYearForm={hideYearForm} />
            </div>
          </div>
        </div>
        <div className={overlay} />
        <div className={newUserWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center' id="cancel-job-form">
              <div>
                <div className="d-flex">
                  <h5 className='text-center mt-5'>New User Created</h5>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-check text-success" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeNewUserModal} type='button' className="btn done-btn mt-5 ms-3 me-3 mb-5 col-5">Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={distributorModalOverlay} />
        <div className={distributorModalWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center' id="cancel-job-form">
              <div>
                <div className="d-flex">
                  <h5 className='text-center mt-5'>New Distributor Created</h5>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-check text-success" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeNewDistributorModal}type='button' className="btn done-btn mt-5 ms-3 me-3 mb-5 col-5">Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={companyModalOverlay} />
        <div className={companyModalWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center' id="cancel-job-form">
              <div>
                <div className="d-flex">
                  <h5 className='text-center mt-5'>New Company Created</h5>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-check text-success" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeNewCompanyModal} type='button' className="btn done-btn mt-5 ms-3 me-3 mb-5 col-5">Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={yearModalOverlay} />
        <div className={yearModalWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center' id="cancel-job-form">
              <div>
                <div className="d-flex">
                  <h5 className='text-center mt-5'>New Year Created</h5>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-check text-success" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeNewYearModal} type='button' className="btn done-btn mt-5 ms-3 me-3 mb-5 col-5">Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={errorModalOverlay} />
        <div className={errorModalWrapper}>
          <div className="rounded bg-white mb-2 mt-2 p-3">
            <div className='d-flex justify-content-center'>
              <div>
                <div>
                  <p className="text-center">An unexpected error occured. Please try again.</p>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <i className="fa-solid fa-x text-danger" />
                </div>
                <div className="row d-flex flex-nowrap justify-content-center">
                  <button onClick={closeErrorModal}
                    type='button' className="btn btn-secondary mt-5 ms-3 me-3 mb-5 col-5">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
