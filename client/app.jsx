import React, { useState }
  from 'react';
import ProductionSheet from './pages/production-sheet';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);
  function searchJobs(params) {
    fetch(`/api/job-list/${params.yearId}/${params.weekId}`)
      .then(res => res.json())
      .then(jobList => {
        const jobArray = [...jobs];
        const newJobArray = jobArray.concat(jobList);
        setJobs(newJobArray);
      });
  }

  return (
    <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}
    cancelledJobs={cancelledJobs} setCancelledJobs={setCancelledJobs}/>

  );
}
