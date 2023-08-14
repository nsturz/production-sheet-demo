import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import ProductionSheet from './pages/production-sheet';
import Auth from './pages/auth';
import SignUp from './pages/sign-up';
import Users from './pages/users';
import parseRoute from './lib/parse-route';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [users, setUsers] = useState([]);

  const [removeUserOverlay, setRemoveUserOverlay] = useState('overlay d-none');
  const [removeUserModalWrapper, setRemoveUserModalWrapper] = useState('position-fixed remove-user-modal-wrapper col-10 col-lg-8 d-none');
  const [selectedUser, setSelectedUser] = useState({
    userId: ''
  });

  const showRemoveUserModal = event => {
    event.preventDefault();
    setRemoveUserOverlay('overlay');
    setRemoveUserModalWrapper('position-fixed remove-user-modal-wrapper col-10 col-lg-8');
    setSelectedUser({
      userId: Number(event.target.id)
    });
  };

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
    const token = window.localStorage.getItem('production-sheet-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  useEffect(() => {
    fetch('/api/all-users')
      .then(res => res.json())
      .then(users => {
        setUsers(users);
      });
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('production-sheet-jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('production-sheet-jwt');
    setUser(null);
  }

  function searchJobs(params) {
    fetch(`/api/job-list/${params.yearId}/${params.weekId}`)
      .then(res => res.json())
      .then(jobList => {
        let jobArray = [...jobs];
        if (jobs.length !== 0) {
          jobArray = [];
          const newJobArray1 = jobArray.concat(jobList);
          setJobs(newJobArray1);
        } const newJobArray2 = jobArray.concat(jobList);
        setJobs(newJobArray2);

      });
  }

  function removeUser(selectedUser) {
    fetch(`/api/delete-user/${selectedUser.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedUser)
    })
      .then(res => res.json())
      .then(usersList => {
        const usersArray = [...users];
        usersArray.forEach((event, index) => {
          if (usersArray[index].userId === selectedUser.userId) {
            usersArray.splice(index, 1);
            setUsers(usersArray);
          }
        });
      });
  }

  function renderPage() {
    if (route.path === '') {
      return (
        <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}
          cancelledJobs={cancelledJobs} setCancelledJobs={setCancelledJobs} />
      );
    }
    if (route.path === 'sign-in') {
      return <Auth />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'users') {
      return <Users
                removeUser={removeUser}
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                onSubmit={removeUser}
                removeUserOverlay={removeUserOverlay}
                removeUserModalWrapper={removeUserModalWrapper}
                setRemoveUserModalWrapper={setRemoveUserModalWrapper}
                setRemoveUserOverlay={setRemoveUserOverlay}
      showRemoveUserModal={showRemoveUserModal}/>;
    }
  }

  if (isAuthorizing) return null;
  const contextValue = { user, route, handleSignIn, handleSignOut };
  return (
    <AppContext.Provider value={contextValue}>
      {renderPage()}
    </AppContext.Provider>
  );
}
