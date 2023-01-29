import Payment from './payments/PaymentPix';

const PaymentPix = new Payment("ACCESS_TOKEN");

async function main() {
  
  await PaymentPix.createPayment(100, "12345678900", "Descripcao");

}

main();