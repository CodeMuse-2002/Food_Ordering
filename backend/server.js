// write your code here
const express = require("express");
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const itemRouter = require('./routes/item')
app.use('/item',itemRouter)
app.listen(4000, () => {
  console.log(`server started on port 4000`);
});
