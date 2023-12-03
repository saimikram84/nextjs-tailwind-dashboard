import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import TopCards from '@/components/TopCards'
import BarChat from '@/components/BarChat'
import RecentOrders from '@/components/RecentOrders'
import Spinner from '@/components/Spinner'


export default function Home() {
  const [isLoading, setiIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setiIsLoading(false);
    }, 500)

    return () => clearTimeout(timer);
  }, [])


  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <Layout title='Home'>
        <Header />
        <TopCards />
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          <BarChat />
          <RecentOrders />
        </div>
      </Layout>
    </>
  )
}
