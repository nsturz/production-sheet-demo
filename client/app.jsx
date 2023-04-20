import React
//, {useState}
  from 'react';
import ProductionSheet from './pages/production-sheet';

export default function App() {
  // const [jobs, setJobs] = useState([]);
  function searchJobs(params) {
    // console.log('fetch method fired!')
    // console.log('params in searchJobs:', params)
    fetch(`/api/job-list/${params.yearId}/${params.weekId}`)
      .then(res => res.json())
      // .then(jobList => {
      //   setJobs(jobList)
      //   //console.log('jobs in app.jsx:', jobs)
      // })
      .catch(console.error);
  }
  return (
    <ProductionSheet onSubmit={searchJobs} />
  );
}
