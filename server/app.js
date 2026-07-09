require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// عرض مجلد الصور المرفوعة
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);


// عرض مجلد uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// عرض ملفات الموقع
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "..")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});