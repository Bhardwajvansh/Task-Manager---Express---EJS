const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }));

let taskarr = []

app.get("/", (req, res) => {
    let day = ""
    let date = new Date();
    switch (date.getDay()) {
        case 0:
            day = "sunday"
            break;
        case 1:
            day = "monday"
            break;
        case 2:
            day = "tuenday"
            break;
        case 3:
            day = "wednesday"
            break;
        case 4:
            day = "thursday"
            break;
        case 5:
            day = "friday"
            break;
        case 6:
            day = "saturday"
            break;
    }
    day=day.toUpperCase();
    res.render("list", { day: day, tasks: taskarr })
})
app.post("/", (req, res) => {
    let newtask = req.body.task;
    if (newtask != "") {
        taskarr.push(newtask);
    }
    res.redirect("/",);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("LISTNING ON PORT 3000");
})