var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
// const ParseDashboard = require('parse-dashboard');

var api = new ParseServer({
  databaseURI: 'postgres://postgres:postgres@localhost:5432/blog',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'pppppp',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/blog',
  restAPIKey: 'rrrrrr',
  javascriptKey: 'jjjjjj',
  liveQuery: {
    classNames: ["Posts"]
  }
});

// var dashboard = new ParseDashboard({
//   "apps": [
//     {
//       "serverURL": "http://localhost:1337/parse",
//       "appId": "myAppId",
//       "masterKey": "pppppp",
//       "appName": "Blog Expotec"
//     }
//   ]
// });

var app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mountPath = process.env.PARSE_MOUNT || '/blog';
app.use(mountPath, api);

// app.use('/dashboard', dashboard);

app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.get('/iniciar', function (req, res) {
  res.render('iniciar');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/posts', function (req, res) {
  res.render('posts');
});

app.get('/create', function (req, res) {
  res.render('criar-post');
});

app.get('/posts/edit/:id', function (req, res) {
  res.render('editar-posts', { id: req.params.id });
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('node-postgres-parse-frontend example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
