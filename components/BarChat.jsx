import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChat = () => {
  const [chartData, setChartData] = useState({
    datasets : []
  })
  const [chartOptions,setChartOptions] = useState({})

  useEffect(()=>{
    setChartData({
      labels : ['Mon','Tue','Wed','Thus','Fri','Sat','Sun'],
      datasets : [
        {
          label : 'Sales GBP',
          data : [1405950,23434,2373634,713235,1114676,1059953,763590],
          borderColor : 'rgb(53,162,235)',
          backgroundColor : 'rgb(53,162,235,0.4)'
        }
      ]
    })

    setChartOptions({
      plugins : {
        legend : {
          position : 'top'
        },
        title : {
          display : true,
          text : 'Daily Revenue'
        }
      },
      maintainAspectRatio : false,
      responsive : true
    })
  },[])

  return (
    <>
      <div className='w-full md:col-span-2 relative h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Bar data={chartData} options={chartOptions}/>
      </div>
    </>
  )
}

export default BarChat