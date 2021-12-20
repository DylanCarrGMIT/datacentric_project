var express = require('express')
const res = require('express/lib/response')
var SQLDAO = require("./SQLDAO")
var bodyParser = require('body-parser')
var ejs = require('ejs');
var mongoDAO = require("./mongoDAO")

var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.get("/", (req, res) => {
    res.send("<a href='/listModules'>List Modules</a><br><a href='/listStudents'>List Students</a><br><a href='/listLecturers'>List Lecturers</a>")

})
app.get('/listModules', (req, res) => {
   SQLDAO.getModules()
   .then((result)=>{
    res.render("listModules",{modules:result})
   })
   .catch((err)=>{
    res.send(err)
   })
})
app.get('/listStudents',(req, res)=>{
    SQLDAO.getStudents()
   .then((result)=>{
    res.render("listStudents",{students:result})
   })
   .catch((err)=>{
    res.send(err)
   })
})
//app.get("/module/edit/:mid", (req, res)=> {
  //  SQLDAO.getModule(req.params.mid)
    //.then((result)=>{
      //  res.send(result)
    //})
    //.catch((err)=>{
      //  res.send(err)
    //})
//})
app.get("/module/edit/",(req,res)=>{
    res.render("editModule")
})
app.get("/module/students/:mid", (req, res)=>{
    SQLDAO.getStudentsFiltered(req.params.mid)
   .then((result)=>{
    res.render("listStudentsFiltered",{students:result})
   })
   .catch((err)=>{
    res.send(err)
   })
})
app.post("/module/edit/",(req,res)=>{
    res.send("Form submitted")
    console.log(req.body)

})
app.get("/listLecturers", (req, res)=>{
    mongoDAO.getLecturers()
    .then((result)=>{
        res.render("listLecturers",{lecturers:result})
    })
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})