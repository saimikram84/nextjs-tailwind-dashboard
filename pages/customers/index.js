import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { RxPencil1, RxTrash } from 'react-icons/rx'
import Spinner from '@/components/Spinner'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Customers() {
    const [isLoading, setiIsLoading] = useState(false);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleDelete = (item) => {
        setSelectedUserId(item)
        setIsModalOpen(true);
    };
    const confirmDelete = async (item) => {
        setiIsLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/users/6', {
                method: "DELETE"
            })
            if (response.ok) {
                toast.success('User deleted successfully!')
                setIsModalOpen(false)
            }
            else {
                toast.error('Failed to delete user!')
            }
        }
        catch (error) {

        }
        finally {
            setiIsLoading(false)
        }
    }

    const getUsers = async () => {
        setiIsLoading(true);
        try {
            const res = await fetch('https://fakestoreapi.com/users')
            const data = await res.json()
            setUsers(data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        } finally {
            setiIsLoading(false);
        }
    }
    const removeUser = (item) => {
    }

    useEffect(() => {
        getUsers();
    }, [])
    if (isLoading) {
        return <Spinner />
    }
    return (
        <Layout title='Customers'>
            <div className='flex justify-between p-4'>
                <h2>Customers</h2>
                <h2>Welcome Back, Smith</h2>
            </div>

            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div className="flex justify-end">
                        <Link href='/customers/add' className="bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-500">
                            Add User
                        </Link>
                    </div>
                    <table className="w-full text-center">
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='text-md px-6 py-3 '>Name</th>
                                <th className='text-md px-6 py-3'>Email</th>
                                <th className='text-md px-6 py-3'>Phone</th>
                                <th className='text-md px-6 py-3'>Username</th>
                                <th className='text-md px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((item, key) => (
                                    <tr className='border-b border-gray-200' key={key}>
                                        <td className='text-md px-6 py-3'>{item.name.firstname + ' ' + item.name.lastname}</td>
                                        <td className='text-md px-6 py-3'>{item.email}</td>
                                        <td className='text-md px-6 py-3'>{item.phone}</td>
                                        <td className='text-md px-6 py-3'>{item.username}</td>
                                        <td className='text-md px-6 py-3'>
                                            <div className='flex justify-center'>
                                                <Link href={`customers/edit/${item.id}`} className='p-2 mx-1 bg-gray-300 rounded-md'>
                                                    <RxPencil1 />
                                                </Link>
                                                <button type='button' className='p-2 mx-1 bg-gray-300 rounded-md' onClick={() => handleDelete(item.id)}>
                                                    <RxTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteConfirmationModal
                userId={selectedUserId}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </Layout> 
    )
}

export default Customers