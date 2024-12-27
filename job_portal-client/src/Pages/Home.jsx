import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [jobs, setJobs] = useState([]); // Full job data
  const [query, setQuery] = useState(""); // Search query
  const [selectedCategory, setSelectedCategory] = useState(null); // Location or salary filter
  const [selectedDate, setSelectedDate] = useState(null); // Date filter
  const [selectedExperience, setSelectedExperience] = useState(null); // Work experience filter
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch job data
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Handle search query input change
  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update the query state
  };

  // Unified handleChange for filtering
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "salary") {
      setSelectedCategory(value); // Update salary filter
    } else if (name === "experience") {
      setSelectedExperience(value); // Update work experience filter
    } else if (Date.parse(value)) {
      setSelectedDate(value); // Update selectedDate for date filtering
    } else if (name === "employmenttype") {
      setSelectedEmploymentType(value); // Update employment type
    } else {
      setSelectedCategory(value); // Update location filter
    }
  };

  // Main filtering logic
  const filteredData = () => {
    let filteredJobs = jobs;

    // Filter by query
    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by location
    if (selectedCategory && isNaN(selectedCategory)) {
      filteredJobs = filteredJobs.filter(({ jobLocation = "" }) =>
        jobLocation.toLowerCase() === selectedCategory.toLowerCase().trim()
      );
    }

    // Filter by salary range
    if (selectedCategory && !isNaN(selectedCategory)) {
      const selected = parseInt(selectedCategory, 10);
      filteredJobs = filteredJobs.filter(({ maxPrice = "0" }) => {
        const max = parseInt(maxPrice.trim(), 10); // Convert `maxPrice` to integer
        return max <= selected; // Include jobs where maxPrice is less than or equal to selected
      });
    }

    // Filter by date
    if (selectedDate) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobDate = new Date(job.postingDate || "1970-01-01");
        const selectedDateRange = new Date(selectedDate);
        return jobDate >= selectedDateRange;
      });
    }

    // Filter by work experience
    if (selectedExperience) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobExperience = job.experienceLevel || ""; // Default to empty string
        return jobExperience.toLowerCase().trim() === selectedExperience.toLowerCase().trim();
      });
    }

    // Filter by employment type
    if (selectedEmploymentType) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobType = job.employmentType || "";
        return jobType.toLowerCase().trim() === selectedEmploymentType.toLowerCase().trim();
      });
    }

    return filteredJobs;
  };

  const filteredJobs = filteredData();

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredJobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="text-blue">
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <Sidebar handleChange={handleChange} />
        <div className="col-span-2">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <Jobs result={currentJobs.map((data, index) => <Card key={index} data={data} />)} />
              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 space-x-4">
                {currentPage > 1 && (
                  <button
                    onClick={prevPage}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Previous
                  </button>
                )}
                {indexOfLastItem < filteredJobs.length && (
                  <button
                    onClick={nextPage}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
