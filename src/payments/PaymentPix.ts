import sendRequest from "../utils/FetchSending";

class Payment {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    };

    async expiredDate(time: number) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 30);

        const sumtime = time * 60;
        const maxtime = new Date(date.getTime() + sumtime - date.getTimezoneOffset() * 60000);

        return maxtime.toISOString().slice(0, -1) + "-03:00";
    };

    async createPayment(amount: number, cpf: string, email?: string,  description?: string, time = 30) {
        const expired = await this.expiredDate(time);

         const response = await sendRequest({
            uri: "https://api.mercadopago.com/v1/payments",
            method: "POST",
            headers: {
                Authorization: this.accessToken
              },
            json: {
                transaction_amount: amount,
                description: description || "Pagamento",
                payment_method_id: "pix",
                payer: {
                    email: email || "business@Yvncc.dev",
                    identification: { type: "CPF", number: cpf },
                    address: {}
                },
                date_of_expiration: expired,
            },
        });

        const payment = response.body;
        const paymentid = payment.id.toString();

        return {
            paymentid: paymentid,
            paymentlink: payment.transaction_details.external_resource_url,
            copypaste: payment.transaction_details.copypaste,
            qrcode: payment.transaction_details.qrcode.base64,
        };
    };

    async checkPayment(paymentid: string) {

        const response = await sendRequest({
            uri: "https://api.mercadopago.com/v1/payments/" + paymentid,
            method: "GET",
            headers: {
                Authorization: this.accessToken
              },
        });

        const getpayment = response.body;

        const interval = setInterval(async () => {

            if (["approved", "rejected", "cancelled"].includes(getpayment.status)) {
                clearInterval(interval);
                return { status: getpayment.status };
            }
        });
    };

    async cancelPayment(paymentid: string) {

        const response = await sendRequest({
            uri: "https://api.mercadopago.com/v1/payments/" + paymentid,
            method: "PUT",
            headers: {
                Authorization: this.accessToken
              },
            json: {
                status: "cancelled"
            },
        });

        const getpayment = response.body;

        return { status: getpayment.status };
    };

    async refundPayment(paymentid: string) {

        const response = await sendRequest({
            uri: `https://api.mercadopago.com/v1/payments/${paymentid}/refunds`,
            method: "POST",
            headers: {
                Authorization: this.accessToken,
                "X-Idempotency-Key": Math.random() * 100000
              },
        });

        const getpayment = response.body;

        return { status: getpayment.status };
    };
};

export default Payment;
