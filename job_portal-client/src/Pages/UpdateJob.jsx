import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import {useForm} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useState } from 'react';
import JobPostingData from '../sidebar/JobPostingData';

const UpdateJob = () => {
    const {id} = useParams();
    
    const {_id, jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, companyLogo, employmentType, description, postedBy, skills} = useLoaderData();
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const options = [
        {value: "Javascript", label: "Javascript"},
        {value: "C++", label: "C++"},
        {value: "HTML", label: "HTML"},
        {value: "CSS", label: "CSS"},
        {value: "Node.js", label: "Node.js"},
        {value: "MongoDB", label: "MongoDB"},
        {value: "Redux", label: "Redux"},
    ]

    const onSubmit = (data) => {
        console.log(data)
        data.skills = selectedOption;
        fetch(`http://localhost:3000/update-job/${id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }).then(res => res.json()).then((result) => {
            console.log(result);
            if(result.acknowdged === true){
                alert("Job Updated Successfully!!!")
            }
            reset()
        });


    }
  return (
    <div>
      <div className='max-w-screen-xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className='create-job-flex '>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Job Title</label>
                <input type = "text" defaultValue={jobTitle} {...register("jobTitle")} className='create-job-input'/>
                </div>
            
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Compay Name</label>
                <input type = "text" defaultValue={companyName} placeholder='Ex: Microsoft' {...register("companyName")} className='create-job-input'/>
            </div>
            </div>
            
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Minimum Salary</label>
                <input type = "text" placeholder="$20k" defaultValue={minPrice} {...register("minPrice")} className='create-job-input'/>
                </div>
            
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Maximum Salary</label>
                <input type = "text" placeholder='$120k' defaultValue={maxPrice} {...register("maxPrice")} className='create-job-input'/>
            </div>
            </div>


            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Salary Type</label>
                <select {...register("salaryType")} className='create-job-input' >
                    <option value={salaryType}>{salaryType}</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>

                </select>
                </div>
            
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Job Location</label>
                <input type = "text" placeholder='Ex: Seattle' defaultValue={jobLocation} {...register("jobLocation")} className='create-job-input'/>
            </div>
            </div>
        
            <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Job Posting Date</label>
                <input type = "date" placeholder='Ex: 2024-11-03' defaultValue={JobPostingData}{...register("postingDate")} className='create-job-input'/>
            </div>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Experience Level</label>
                <select {...register("experienceLevel")} className='create-job-input' >
                    <option value={experienceLevel}>{experienceLevel}</option>
                    <option value="NoExperience">Hourly</option>
                    <option value="Internship">Internship</option>
                    <option value="Work remotely">Work remotely</option>

                </select>
                </div>
            
            
            </div>

            <div>
                <label className='block mb-2 text-lg'>Required Skill Sets:</label>
                <CreatableSelect defaultValue= {skills} onChange={setSelectedOption} options={options} isMulti className='create-job-input py-4'/>
            </div>

            <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Company Logo</label>
                <input type = "url" defaultValue= {companyLogo} placeholder='Paste your company logo URL: https://wetransfer.com/img1' {...register("companyLogo")} className='create-job-input'/>
            </div>
                <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Experience Level</label>
                <select {...register("employmentType")} className='create-job-input' >
                    <option value={employmentType}>{employmentType}</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Temporary">Temporary</option>

                </select>
                </div>
            
            
            </div>

            <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Description</label>
                <textarea className='w-full pl-3 py-1.5 focus:outline-none' rows={6} defaultValue={description} placeholder='Job Description' {...register("description")}/>
            </div>

            <div>
                <label className='block mb-2 text-lg'>Job Posted By</label>
        <input type="email" defaultValue={postedBy} placeholder='Your email' {...register("postedBy")} className='create-job-input'/>
            </div>

            <input type='submit' className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
        </form>


      </div>
    </div>
    </div>
  )
}

export default UpdateJob
