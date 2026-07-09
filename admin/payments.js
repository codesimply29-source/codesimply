const table = document.getElementById("paymentsTable");

async function loadPayments() {

    try {

        const res = await fetch("http://localhost:5000/api/payments");

        const payments = await res.json();

        table.innerHTML = "";

        payments.forEach(payment => {

            table.innerHTML += `

            <tr>

                <td>${payment.userName}</td>

                <td>${payment.courseName}</td>

                <td>${payment.amount} جنيه</td>

                <td>

                    <img
                        src="http://localhost:5000/uploads/${payment.screenshot}"
                        width="120">

                </td>

                <td>${payment.status}</td>

                <td>

                    <button onclick="approvePayment('${payment._id}')">

                        ✅ تأكيد الدفع

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (err) {

        console.log(err);

        alert("حدث خطأ أثناء تحميل الطلبات");

    }

}

async function approvePayment(id) {

    const ok = confirm("هل أنت متأكد من قبول الدفع؟");

    if (!ok) return;

    try {

        const res = await fetch(
            "http://localhost:5000/api/payments/" + id + "/approve",
            {
                method: "PUT"
            }
        );

        const data = await res.json();

        alert(data.message);

        loadPayments();

    } catch (err) {

        console.log(err);

    }

}

loadPayments();