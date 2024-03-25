const express = require("express")
const eventsRouter = require('./routes/eventsRoutes') 
const userRouter = require('./routes/usersRoutes') 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/events", eventsRouter)
app.use("/api/users", userRouter)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

