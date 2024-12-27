import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

// set current page

const[currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 4;


  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/myJobs/vishal@gmail.com")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);
  
  // Removed `isLoading` dependency

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem)

  // next button and previous button

  const nextPage = () => {
    if(indexOfLastItem < jobs.length){
        setCurrentPage(currentPage + 1)
    }
  }
  
  const prevPage = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
  }

  const handleSearch = () => {
    const filteredJobs = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Job deleted successfully!");
          // Refresh the jobs list after deletion
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        } else {
          alert("Job not found or already deleted.");
        }
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        alert("Failed to delete the job. Please try again later.");
      });
  };
  

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-center text-2xl font-bold mb-6">ALL My Jobs</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search jobs"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Post a New Job
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Salary</th>
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && jobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{job.jobTitle}</td>
                  <td className="px-4 py-2">{job.companyName}</td>
                  <td className="px-4 py-2">
                    ${job.minPrice} - ${job.maxPrice}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/edit-job/${job._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  {isLoading ? "Loading..." : "No jobs found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex justify-center text-black space-x-8 ">
            {
                currentPage > 1 && (
                    <button className="hover: underline" onClick={prevPage}>Previous</button>
                )
            }
            {
                indexOfLastItem < jobs.length && (
                    <button className="hover: underline" onClick={nextPage}>Next</button>
                )
            }

        </div>



      </div>
    </div>
  );
};

export default MyJobs;
