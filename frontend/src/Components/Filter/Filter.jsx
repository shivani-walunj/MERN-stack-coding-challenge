import React,{useCallback} from 'react'
import {debounce} from 'lodash'
import './Filter.css'
const Filter = (props) => {
  const debouncedLog = useCallback(debounce((value) => {
   props.setSearch(value)
   console.log(value)
  }, 300), []);
  const adi=(e)=>{
    debouncedLog(e.target.value);
  }
  return (
    <div className='filter'>
    <div className='filter--Search'>
      <input type='text' className='filter--Search--input' placeholder='Search Transaction' onChange={(e)=>{adi(e)}}/>
    </div>
    <div className='filter--Month'>
    <select id="month-dropdown" defaultValue={''} onChange={(e)=>{props.setMonth(e.target.value)}}>
      <option value={''}>Month</option>
      <option value={"01"}>Jan</option>
      <option value={"02"}>Feb</option>
      <option value={"03"}>March</option>
      <option value={"04"}>April</option>
      <option value={"05"}>May</option>
      <option value={"06"}>June</option>
      <option value={"07"}>July</option>
      <option value={"08"}>August</option>
      <option value={"09"}>September</option>
      <option value={"10"}>October</option>
      <option value={"11"}>November</option>
      <option value={"12"}>December</option>
    </select>

    </div>
    </div>
  )
}

export default Filter
