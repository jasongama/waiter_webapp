 
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const waiters= require("./waiterqLogic");
const flash = require('express-flash');
const session = require('express-session');
const waiterApp = express();
const pg = require('pg')



const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL ||'postgresql://codex:codex123@localhost:5432/my_waiters';
const pool = new Pool({
    connectionString
})

const waiter = waiters(pool);
const add = require("./waitersRouter");
const tag = add(waiter);
waiterApp.use(session({
    secret: 'show the login page',
    resave: false,
    saveUninitialized: true
}));

waiterApp.use(flash());

const handlebarsSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});
waiterApp.engine('handlebars', handlebarsSetup);
waiterApp.set("view engine", "Handlebars")
waiterApp.use(bodyParser.urlencoded({
    extended: false
}));
waiterApp.use(bodyParser.json())

waiterApp.use(express.static("public"))

waiterApp.set('view engine', 'handlebars');

waiterApp.get("/", tag.index);

// waiterApp.get("/greeted", async function (req, res) {
//     res.render('actions', {
//         actions: await greeting.getGreet()
//     })
// })

waiterApp.post('/waiters/:username', async function (req, res) {

    response = await waiter.addWaiters( req.body.waiters)
    res.redirect('/')
})

waiterApp.get('/waiters/:username', async function(req, res){
    res.render('waiter',{

    })
})

waiterApp.get('/days', async function(req, res){
    res.render('waiter',{

    })
})
let PORT = process.env.PORT || 3000;


waiterApp.listen(PORT, function () {
    console.log("Waiterwebapp", PORT)
});



