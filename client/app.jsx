import React, { useState, useEffect } from 'react';
import ProductionSheet from './pages/production-sheet';
import LoginPage from './pages/login-page';
import parseRoute from './lib/parse-route';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', event => {
      setRoute(parseRoute(window.location.hash));
    });
  }, []);

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

  function renderPage() {
    if (route.path === 'login') {
      return (<LoginPage />);
    }
    return (
      <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}
        cancelledJobs={cancelledJobs} setCancelledJobs={setCancelledJobs} />
    );
  }

  return (
    renderPage()
    // <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}
    // cancelledJobs={cancelledJobs} setCancelledJobs={setCancelledJobs}/>

  );
}
