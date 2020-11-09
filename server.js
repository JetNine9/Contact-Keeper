const express = require("express");
const connectDb = require("./config/db")
const path = require('path')

const app = express();


//connecting database code below
connectDb();




// Initialize Middleware -> by doing the code below we can now accept data
app.use(express.json({extended: false}))


// app.get("/", (req, res) => {
//     res.json({msg: "helllooo bitch"})
// })

//DEFINING ROUTES BELOW // Connecting each route to a speciic file for organization. Location is under the routes folder

app.use("/api/users", require("./routes/user"))
app.use("/api/contact", require("./routes/contact"))
app.use("/api/auth", require("./routes/auth"))

// serve static assets in production (serve react)
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running on port " )
})
