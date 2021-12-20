const res = require("express/lib/response");
var mysql = require("promise-mysql");

var pool
mysql.createPool({
    connectionLimit: 3,
    host: "localhost",
    user: "root",
    password: "root",
    database: "collegeDB"
})
    .then((result) => {
        pool = result;
    })
    .catch((err) => {
        console.log(error);
    })

var getModules = function () {
    return new Promise((resolve, reject)=>{
        pool.query('select * from module')
        .then((result) => {
            console.log(result)
            
            resolve(result)
           
        })
        .catch((err) => {
            reject(err)
        })

    })
    
}
var getStudents = function () {
    return new Promise((resolve, reject)=>{
        pool.query('select * from student')
        .then((result) => {
            console.log(result)
            
            resolve(result)
           
        })
        .catch((err) => {
            reject(err)
        })

    })
    
}
var getModule = function (mid) {
    return new Promise((resolve, reject)=>{
        pool.query("select * from module where mid = "+"'"+mid+"'")
        .then((result) =>{
            resolve(result)
        })
        .catch((err) =>{
            reject(err)

        })
    })
}
var getStudentsFiltered = function(mid){
    return new Promise((resolve, reject)=>{
        pool.query("select student.sid, student.name, student.gpa from student inner join student_module on student.sid = student_module.sid where mid = "+"'"+mid+"'")
        .then((result) =>{
            resolve(result)
        })
        .catch((err) =>{
            reject(err)

        })
    })
}
module.exports = {getModules, getModule, getStudents, getStudentsFiltered}