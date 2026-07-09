const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const User = require("../models/User");
const upload = require("../multerConfig");

// ======================
// عرض جميع الكورسات
// ======================

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// ======================
// الكورسات التي اشتراها المستخدم
// ======================

router.get("/my/:userId", async (req, res) => {

    try {

        const user = await User.findById(req.params.userId)
            .populate("purchasedCourses");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "المستخدم غير موجود"
            });

        }

        res.json({
            success: true,
            purchasedCourses: user.purchasedCourses
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ======================
// عدد الكورسات
// ======================

router.get("/count", async (req, res) => {

    try {

        const totalCourses = await Course.countDocuments();

        res.json({
            success: true,
            totalCourses
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ======================
// إضافة كورس
// ======================

router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "introVideo", maxCount: 1 }
    ]),
    async (req, res) => {

        try {

            const course = new Course({

                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                level: req.body.level,
                language: req.body.language,
                duration: req.body.duration,
                lessonsCount: req.body.lessonsCount,
                price: req.body.price,

                image: req.files.image
                    ? req.files.image[0].filename
                    : "",

                introVideo: req.files.introVideo
                    ? req.files.introVideo[0].filename
                    : ""

            });

            await course.save();

            res.status(201).json({
                success: true,
                message: "تم إضافة الكورس بنجاح",
                course
            });

        } catch (err) {

            res.status(500).json({
                success: false,
                message: err.message
            });

        }

    }

);

// ======================
// تعديل كورس
// ======================

router.put("/:id", async (req, res) => {

    try {

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(course);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================
// حذف كورس
// ======================

router.delete("/:id", async (req, res) => {

    try {

        await Course.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "تم حذف الكورس"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;