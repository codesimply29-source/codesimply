const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Server Works");
});

app.get("/test", (req, res) => {
    res.send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});