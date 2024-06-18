import { useState,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Components/Navigation/Navigation'
import Filter from './Components/Filter/Filter'
import Table from './Components/Table/Table'
import Statistics from './Components/Card/Statistics'
import axios from 'axios'
import BarChartDev  from './Components/Barchart/Barchart'

function App() {
  const [tableRecords,setTableRecords]=useState([])
  const [month,setMonth]=useState('')
  const [Search,setSearch]=useState('')
  const [page,setPage]=useState(1)
  const [perPage,setPerPage]=useState(10)
  const [cardData,setCardData]=useState({totalSale:0,totalSold:0,totalNotSold:0})
  const [charData,setCharData]= useState([])

    useEffect(()=>{
      const fetchData=async()=>{
        try {
            if(month){
            const otherResult=await axios.get("http://localhost:3000/api/transactions/"+month)
            setCharData({charData:otherResult.data.ChartData,month:otherResult.data.month})
            setCardData({totalSale:otherResult.data.totalSale,totalSold:otherResult.data.totalSold,totalNotSold:otherResult.data.totalNotSold,month:otherResult.data.month})
          }else{
            const otherResult=await axios.get("http://localhost:3000/api/transactions/3")
            setCharData({charData:otherResult.data.ChartData,month:otherResult.data.month})
            setCardData({totalSale:otherResult.data.totalSale,totalSold:otherResult.data.totalSold,totalNotSold:otherResult.data.totalNotSold,month:otherResult.data.month})
          }
      
          const result=await axios.get("http://localhost:3000/api/transactions",
              {
                params:{
                  page:page,
                  per_page:perPage, 
                  month:month,
                  search:Search
                }
              }
            )
            setTableRecords(result.data)
        } catch (error) {
          
        }
      }
      fetchData();
    },[page,perPage,month,Search])
  return (
    <>
      <header>  
      <Navigation/>  
      </header>
      <main>
        <Filter setSearch={setSearch} setMonth={setMonth} setTableRecords={setTableRecords}/>
        <Table tableRecords={tableRecords} setPage={setPage} setPerPage={setPerPage}/>
        <Statistics cardData={cardData}/>
        <BarChartDev charData={charData}/>
      </main>
    </>
  )
}

export default App
