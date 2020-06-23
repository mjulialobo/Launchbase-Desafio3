const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cursos = require('./public/scripts/data')

server.set("view engine", "njk")

server.use(express.static("public"))

nunjucks.configure("views", {
    express: server
})


server.get("/", function(req, res) {
    return res.render("index")

})

server.get("/courses", function(req, res) {
    return res.render("courses", { items: cursos })

})

server.get("/about", function(req, res) {
    return res.render("about")

})

server.get("/course/:id", function(req, res) {
    const id = req.params.id
    const course = cursos.find(function(course) {

        if (course.id == id) {
            return true
        }
    })
    if (!course) {
        return res.send("Course not found!")
    }
    return res.render("course", { item: course });
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});
server.listen(5000, function() {
    console.log("server is running")
})