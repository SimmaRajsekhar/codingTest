const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000

// Set Templating Enginge
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('', (req, res)=> {
    res.render('register')
})

app.get('/register', (req, res)=> {
    res.render('register')
})
app.get('/signup', (req, res)=> {
 let userObj ={
    firstname : 'Hello World',
    lastname: 'second name'
 }
    res.render('signup', userObj);
});
app.post('/register', urlencodedParser, (req, res)=> {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    } else {
            if(req.body && req.body.newsletter == 'on') {
               req.body.newsletter = true;  
            } else {
               req.body.newsletter = false;  
            }
            console.log(req.body);
            res.render('signup', req.body);
    }


})


app.listen(port, () => console.info(`App listening on port: ${port}`))