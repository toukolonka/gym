const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get("/api/hello", (req, res) => {
    res.send("Hello from server!" );
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});