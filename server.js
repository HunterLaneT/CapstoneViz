const express = require("express");

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('css'))
app.use(express.static('assets'))
app.use(express.static('css/img'))
app.use(express.static('data'))
app.use(express.static('data/OfficialCharlotteData.csv'))
app.use(express.static('js'))
app.use(express.static('src'))


app.get('/', function(req, res){
  res.render('index');
});

app.listen(process.env.PORT || 3000, function(error){
    if(error){
        console.log(error)
    }else{
        console.log("Started")
    }
});