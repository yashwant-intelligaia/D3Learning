const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/asset', express.static(__dirname + '/public'));

/*Splitwise Authentication*/
const Splitwise = require('splitwise')
const sw = Splitwise({
  consumerKey: 'ei4g115r6NG2DW2h7Fw3eVYjKqO6FNZk5WhUubKM',
  consumerSecret: 'QBkIUG7xjibqhmdh4Vqh2llKedEoP0pfc9RU5Edl'
})
/*Splitwise Authentication ends */

function view(fileName){
  return path.join(__dirname+'/public/html/'+fileName+'.html');
}

app.get('/', urlencodedParser, function (req, res) {
  res.sendFile(view('graph_v2'));
});

app.get('/groups', function(req, res){
	sw.getGroups().then((data)=>{res.send({"status":"success", "data":data})});
});

app.get('/expenses', function(req, res){
  sw.getExpenses().then((data)=>{res.send({"status":"success", "data":data})});
});

app.post('/group/expense', jsonParser, function(req, res){
  sw.getExpenses({group_id: req.body.group_id}).then((data)=>{res.send({"status":"success", "data":data})});
});

app.post('/group', jsonParser ,function(req, res){
	sw.getGroup({id:req.body.id}).then((data)=>{res.send({"status":"success", "data":data})});
});

app.listen(3000);
console.log('server started at port:3000');
