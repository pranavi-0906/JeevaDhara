const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Hospital = require("./models/Hospitals");

const app = express();
require('dotenv').config();


const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // replace with your actual key

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ]
      })
    });

    const data = await response.json();

   if (
  !data.candidates ||
  !data.candidates[0] ||
  !data.candidates[0].content ||
  !data.candidates[0].content.parts ||
  !data.candidates[0].content.parts[0] ||
  !data.candidates[0].content.parts[0].text
) {
  console.error("❌ Gemini API error or malformed response:", data);
  return res.status(500).json({ reply: "⚠️ Sorry, I couldn't get a proper response from the AI." });
}


    const reply = data.candidates[0].content.parts.map(p => p.text).join("\n");
    res.send({ reply });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ reply: "⚠️ Server error. Please try again later." });
  }
});





// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- LOGIN ROUTE --------------------
app.post("/login", async (req, res) => {
  const { hospitalName, password } = req.body;

  console.log("📥 Login attempt:", hospitalName, password);

  try {
    const hospital = await Hospital.findOne({ name: hospitalName });

    if (!hospital) {
      console.log("❌ Hospital not found");
      return res.status(401).json({ message: "Hospital not found" });
    }

    if (hospital.password !== password) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("💥 Server error during login:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// -------------------- GET HOSPITAL DATA --------------------
app.get("/getHospitalData", async (req, res) => {
  try {
    const hospitals = await Hospital.find({}, { password: 0 });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hospital data" });
  }
});

// -------------------- UPDATE BED + DOCTOR INFO --------------------
app.post("/updateHospitalInfo", async (req, res) => {
  const { hospitalName, beds, doctors } = req.body;

  try {
    const hospital = await Hospital.findOne({ name: hospitalName });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.beds = beds;
    hospital.doctors = doctors;
    await hospital.save();

    res.json({ message: "Hospital info updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- TEMP SEED ROUTES --------------------

// ✅ SEED ALL HOSPITALS (beds + doctors + passwords)
app.get("/seedAllHospitals", async (req, res) => {
  try {
    const exists = await Hospital.findOne({ name: "Apollo Hospitals, Malakpet" });
    if (exists) return res.send("✅ Hospitals already seeded.");

    await Hospital.insertMany([
      {
        name: "Apollo Hospitals, Malakpet",
        password: "apollo123",
        beds: 32,
        doctors: [
          { doctor: "Dr. A Sharma", start: "10:00 AM", end: "2:00 PM" },
          { doctor: "Dr. B Reddy", start: "9:00 AM", end: "1:00 PM" },
          { doctor: "Dr. C Rao", start: "12:00 PM", end: "4:00 PM" },
          { doctor: "Dr. D Kumar", start: "11:00 AM", end: "3:00 PM" }
        ]
      },
      {
        name: "Apollo Hospital, Somajiguda",
        password: "somajiguda123",
        beds: 24,
        doctors: [
          { doctor: "Dr. A Sharma", start: "9:00 AM", end: "12:00 PM" },
          { doctor: "Dr. B Reddy", start: "10:00 AM", end: "2:00 PM" },
          { doctor: "Dr. C Rao", start: "1:00 PM", end: "4:00 PM" },
          { doctor: "Dr. D Kumar", start: "11:30 AM", end: "2:30 PM" }
        ]
      },
      {
        name: "Apollo Hospitals, Secunderabad",
        password: "sec123",
        beds: 18,
        doctors: [
          { doctor: "Dr. A Sharma", start: "8:00 AM", end: "11:00 AM" },
          { doctor: "Dr. B Reddy", start: "1:00 PM", end: "4:00 PM" },
          { doctor: "Dr. C Rao", start: "2:00 PM", end: "5:00 PM" },
          { doctor: "Dr. D Kumar", start: "3:00 PM", end: "6:00 PM" }
        ]
      },
      {
        name: "Apollo Hospitals, Hitec City",
        password: "hitech123",
        beds: 40,
        doctors: [
          { doctor: "Dr. A Sharma", start: "10:00 AM", end: "1:00 PM" },
          { doctor: "Dr. B Reddy", start: "9:00 AM", end: "11:00 AM" },
          { doctor: "Dr. C Rao", start: "12:00 PM", end: "3:00 PM" },
          { doctor: "Dr. D Kumar", start: "4:00 PM", end: "7:00 PM" }
        ]
      }
    ]);
    res.send("✅ All hospitals inserted successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to insert hospitals.");
  }
});

// Individual ones (can remove later)
app.get("/add-temp-hospital", async (req, res) => {
  try {
    const exists = await Hospital.findOne({ name: "Apollo Hospitals, Malakpet" });
    if (exists) return res.send("✅ Already exists.");
    const newHosp = new Hospital({
      name: "Apollo Hospitals, Malakpet",
      password: "apollo123",
      beds: 0,
      doctors: []
    });
    await newHosp.save();
    res.send("✅ Apollo Hospitals, Malakpet added.");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to add hospital.");
  }
});

app.get("/add-temp-hospital-somajiguda", async (req, res) => {
  try {
    const existing = await Hospital.findOne({ name: "Apollo Hospital, Somajiguda" });
    if (existing) return res.send("Apollo Hospital, Somajiguda already exists.");
    const hospital = new Hospital({
      name: "Apollo Hospital, Somajiguda",
      password: "somajiguda123",
      beds: 0,
      doctors: []
    });
    await hospital.save();
    res.send("✅ Apollo Hospital, Somajiguda added.");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to add Apollo Hospital, Somajiguda");
  }
});

app.get("/add-temp-hospital-Citizenship6", async (req, res) => {
  try {
    const existing = await Hospital.findOne({ name: "Citizenship Hospitals, Hitec City" });
    if (existing) return res.send("Apollo Hospital, hitech already exists.");
    const hospital = new Hospital({
      name: "Citizenship Hospitals, Hitec City",
      password: "admin123",
      beds: 0,
      doctors: []
    });
    await hospital.save();
    res.send("✅ Yashoda Hospital, hitech added.");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to add Apollo Hospital, hitech");
  }
});


app.get("/add-temp-hospital-Rainbow1", async (req, res) => {
  try {
    const existing = await Hospital.findOne({ name: "Rainbow Hospitals, Malakpet" });
    if (existing) return res.send("AIG Hospital, Malakpet already exists.");
    const hospital = new Hospital({
      name: "Rainbow Hospitals, Malakpet",
      password: "admin123",
      beds: 0,
      doctors: []
    });
    await hospital.save();
    res.send("✅ AIG Hospital, Malakpet added.");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to add AIG Hospital, hitech");
  }
});


app.get("/add-temp-hospital-Rainbow2", async (req, res) => {
  try {
    const existing = await Hospital.findOne({ name: "Rainbow Hospitals, Somajiguda" });
    if (existing) return res.send("AIG Hospital, Somajiguda already exists.");
    const hospital = new Hospital({
      name: "Rainbow Hospitals, Somajiguda",
      password: "admin123",
      beds: 0,
      doctors: []
    });
    await hospital.save();
    res.send("✅ AIG Hospital, Somajiguda added.");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to add AIG Hospital,Somajiguda");
  }
});

app.get("/add-temp-hospital-Rainbow3", async (req, res) => {
  try {
    const existing = await Hospital.findOne({ name: "Rainbow Hospitals, Secunderabad" });
    if (existing) return res.send("AIG Hospital, Secunderabad already exists.");
    const hospital = new Hospital({
      name: "Rainbow Hospitals, Secunderabad",
      password: "admin123",
      beds: 0,
      doctors: []
    });
    await hospital.save();
    res.send("✅ AIG Hospital, Secunderabad added.");
  } catch (err) {
    console.error(err);
    res.send("❌ Failed to add AIG Hospital, Secunderabad");
  }
});












// -------------------- STATIC ROUTES --------------------

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Dynamic route to serve hospital pages
app.get("/hospital/:name", (req, res) => {
  const hospitalName = req.params.name;
  const filePath = path.join(
    __dirname,
    "public",
    `${hospitalName.toLowerCase()}.html`
  );
  res.sendFile(filePath);
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});