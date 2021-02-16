const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express()

const dbURL = 'mongodb+srv://Maksim:Ebaloff1337228@cluster0.rmwa6.mongodb.net/NodeJS?retryWrites=true&w=majority'
mongoose
.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => app.listen(3000))
.catch((err) => console.log(err))

// listen for requests

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(morgan('dev'))

const links = [{text:'Home', link:'/'},{text:'Articles', link:'/about'}]

const blogs = [
  {
    img: '/img/computer.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/peoples.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/computer2.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
]

app.get('/', (request, responce) => {
  responce.render('index', { blogs, links }).status(200)
})
app.get('/add-blog', (request, responce) => {
  const blog = new Blog({
    title :'ахахахахахаха',
    description: 'fsdff',
    imgUrl:
    '/img/computer2.png',
    date: 'ПОШЕЛ ВОН'
  })
  blog
  .save()
  .then((result) => responce.send(result))
})
app.get('/blogs', (request, responce) => {
  Blog.find().then((result) => {
    responce.render('index', {blogs: result, links})
  })
})
app.get('/about', (request, responce) => {
  res.render('about', { blogs }).status(200)
})
app.get('/blogs/create', (req, res) => {
  res.render('create').status(200)
})
app.use((req, res) => {
  res.status(404).render('404')
})
