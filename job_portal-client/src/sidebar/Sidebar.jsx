import React from 'react';
import JobPosting from './JobPostingData';
import Salary from './Salary';
import Location from './Location';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';

const Sidebar = ({ handleChange }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md space-y-6">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      <JobPosting handleChange={handleChange} />
      <Salary handleChange={handleChange} />
      <Location handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
