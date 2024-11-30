const http = require("http");
const { json } = require("stream/consumers");
const { v4: uuidv4 } = require("uuid");

const htmlContent =
  "<h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>" +
  "<p>- Martin Fowler</p>";
const jsonElement = {
  slideshow: {
    author: "Yours Truly",
    date: "date of publication",
    slides: [
      {
        title: "Wake up to WonderWidgets!",
        type: "all",
      },
      {
        items: [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets",
        ],
        title: "Overview",
        type: "all",
      },
    ],
    title: "Sample Slide Show",
  },
};

const status = {
  100: "100 is the Informational status code",
  200: "200 is the Success status code",
  300: "300 is the Redirection status code",
  400: "400 is the Client Errors status code",
  500: "500 is the Server Errors status code",
};

const server = http.createServer((req, res) => {
  let path = req.url;
  if (req.method === "GET" && path.startsWith("/html")) {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(htmlContent);
  } else if (req.method === "GET" && path.startsWith("/json")) {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(jsonElement));
  } else if (req.method === "GET" && path.startsWith("/uuid")) {
    const uuid = {
      uuid: uuidv4(),
    };
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(uuid));
  } else if (req.method === "GET" && path.startsWith("/status")) {
    let statusCode = Number(path.split("/")[2]);
    if (status[statusCode]) {
      let newStatusCode = statusCode == 100 ? 200 : statusCode;
      res.writeHead(newStatusCode, { "content-type": "text/plain" });
      res.end(status[statusCode]);
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Invalid status code provided");
    }
  } else if (req.method === "GET" && path.startsWith("/delay")) {
    const time = Number(path.split("/")[2]);
    if (time < 0) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Invalid time provided");
      return;
    }
    setTimeout(() => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(`Success in ${time} seconds`);
    }, time * 1000);
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(4000, () => {
  console.log("Server is listening on http://localhost:4000");
});
