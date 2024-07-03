const express = require('express')
const app = express()
const { Pool } = require('pg')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret : 'David',
    resave : false,
    saveUninitialized : true,
}))

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'SerenWave',
    password: 'david2001',
    port: 5432,
});

app.post('/register',async (req, res)=>{
    const {username, password, email} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {

        const existingUser = await pool.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,
            [username, email]
        )
        if(existingUser.rows.length > 0){
           return res.status(409).send('Username or Email already taken')
        }

        const newUser = await pool.query(
            `INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *`,
            [username,hashedPassword, email] 
        )
        res.status(201).json(newUser)
    }   
    catch(err){
        res.status(500).send('Error creating user')
    }
})

app.post('/sign-in',async (req, res)=>{
    const {username, password, email} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {

        const existingUser = await pool.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,
            [username, email]
        )
        if(existingUser.rows.length > 0){
           return res.status(409).send('Username or Email already taken')
        }

        const newUser = await pool.query(
            `INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *`,
            [username,hashedPassword, email] 
        )
        res.status(201).json(newUser)
    }   
    catch(err){
        res.status(500).send('Error creating user')
    }
})


app.post('/diary',async (req, res)=>{
    const diary = req.body
    try{
        const text = await pool.query(
            `INSERT INTO thoughts(text) VALUES($1) RETURNING *`,
            [diary]
        )
        res.status(201).json(text)
    }
    catch(error){
        res.status(400).send('Error')
    }
})


app.listen(4000, (req, res)=>{
    console.log('Server is listening on 4000');
})