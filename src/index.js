const mongoose = require('mongoose')
const app = require('./server')

const { PORT, MONGODB_URI } = require('./config/keys')

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

async function start() {
  try {
    await mongoose
      .connect(MONGODB_URI, mongodbOptions)
      .then(console.log('Connected to Mongo DB'))
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.log(e)
    console.log('Ошибка при запуске сервера')
  }
}

start()
