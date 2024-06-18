import React, { useState } from 'react'
import './Table.css'
const Table = (props) => {
    const{tableRecords}=props
    const{perPage,currentPage,totalRecords,transactions}=tableRecords
    const [btnStatus,setBtnStatus]=useState({next:true,previous:false})
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    console.log(transactions)

    const onClickNext=()=>{
      if(totalRecords>=(currentPage)*perPage){
        props.setPage(currentPage+1)
        setBtnStatus({next:true,previous:true})
        if(totalRecords<(currentPage+2)*perPage){
          setBtnStatus({next:false,previous:true})
        } 
      }
    }
    const onClickPrevious=()=>{
        props.setPage(currentPage-1)
        setBtnStatus({next:true,previous:true})
        if((currentPage-2)===0){
          setBtnStatus({next:true,previous:false})
        }
    }
    const Next=()=>{
      return <button className=' p-3 bg-blue-600 text-white rounded-xl mr-4 w-20' onClick={onClickNext}>Next</button>
    }
    const Previous=()=>{
      return <button className=' p-3 bg-blue-600 text-white rounded-xl ml-4 w-20' onClick={onClickPrevious}>Previous</button>
    }
    if(transactions){
      return (
    
       (transactions.length>0)? <table className='table-fixed border-collapse bg-gray-600'>
        <thead>
          <tr className='bg-gray-300 p-10 text-center rounded-xl'>
            <th className='p-2'>Id</th>
            <th className='p-2'>Title</th>
            <th className='p-2'>Price</th>
            <th className='p-2'>Description</th>
            <th className='p-2'>Category</th>
            <th className='p-2'>Date of Sold</th>
            <th className='p-2'>Sold</th>
            <th className='p-2'>Image</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map((Record,index)=>{
          const date=new Date(Record.dateOfSale)
          const month=monthNames[date.getMonth()]
          const year=date.getFullYear().toString()
          const dd=date.getDate().toString()
          return(
    
          <tr className=' even:bg-slate-700 odd:bg-slate-800 hover:text-black hover:bg-red-100 '>
            <td className='px-2'>{((currentPage-1)*perPage)+index+1}</td>
            <td className='px-2 text-justify  '>{Record.title}</td>
            <td className='px-2 text-justify '>{Record.price}</td>
            <td className='px-2 text-justify '>{Record.description}</td>
            <td className='px-2 text-justify '>{Record.category}</td>
            <td className='px-2 text-justify '>{`${dd}/${month}/${year}`}</td>
            <td className='px-2 text-justify '>{!Record.sold ?<div className='p-2 bg-green-300 rounded-lg text-sm w-full'>Available</div>:<div className='p-2 bg-red-300 rounded-lg text-sm w-full'>Sold</div>}</td>
            <td className='px-2 text-justify '><img src={Record.image} height={50} width={50}/></td>
          </tr>
          );
        })}
       
        </tbody>
        <tfoot >
        <td colSpan={"7"} >
        <div className='tfoot my-5 text-white'>
          <span>Page No: {currentPage}</span>
          <span>
          {btnStatus.next && <Next/> }
          {btnStatus.previous && <Previous/> }
          
          </span>
          <span>Per Page-{perPage}</span>
        </div>
    
        </td>
        </tfoot>
          
        </table>:<div>Sorry No records Found</div>
      )
    }
  
}

export default Table
