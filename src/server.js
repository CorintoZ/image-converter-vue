const express = require('express')
const cors = require('cors')
const app = express()
const expressQueue = require('express-queue')
const fileUpload = require('express-fileupload')
const sharp = require('sharp')

const queueMw = expressQueue({ activeLimit: 3, queuedLimit: -1 })

app.use('/converted', express.static('public'))
app.use(cors())
// Limit number of active requests
app.use(queueMw)
// Store files on request.file
app.use(fileUpload())
// Apply random delay to response
app.use((req, res, next) =>
  setTimeout(next, Math.floor(Math.random() * 8000) + 3000)
)

app.post('/photos/upload', async (req, res) => {
  console.log(queueMw.queue.getLength())
  // Store
  const photo = req.files.image
  console.log(photo.data)
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  const jpgPhoto = await sharp(photo.data)
    .jpeg()
    .toBuffer()
  //Send buffer of the image
  console.log(jpgPhoto)
  res.send(
    `http://localhost:3000/converted/${photo.name.replace('png', 'jpg')}`
  )
})

app.listen(3000, () => console.log('Image Converter listening on port 3000!'))

// const fileName = photo.name.replace('png', 'jpg')
// await sharp(photo.data).toFile(`${__dirname}/../public/${fileName}`)
// //Send buffer of the image
// res.send({
//   name: photo.name,
//   data: `http://localhost:3000/converted/${fileName}`
// })
