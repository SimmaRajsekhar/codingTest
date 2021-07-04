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
    res.render('signup');
});
app.post('/register', urlencodedParser, (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
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
            res.render('signup', req.body);
    }


})


app.listen(port, () => console.info(`App listening on port: ${port}`))