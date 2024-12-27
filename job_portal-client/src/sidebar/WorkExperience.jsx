import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Work Experience</h4>

        <div className='flex flex-col gap-4'>
            <label className='sidebar-label-container'>
                <input
                    type='radio'
                    name='experience'
                    id='test'
                    value=""
                    onChange={handleChange}
                />
                <span className='checkmark'></span>Any experience

            </label>    
            <InputField handleChange={handleChange} value="Internship" title="Internship" name="experience"/>
            <InputField handleChange={handleChange} value="Remote" title="Remote" name="experience"/>
            


        </div>
      
    </div>
  )
}

export default WorkExperience
