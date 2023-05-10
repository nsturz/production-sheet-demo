import React, { useState }
  from 'react';
import ProductionSheet from './pages/production-sheet';

export default function App() {
  const [jobs, setJobs] = useState([]);
  function searchJobs(params) {
    fetch(`/api/job-list/${params.yearId}/${params.weekId}`)
      .then(res => res.json())
      .then(jobList => {
        setJobs(jobList);
      });
  }
  return (
    <ProductionSheet onSubmit={searchJobs} jobs={jobs} setJobs={setJobs}/>

  );
}
