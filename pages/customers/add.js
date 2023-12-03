import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';


function Add() {
    const [isLoading, setiIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const submitUser = async (formData) => {
        setiIsLoading(true)
        const data = {
            email: email,
            username: username,
            password: password,
            name: {
                firstname: firstName,
                lastname: lastName
            },
            address: {
                city: city,
                street: street,
                number: number,
                zipcode: zip,
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                }
            },
            phone: phone
        }
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            toast.success("User added successfully!");
            reset();
        }
        catch (e) {
            toast.error('Error'+e)
        }
        finally {
            setiIsLoading(false)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='flex justify-between p-4'>
                <h2>Add customer</h2>
                <h2>Welcome Back, Smith</h2>
            </div>

            <div className='p-4'>
                <div className='w-full p-4 bg-white rounded border'>
                    <div className="flex justify-end">
                        <Link href='/customers' className="bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-500">
                            Back
                        </Link>
                    </div>
                    <form className="max-w-lg mx-auto my-10" onSubmit={handleSubmit(submitUser)}>
                        <div className='grid'>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>First Name</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' name="firstName" {...register('firstName', { required: true })} />
                                {errors.firstName && <span className='text-red-600 text-sm'>This First Name is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                 name='lastName' {...register('lastName', { required: true })} />
                                {errors.lastName && <span className='text-red-600 text-sm'>Last name is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Email</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                 name='email' {...register('email', { required: true })} />
                                {errors.email && <span className='text-red-600 text-sm'>Email is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Username</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='username' {...register('username', { required: true })}/>
                                {errors.firstName && <span className='text-red-600 text-sm'>username is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='phone' {...register('phone',{required:true})}/>
                                {errors.phone && <span className='text-red-600 text-sm'>Phone is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Password</label>
                                <input type='password' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='password' {...register('password',{required:true})}/>
                                {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Street</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='street' {...register('street',{required:true})}/>
                                {errors.street && <span className='text-red-600 text-sm'>Street is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Number</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='number' {...register('number',{required:false})}/>
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>City</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='city' {...register('city',{required:false})}/>
                                {errors.city && <span className='text-red-600 text-sm'>City is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Zip code</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none' 
                                name='zip' {...register('zip',{required:false})} />
                                {errors.zip && <span className='text-red-600 text-sm'>Zip is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Address</label>
                                <textarea className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                name='address' {...register('address',{required:true})}/>
                                {errors.address && <span className='text-red-600 text-sm'>Address is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <button type='submit' className=' rounded-md bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 w-full'>Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Add