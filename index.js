const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"studentdb"
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get("/api/get", (req, res) =>{
    const mysqlSelect = "SELECT * FROM student_marks;";
    db.query(mysqlSelect, (err, result)=>{
        res.send(result);
    });
});

app.post("/api/insert", (req, res) =>{

    const name = req.body.name;
    const mark = req.body.mark;

    const mysqlInsert = "INSERT INTO student_marks (name, mark) VALUES (?, ?);";
    db.query(mysqlInsert, [ name, mark], (err, result)=>{
        console.log(result);
    });
    
});

app.delete("/api/delete/:name", (req, res) =>{
    const name = req.params.name;
    const mysqlDelete = "DELETE FROM student_marks WHERE name= ?;";
    db.query(mysqlDelete, name, (err, result)=>{
        if(err) console.log(err);
    });
});
app.put("/api/update", (req, res) =>{
    const name = req.body.name;
    const mark = req.body.mark;
    const mysqlUpdate = "UPDATE student_marks SET mark = ? WHERE name= ?;";
    db.query(mysqlUpdate, [mark, name], (err, result)=>{
        if(err) console.log(err);
    });
})


app.listen(3001, () =>{
    console.log("server running on the port 3001");
});