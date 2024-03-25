const express = require("express")
const eventsRouter = require('./routes/eventsRoutes') 

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api/events", eventsRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

