const express = require("express");
const router = express.Router();

const upload = require("../multerConfig");
const PaymentRequest = require("../models/PaymentRequest");
const User = require("../models/User");
const Course = require("../models/Course");

// ===========================
// إرسال طلب دفع
// ===========================

router.post(
    "/",
    upload.single("screenshot"),
    async (req, res) => {

        try {
            console.log(req.body);

            const payment = new PaymentRequest({

                userId: req.body.userId,

                userName: req.body.userName,

                userEmail: req.body.userEmail,

                courseName: req.body.courseName,

                amount: req.body.amount,

                redirect: req.body.redirect,

                screenshot: req.file
                    ? req.file.filename
                    : "",

                status: "pending"

            });

            await payment.save();

            res.status(201).json({

                success: true,
                message: "تم إرسال طلب الدفع بنجاح"

            });

        } catch (err) {

            console.log(err);

            res.status(500).json({

                success: false,
                message: err.message

            });

        }

    }

);

// ===========================
// عرض جميع الطلبات
// ===========================

router.get("/", async (req, res) => {

    try {

        const payments = await PaymentRequest.find().sort({ createdAt: -1 });

        res.json(payments);

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});

// ===========================
// تأكيد الدفع
// ===========================

router.put("/:id/approve", async (req, res) => {

    try {

        const payment = await PaymentRequest.findById(req.params.id);

        if (!payment) {

            return res.status(404).json({

                success: false,
                message: "الطلب غير موجود"

            });

        }

        const user = await User.findById(payment.userId);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "المستخدم غير موجود"

            });

        }
        console.log("اسم الكورس القادم:", payment.courseName);

        const courses = await Course.find();

        console.log("الكورسات الموجودة:");
        courses.forEach(c => console.log(c.title));

        const course = await Course.findOne({
            title: payment.courseName
        });

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "الكورس غير موجود"

            });

        }

        if (!user.purchasedCourses.includes(course._id)) {

            user.purchasedCourses.push(course._id);

            user.totalSpent += payment.amount;

            await user.save();

            course.students += 1;

            await course.save();

        }

        payment.status = "Approved";

        await payment.save();

        res.json({

            success: true,
            message: "تم قبول الدفع وفتح الكورس للمستخدم"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});

module.exports = router;