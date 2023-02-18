/*Build a node restful api using express, with the following endpints

-Insert Student                                  (15pts)
Update Student                                  (20pts)
Delete Student                                  (15pts)
-Show all students (at least 5 students)         (15pts)
Show one specific student                       (15pts)
Register (bcrypt)                               (10pts)
Login (bcrypt)                                  (10pts)

All the data operations will be stored in a local array,  */

const express = require('express');
const app = express();
const body= require('body-parser');
const bcrypt = require('bcrypt');

app.use(body.json());

//student array
const students = [
    {
        id: 0,
        name: 'StudentTest',
        career:'Software Engineering',
        pass:"1234"
    },
    {
        id: 1,
        name: 'Kevin',
        career:'Software Engineering',
        pass:"1234"
    }

];

//insert student
//when inserting is only needed to put in the body the name, career and pass
app.post('/insert', (req, res) => {
    const id = students.length; 
    const name = req.body.name;
    const career = req.body.career;
    const pass = req.body.pass;
    const student = {
        id: id,
        name: name,
        career: career,
        pass: pass
    };
    students.push(student);
    res.send(student);
});
//update student
//needs to insert the id in the url. And the name, career and pass in the body
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const career = req.body.career;
    const pass = req.body.pass;
    const student = {
        id: parseInt(id),
        name: name,
        career: career,
        pass: pass
    };
    students[id] = student;
    res.send(student);
});

//delete student
//needs to insert the id in the url in that student id will be deleted
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const student = students[id];
    students.splice(id, 1);
    res.send(student);
});


//get all students
app.get('/getAll', (req, res) => {
    res.send(students);
});

//get one student
//needs to insert the id in the url
app.get('/getOne/:id', (req, res) => {
    const id = req.params.id;
    const student = students[id];
    res.send(student);
});

//register with bcrypt
//needs to insert the name, career and pass in the body
app.post('/register', (req, res) => {
    const id = students.length;
    const name = req.body.name;
    const career = req.body.career;
    const pass = req.body.pass;
    bcrypt.hash(pass, 10,(err, hash) => {

        const student = {
            id: id,
            name: name,
            career: career,
            pass: hash
        };
        students.push(student);
        res.send(student);
    });
});

//login with bcrypt
//needs to insert the name and pass in the body
app.post('/login', async(req, res) => {
    const name = req.body.name;
    const pass = req.body.pass;
    const student = students.find(student => student.name === name);
    if(student == null){
        return res.send('Cannot find user');
    }
    try{
        const compare =await bcrypt.compare(pass, student.pass);
        if (compare){
            res.send('Logged in');
        }else{
            res.send('Not logged in');
        }
    }catch(err){
        console.log(err);
    }
});



app.listen(3000, ()=> {
    console.log(`App is running`)
}); 
