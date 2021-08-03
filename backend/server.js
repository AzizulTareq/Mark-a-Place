const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

const app = express()

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log(err)
})

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/frontend/build'));
}


  const PORT = process.env.PORT || 5000

  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )