import React from 'react'
import InputField from '../components/InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
      
        <h4 className='text-lg font-medium mb-2'>Employment Type</h4>

        <div className='flex flex-col gap-4'>
            <label className='sidebar-label-container'>
                <input
                    type='radio'
                    name='employmenttype'
                    id='test'
                    value=""
                    onChange={handleChange}
                />
                <span className='checkmark'></span>All

            </label>    
            <InputField handleChange={handleChange} value="Full-time" title="Full-time" name="employmenttype"/>
            <InputField handleChange={handleChange} value="Part-time" title="Part-time" name="employmenttype"/>
            <InputField handleChange={handleChange} value="Temporary" title="Temporary" name="employmenttype"/>
            


        </div>
      
    
    </div>
  )
}

export default EmploymentType
