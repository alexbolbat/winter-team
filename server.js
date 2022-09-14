// const express = require('express');
// const serveStatic = require('serve-static');
// const path = require('path');
// app = express();
// app.use(serveStatic(path.join(__dirname, 'dist')));
// app.get('/', function (req,res) {
//   res.sendFile(path + "index.html");
// });
// const port = process.env.PORT || 3000;
// app.listen(port);




const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/index.html'));
});

const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});