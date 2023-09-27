const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

console.log()

app
.use('/styles', express.static(__dirname + `/views/css`))
.use('/scripts', express.static(__dirname + `/views/js`))

app
.get('/', (req, res) => res.render(__dirname + "/views/html/portfolio.ejs"))
.get("/list", (req, res) => {
    const buffer = fs.readFileSync("./database/works.json");
    const arr = JSON.parse(buffer.toString());
    res.send(arr)
})
.get('/work', (req, res) => {
    const buffer = fs.readFileSync("./database/works.json");
    const arr = JSON.parse(buffer.toString());
    res.send(arr[req.query.id])
});


app
.listen(port, () => console.log(`Server is successfully running at port: ${port}`));