const express = require('express')
const app = express();
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if (err) {
            console.log('unable to save log');
        }
    })

    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome To Hbs Templete This New Era'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMassegs: '404 Not Found'
    });
})
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})