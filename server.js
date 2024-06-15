const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const destinations = require("./data/destinations");

// Mengaktifkan CORS untuk semua rute
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint GET semua destinasi wisata
app.get("/", (req, res) => {
  res.send('Express server working');
});

app.get("/wisata", (req, res) => {
  res.json({
    error: false,
    message: "success",
    destinations: destinations.map((dest) => ({
      id: dest.id,
      title: dest.title,
      region: dest.region,
      provinsi: dest.provinsi,
      hero_img: dest.hero_img,
    })),
  });
});

// Endpoint GET detail destinasi wisata berdasarkan ID
app.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  const destination = destinations.find((dest) => dest.id === id);

  if (destination) {
    res.json({
      error: false,
      message: "success",
      destination: destination,
    });
  } else {
    res.status(404).json({
      error: true,
      message: "Destination not found",
    });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
