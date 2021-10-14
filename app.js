const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config();
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const stream = require("stream"); // Added
const ggapi = require('./googledrive/googledriveapi')
var fileupload = require("express-fileupload");
const joischemavalidation = require('./middleware/joischemavalidate')
const sendPass = require('./apischema/sendPass')
const constants = require("./constants")
const connection = require('./database/connection');

app.use(fileupload());
// express setting
// no cache
app.use(function(req, res, next) {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	res.setHeader("Expires", "0"); // Proxies.
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});


// app.use(cookieParser());

// db conectivity
// cors
app.use(cors())
app.use(express.static('public'))
// app.set('views', path.join(__dirname, 'views/admin'));


// request payload middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// set app to read ejs
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
  res.render("sendPass")
})


app.post('/upload',
joischemavalidation.validatebody(sendPass.sendpass),
async (req, res) => {
  try{
  console.log("wowowowow")
  if(!req.files?.FILE1 || !req.files?.FILE2){
    throw "Please upload image"
  }
  const {FILE1, FILE2} = req.files

  //check file
  if((FILE1.size / (1024*1024)) > 5 ){
    return res.send("FILE1 IS TOO BIG")
  }
  if((FILE2.size / (1024*1024)) > 5 ){
    return res.send("FILE2 IS TOO BIG")
  }

  if(!FILE1.mimetype.match(/image/g)){
    return res.send("FILE1 TYPE NOT IMAGE")
  }
  if(!FILE2.mimetype.match(/image/g)){
    return res.send("FILE2 TYPE NOT IMAGE")
  }

  var bs1 = await Bufferconvertforupload(FILE1.data)
  var bs2 = await Bufferconvertforupload(FILE2.data)

  await ggapi.uploadFile(`${req.body.name}.jpg`,bs1)
  await ggapi.uploadFile(`${req.body.no}.jpg`,bs2)

  return await res.send("successfully")
  }
  catch(err){
    let response = {...constants.defaultserverresponse}

    response.body = {errormsg: err}
    response.message = constants.requestvalidationmessage.bad_request
    console.log(err)
    return res.status(400).send(response)
  }

})


function Bufferconvertforupload(data){
  var b64 = `data:image/jpg;base64,${data.toString('base64')}`
  const uploadImg = b64.split(/,(.+)/)[1];
  const buf = new Buffer.from(uploadImg, "base64"); // Added
  const bs = new stream.PassThrough(); // Added
  bs.end(buf); // Added
  return bs
}


app.listen(PORT, ()=> console.log(`server listening on port ${PORT} open : http://localhost:${PORT}`))
