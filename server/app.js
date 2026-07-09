require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courseRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");

const app = express();

// الاتصال بقاعدة البيانات
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// عرض الصور المرفوعة
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ملفات الموقع

app.use(express.static(path.join(__dirname, "..")));
app.get("/test", (req, res) => {
    res.send("OK");
});
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", PaymentRoutes);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.listen(PORT, () => {
    console.log(`✅ Server Running On Port ${PORT}`);
});