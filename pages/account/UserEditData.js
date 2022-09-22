import React, { useState } from 'react'
import Image from 'next/image'


import axios from 'axios';
import jwt_decode from "jwt-decode";

import { useRouter } from 'next/router';
import "nprogress/nprogress.css";
import NProgress  from 'nprogress';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styles from '../../styles/UserEditData.module.css'

import Navbar from '../../components/Navbar';


export default function UserData() {


  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First Name is required'),
    last_name: Yup.string()
        .required('Last name is required'),
    birth_date: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    phone: Yup.string()
        .required("Phone is Required")
        .matches(
          /^(\+)[0-9\\s.\\/-]{6,20}$/,
          "Phone number is not valid should Start with +"
        ),
    blood_type: Yup.string()
    .required('Blood Type is required'),
    gender: Yup.string()
        .required('Gender is required'),
    height: Yup.number()
    .typeError("height be a number")
    .positive()
    .nullable(true),
    weight: Yup.number()
    .typeError("weight be a number")
    .positive()
    .nullable(true),
      
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

const [allergiesValue, setAllergiesValue] = useState('');

const handleAllergiesChange = event => {
  // 👇️ access textarea value
  setAllergiesValue(event.target.value);
};
  

  const router = useRouter();

  
  const editUserUrl ="https://sehtak.herokuapp.com/profile/"
  
  async function editProfileInfo(userInput) {
    NProgress.start()
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
  };
     
    let accessData = null
    if (typeof window !== 'undefined') {
      accessData = JSON.parse(localStorage.getItem("AuthTokens")).access
      accessData = jwt_decode(accessData).info_id
      
    }
    let ses = editUserUrl + accessData+"/"

    try {
        const res = await axios.put(ses, userInput,config);
        
        if (res.status === 400) {
            console.log(`${res.status} bad request`)
            NProgress.done()
        }
        if (res.status === 201 || res.status === 200) {
          router.push('vistisInfo');
        }
    }
    catch (error) {
        console.log(` Error Signing in: ${error}`)
        NProgress.done() 
    }
  }

  async function handleEditSubmit(data){
    const my_user_id  = JSON.parse(localStorage.getItem("AuthTokens")).access.user_id
    let dataInfo ={
      user: my_user_id,
      first_name: data.first_name,
      last_name: data.lastName,
      phone: data.phone,
      birth_date: data.birth_date,
      gender: data.gender,
      height: data.height, 
      weight: data.weight,
      blood_type: data.blood_type,
      allergies: allergiesValue
    }
    console.log(dataInfo)
    await editProfileInfo(dataInfo)
  }


  
  return (
    <>
    <div className='w-full bg-sky-400'>
    <Navbar/>
      <div className='p-5 backGroundCoverImage'>
    
    <div className='w-3/4 mt-8 ml-20 sm:w-5/6'>
   <div class="mt-10 sm:mt-0">
  <div class="md:grid md:grid-cols-3 md:gap-6">
    
    <div class="mt-5 md:mt-0 md:col-span-2">
    <form onSubmit={handleSubmit(handleEditSubmit)}>
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                <input type="text" name="first_name" id="first_name" autocomplete="given-name"{...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}/>
                <div className="text-red-600">{errors.first_name?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" name="last_name" id="last_name" autocomplete="family-name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}/>
                <div className="text-red-600">{errors.last_name?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" placeholder='+962000000000' name="phone" id="phone" autocomplete="phone" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" }/>
                <div className="text-red-600">{errors.phone?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="blood_type" class="block text-sm font-medium text-gray-700">Blood Type</label>
                <select id="blood_type" name="blood_type" {...register('blood_type')} autocomplete="blood_type" className={`form-control ${errors.blood_type ? 'is-invalid' : ''}`+"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}>
                <option   value="" selected>Choose a Blood Type</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="text-red-600">{errors.blood_type?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" name="gender"{...register('gender')}  autocomplete="gender" className={`form-control ${errors.blood_type ? 'is-invalid' : ''}`+"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}>
                <option value="" selected>Select Gender</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
                <div className="text-red-600">{errors.gender?.message}</div>
              </div>

              <div class="col-span-6">
                <label for="allergies" class="block text-sm font-medium text-gray-700">Allergies</label>
                <textarea  type="text" name="allergies" value={allergiesValue} onChange={handleAllergiesChange} id="allergies" rows="2" cols="50" autocomplete="allergies" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                <label for="height" class="block text-sm font-medium text-gray-700">Height</label>
                <input placeholder='in cm' type="number" name="height" {...register('height')} id="height" className={`form-control ${errors.height ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}/>
                <div className="text-red-600">{errors.height?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label for="weight" class="block text-sm font-medium text-gray-700">Weight</label>
                <input placeholder='in kg' type="text" name="weight" {...register('weight')} id="weight" className={`form-control ${errors.height ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}/>
                <div className="text-red-600">{errors.weight?.message}</div>
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label for="birth_date" class="block text-sm font-medium text-gray-700">Birth Date</label>
                <input placeholder='YYYY-MM-DD' defaultValue="YYYY-MM-DD" type="text" name="birth_date"  {...register('birth_date')} id="birth_date" autocomplete="birth_date"  className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`+"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"}/>
                <div className="text-red-600">{errors.birth_date?.message}</div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
    </div>
</div>
      </div>
    </div>
    </>
    
  )
}
