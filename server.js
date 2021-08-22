const express = require('express')
const app = express();
const axios = require('axios')

// Web Sockets
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})



// Database setup
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres', 
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'QuizAppdb',
  max: 20
})

const PORT = process.env.PORT || 3001;


// Event Listeners

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/', (req, res) => {res.send('you found the server')})

app.get('/api', (req, res) => {
    return res.send({message: 'Welcome to the quiz page!'})
})

// app.get('/insert', (req, res) => {
//     pool.query(`INSERT INTO quizdata VALUES ('444', '{'message': "a message"}');`, (err, res) => {
//       if (err) return console.log('Another error ughhh', err.stack)
//     })
//     res.send('success')
// })

// app.get('/getdata', (req, res) => {

//   pool.query('SELECT * FROM quizdata;', (err, result) => {
//     if (err) return console.log('Another error ughhh', err.stack)
//     res.send(result.rows)
//   })
// })


// Web Socket Event Listeners

io.on("connection", socket => {
  console.log('user connected    ' + socket.id);

  socket.on("connected?", req => {
    socket.emit('connected')
  })

  socket.on("start game", req => {
    deleteRow(socket)
    fetchQuestions(socket)
  })

  socket.on("new question", () => {
    getRow(socket)
  })

  socket.on("disconnect", req => {
    deleteRow(socket)
    console.log('user disconnected');
  })
})




// Queries

const insertRow = (socket, Questions) => {
  pool.query('INSERT INTO quizdata VALUES ($1, $2)', [socket.id, Questions], (err, res) => {
    if(err) console.log(err)
  })
}

const getRow = socket => {
  pool.query('SELECT * FROM quizdata WHERE id = $1', [socket.id], (err, res) => {
    if(err) return console.log(err)
    socket.emit('new question', res.rows[0].questions.results)
  })
}

const deleteRow = socket => {
  pool.query('DELETE from quizdata WHERE id = $1', [socket.id], (err, result) => {
    if(err) console.log(err)
  })
}

const fetchQuestions = (socket, {amount, category, difficulty} = defaultQuizOptions) => {
  axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
  .then(res => {
    insertRow(socket, res.data)
  })
  .then(res => {
    socket.emit("game starting")
  })
  .catch(err => console.log(err))
}

const getNextQuestion = socket => {
  
}

// Default Objects

const defaultQuizOptions = {
  amount: 10,
  category: 9,
  difficulty: 'easy'
}

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````//