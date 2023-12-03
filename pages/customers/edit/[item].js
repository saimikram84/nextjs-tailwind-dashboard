import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '@/components/Spinner';
import Link from 'next/link'

function EditCustomer() {
    const [isLoading, setiIsLoading] = useState(false);
    const router = useRouter();
    const { item } = router.query;
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const getUser = async () => {
        const res = await fetch('https://fakestoreapi.com/users/' + item)
        const userData = await res.json();
        setValue('firstName', userData.name.firstname)
        setValue('lastName', userData.name.lastname)
        setValue('email', userData.email)
        setValue('username', userData.username)
        setValue('phone', userData.phone)
        setValue('street', userData.address.street)
        setValue('number', userData.address.number)
        setValue('city', userData.address.city)
        setValue('zip', userData.address.zipcode)
    }

    const updateUser = async (formData) => {
        setiIsLoading(true)
        try {
            const response = await fetch('https://fakestoreapi.com/users/7', {
                method: "PUT",
                body: JSON.stringify(
                    {
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                        name: {
                            firstname: formData.firstName,
                            lastname: formData.lastName
                        },
                        address: {
                            city: formData.city,
                            street: formData.street,
                            number: formData.number,
                            zipcode: formData.zip,
                            geolocation: {
                                lat: '-37.3159',
                                long: '81.1496'
                            }
                        },
                        phone: formData.phone
                    }
                )
            })
            if (response.ok) {
                const res = await response.json();
                toast.success("User updated successfully!");
                reset();
                router.push('/customers');
            }
            else {
                toast.error("Error udpating user!");
            }
        }
        catch (error) {
            toast.error('Error' + error)
        }
        finally {
            setiIsLoading(false)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='flex justify-between p-4'>
                <h2>Edit customer</h2>
                <h2>Welcome Back, Smith</h2>
            </div>
            <div className='p-4'>
                <div className='w-full p-4 bg-white rounded border'>
                    <div className="flex justify-end">
                        <Link href='/customers' className="bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-500">
                            Back
                        </Link>
                    </div>
                    <form className="max-w-lg mx-auto my-10" onSubmit={handleSubmit(updateUser)}>
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
                                    name='username' {...register('username', { required: true })} />
                                {errors.firstName && <span className='text-red-600 text-sm'>username is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='phone' {...register('phone', { required: true })} />
                                {errors.phone && <span className='text-red-600 text-sm'>Phone is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Password</label>
                                <input type='password' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='password' {...register('password', { required: false })} />
                                {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Number</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='number' {...register('number', { required: false })} />
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>City</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='city' {...register('city', { required: false })} />
                                {errors.city && <span className='text-red-600 text-sm'>City is required</span>}
                            </div>
                            <div className='m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Zip code</label>
                                <input type='text' className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='zip' {...register('zip', { required: false })} />
                                {errors.zip && <span className='text-red-600 text-sm'>Zip is required</span>}
                            </div>
                            <div className='col-span-2 m-1'>
                                <label className='block text-sm font-medium text-gray-700'>Address</label>
                                <textarea className='block border border-gray-300 w-full rounded-md shadow-sm p-2 focus:outline-none'
                                    name='street' {...register('street', { required: true })} />
                                {errors.street && <span className='text-red-600 text-sm'>Address is required</span>}
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

export default EditCustomer