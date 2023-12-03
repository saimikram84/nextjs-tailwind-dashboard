import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';



function Products() {
    const [isLoading, setiIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setiIsLoading(true)
        try {
            const api = await fetch('https://fakestoreapi.com/products')
            if (api.ok) {
                const response = await api.json();
                setProducts(response);
                setiIsLoading(false);
            }
            else {
                toast.error('Failed to get products');
            }
        }
        catch (error) {
            toast.error('Error : ' + error)
        }
        finally {
            setiIsLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Layout title='Products'>
            <div className='flex justify-between px-4 pt-4'>
                <h2>Products</h2>
                <h2>Welcome Back, Smith</h2>
            </div>
            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <table className="w-full">
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='text-md px-6 py-3 '>Category</th>
                                <th className='text-md px-6 py-3'>Product</th>
                                <th className='text-md px-6 py-3'>Price</th>
                                <th className='text-md px-6 py-3'>Rating</th>
                                <th className='text-md px-6 py-3'>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && products.map((item, key) => (
                                    <tr className='border-b border-gray-200' key={key}>
                                        <td className='text-md px-6 py-3'>{item.category}</td>
                                        <td className='text-md px-6 py-3'>{item.title}</td>
                                        <td className='text-md px-6 py-3'>{item.price}</td>
                                        <td className='text-md px-6 py-3'>{item.rating.rate}</td>
                                        <td className='text-md px-6 py-3'>
                                            <div className='flex justify-center'>
                                                <Image src={item.image} alt="Dynamic" width={80} height={80} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}



export default Products