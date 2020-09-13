const http = require("http");
const url = require("url");

// Método create-server
const server = http.createServer((req, res) => {
  console.log(url.parse(req.url));

  if (req.url === "/") {
    res.end("Gatitos!");
  } else if (req.url === "/mostrarGatito") {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`
    <img src="https://i.ytimg.com/vi/Kj8vBsxsu_I/hqdefault.jpg"/>
    <h1>Gatito!</h1>`);
  } else if (req.url === "/fotosGatitos") {
    fs.readFile("./cats.json", "utf-8", (err, data) => {
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(
      '<h1>404 - content not found</h1><img src="https://i.chzbgr.com/full/265857792/hBDD2E6FB/empathy-cat-is-sorry"/>',
      "utf-8"
    );
  }
});
server.listen(3030);
