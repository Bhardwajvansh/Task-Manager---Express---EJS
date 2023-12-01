const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB")
const taskSC = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", taskSC)

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
    day = day.toUpperCase();
    Item.find().then((data)=>{
        res.render("list", { day: day, tasks: data })
    })
})
app.post("/", (req, res) => {
    let newtask = req.body.task;
    if (newtask != "") {
        const task = Item({
            name: newtask
        })
        task.save().then(
            res.redirect("/")
        )
    }
})


app.listen(process.env.PORT || 3000, () => {
    console.log("LISTNING ON PORT 3000");
})