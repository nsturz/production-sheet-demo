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
        let jobArray = [...jobs];
        if (jobs.length !== 0) {
          jobArray = [];
          const newJobArray1 = jobArray.concat(jobList);
          setJobs(newJobArray1);
        } const newJobArray2 = jobArray.concat(jobList);
        setJobs(newJobArray2);

      });
  }

  return (
    <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}
    cancelledJobs={cancelledJobs} setCancelledJobs={setCancelledJobs}/>

  );
}
