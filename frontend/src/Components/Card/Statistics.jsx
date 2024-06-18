import React from 'react'
import './Statistics.css'
import {months} from '../../utility/Month.js'
const Statistics = ({cardData}) => {
  return (
    <div className='stats_card'>
    <h1 className='stats__card--heading'>Statistics- {months[cardData.month-1]}</h1>
      <div className='stats_card--info'>
        <h1>Total Sale:</h1><h1>{cardData.totalSale}</h1>
        <h1>Total Sold Item:</h1><h1>{cardData.totalSold}</h1>
        <h1>Total Not Sold Item:</h1><h1>{cardData.totalNotSold}</h1>
      </div>
    </div>
  )
}

export default Statistics
