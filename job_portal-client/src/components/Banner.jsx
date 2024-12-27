import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find your new <span className="text-blue">job</span> today
      </h1>
      <p className="text-black/70 text-lg mb-8">
        Thousands of opportunities in computer, engineering, and technology
        sectors are waiting for you.
      </p>

      <form action="">
        <div className="flex justify-start items-center md:flex-row flex-col md:gap-0 gap-4">
          {/* Input Field for Job Position */}
          <div className="flex items-center rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What position are you looking for"
              className="flex-1 h-12 pl-8 text-gray-900 placeholder:text-gray-400 border-0 bg-transparent focus:outline-none sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              value={query || ""}
            />
            <FiSearch className="absolute ml-3 text-gray-400" />
          </div>

          {/* Input Field for Location */}
          <div className="flex items-center rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="flex-1 h-12 pl-8 text-gray-900 placeholder:text-gray-400 border-0 bg-transparent focus:outline-none sm:text-sm sm:leading-6"
              
            />
            <FiMapPin className="absolute ml-3 text-gray-400" />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="h-12 px-6 bg-blue hover:bg-blue-600 text-white rounded-md shadow-md transition-all duration-200 ease-in-out flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
