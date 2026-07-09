const express = require("express");
const router = express.Router();

const upload = require("../multerConfig");
const PaymentRequest = require("../models/PaymentRequest");

router.post("/", upload.single("screenshot"), async (req, res) => {

    try {

        const {
            userName,
            userEmail,
            courseName,
            amount,
            redirect
        } = req.body;

        const payment = new PaymentRequest({

            userName,
            userEmail,
            courseName,
            amount,
            redirect,

            screenshot: req.file.filename

        });

        await payment.save();

        res.json({
            success: true,
            message: "تم إرسال طلب الدفع بنجاح"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "حدث خطأ"
        });

    }

});
// ==============================
// جلب كل طلبات الدفع
// ==============================

router.get("/", async (req, res) => {

    try {

        const payments = await PaymentRequest.find().sort({ createdAt: -1 });

        res.json(payments);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "حدث خطأ"
        });

    }

});
// ==================================
// تأكيد الدفع
// ==================================

router.put("/:id/approve", async (req, res) => {

    try {

        const payment = await PaymentRequest.findById(req.params.id);

        if (!payment) {

            return res.status(404).json({
                message: "طلب الدفع غير موجود"
            });

        }

        payment.status = "Approved";

        await payment.save();

        res.json({

            success: true,

            message: "✅ تم قبول الدفع بنجاح"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "حدث خطأ"

        });

    }

});
module.exports = router;