import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {months} from '../../utility/Month.js'

const BarChartDev=({charData})=>{ 
  return(
    <>
    <h1 className='text-center my-10 text-3xl font-bold'>Bar Chart Stats- {months[charData.month-1]}</h1>
  <BarChart
  width={1000}
  height={300}
  data={charData.charData}
  margin={{
    top: 5,
    right: 0,
    left: 0,
    bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="4 4" />
  <XAxis dataKey="name" />
  <YAxis>
  </YAxis>
  <Tooltip shared={false} trigger="click" />
  <Legend />
  <Bar dataKey="Price" fill="#8884d8" />
</BarChart>
    </>
  );
}
export default BarChartDev
