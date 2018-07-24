var express = require('express')
var cors = require('cors')
var app = express()
var port = parseInt(process.env.PORT || 2000)
var instructors = require('./src/instructors')
app.use(cors())
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id == id){
            return data[i]
        }
    }
    return null
}

app.get('/', (request, response) => {
    response.json({data : instructors})
})

app.get('/:id', function (request, response) {
    var record = findById(instructors, request.params.id)
    if (!record){
        response.status = 404
        response.json({
            error: {
                message: 'No record found!'
            }
        })
    }

    response.json({data: record})
})