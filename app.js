var express = require('express')
var app = express()
const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("helloworld")
})

app.listen(PORT, ()=> console.log(`server listening on port ${PORT} open : http://localhost:${PORT}`))
