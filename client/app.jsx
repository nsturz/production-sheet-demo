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

  // function removeUser(selectedUser){
  //   fetch(`/api/delete-user/${selectedUser}`)
  //   .then(res => res.json())
  //   .then(usersList => {
  //     let usersArray = [...users];
  //     const newUsersArray = usersArray.concat(usersList);
  //     setUsers(newUsersArray);
  //   })
  // };

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
      return <Users users={users} />;
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
