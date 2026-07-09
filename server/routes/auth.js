const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "البريد الإلكتروني مستخدم بالفعل"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "تم إنشاء الحساب"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "حدث خطأ"
        });
    }
});
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "البريد الإلكتروني غير موجود"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "كلمة المرور غير صحيحة"
            });
        }
return res.status(200).json({
    success: true,
    message: "تم تسجيل الدخول بنجاح",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        purchasedCourses: user.purchasedCourses
    }
});
  
    } catch (err) {

    console.log(err);

    res.status(500).json({
        message: "حدث خطأ"
    });

}

});
// ================================
// عدد المستخدمين
// ================================

router.get("/count", async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        res.json({
            success: true,
            totalUsers
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء جلب عدد المستخدمين"
        });

    }
});
module.exports = router;