const express = require("express");

const app = express();



app.get("/", (req, res) => {
    res.json({msg: "helllooo bitch"})
})

//DEFINING ROUTES BELOW //

app.use("/api/users", require("./routes/user"))
app.use("/api/contact", require("./routes/contact"))
app.use("/api/auth", require("./routes/auth"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running on port " )
})
