let express = require('express')
let bodyParser = require('body-parser')
let server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
/// ^^^ ALWAYS THE SAME ABOVE


let Bug = require('./server-assets/models/bug')
let _bugs = []
//create a function that can send bugs to whoever asks for the list

//get bugs function
server.get('/api/bugs', (request, response, next) => {
  response.send(_bugs)
})

//create bug function
server.post('/api/bugs', (request, response, next) => {
  try {
    server.use(bodyParser.json())
    let bug = new Bug(request.body.message, request.body.creator)
    _bugs.push(bug)
    response.send({
      message: "succefully added bug",
      data: bug
    })
  } catch (error) {
    response.status(400).send({
      error: error.message,
    })
  }
})

//delete a bug
server.delete('/api/bugs/:id', (request, response, next) => {
  let id = request.params.id

  for (let i = 0; i < _bugs.length; i++) {
    const bug = _bugs[i];
    if (bug._id == id) {
      _bugs.splice(i, 1)
      return response.send({
        message: "Successfully removed bug"
      })
    }
  }
  return response.status(400).send({
    error: "Invalid Bug Id"
  })

  // let indexToRemove = _bugs.findIndex(b => b._id == id)

  // if (indexToRemove == -1) {
  //   return response.send({
  //     error: "Invalid Bug Id"
  //   })
  // }

  // _bugs.splice(indexToRemove, 1)
  // response.send({
  //   message: "Successfully removed bug"
  // })
})

//edit a bug
server.put('/api/bugs/:id', (req, res, next) => {
  let bug = _bugs.find(b => b._id == req.params.id)
  if (!bug) {
    return res.status(400).send({ error: "Invalid Id" })
  }
  bug.message = req.body.message
  res.send({ message: "Successfully updated bug" })
})


///vvvvvv ALWAYS THE SAME BELOW
server.listen(3000, () => {
  console.log("The server is running on port:", 3000)
})