const express=require('express')
const cors= require('cors')
const app=express()
const transactions =require('./productTransaction.json')
app.use(cors())
app.get('/', (req, res) => {
  res.send("Hello World!")
})
app.get('/api/transactions', (req, res) => {
  try {
      const { month, search, page = 1, per_page = 10 } = req.query;

      // Parse pagination parameters
      const pageNum = parseInt(page, 10) || 1;
      const perPage = parseInt(per_page, 10) || 10;

      // Filter transactions by month if provided
      let filteredTransactions = transactions;

      if (month) {
          filteredTransactions = filteredTransactions.filter(transaction => {
              const transactionDate = new Date(transaction.dateOfSale);
              return month==transactionDate.getMonth()+1
          });
      }

      // Apply search filter if provided
      if (search) {
          const searchTerm = search.toLowerCase();
          filteredTransactions=filteredTransactions.filter(transaction => 
              transaction.title.toLowerCase().includes(searchTerm))||
              transaction.description.toLowerCase().includes(searchTerm)||
              transaction.price.toString.toLowerCase().includes(searchTerm)
      }

      // Apply pagination
      const totalRecords = filteredTransactions.length;
      const totalPages = Math.ceil(totalRecords / perPage);
      const start = (pageNum - 1) * perPage;
      const end = start + perPage;

      const paginatedTransactions = filteredTransactions.slice(start, end);

      // Respond with paginated transactions and metadata
      res.json({
          totalRecords,
          totalPages,
          currentPage: pageNum,
          perPage,
          transactions: paginatedTransactions
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/transactions/:month',(req,res)=>{
    const{month}=req.params;
    try {
       const monthlyData= transactions.filter(transaction => {
            const transactionDate = new Date(transaction.dateOfSale);
            return month==transactionDate.getMonth()+1})
        const response={totalSale:0,totalSold:0,totalNotSold:0}
        const ChartData=[]
        
        for(data of monthlyData){
            response.totalSale+=data.price
            if(data.sold){
                response.totalSold+=1
            }else{
                response.totalNotSold+=1
            }
        }
        let range=1
        let counter=0;
        while(range<900){
            const barItem={name:`${range}-${range+99}`,Price:0} 
            for(data of monthlyData){
                if(data.price>=range && data.price<=(range+99)){
                barItem.Price+=1;
                counter+=1;
                }
            }
            ChartData.push(barItem);
            range+=100
        }
        ChartData.push({name:'901 above',Price:monthlyData.length-counter})
        res.status(200).json({...response,ChartData:ChartData,month:month})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
})
app.listen(3000,()=>{
  console.log("App is running at Localhost:3000")
})
