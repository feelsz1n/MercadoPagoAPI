# Api Payments Mercado Pago
> Gerar um pagamento via pix para o seu client realizar o pagamento.

## Installation

### Install all the dependencies with:

| Package Manager     |  Command             |
| ------------------- | -------------------- |
| **Yarn**            | `yarn`               |
| **npm**             | `npm install`        |
| **pnpm**            | `pnpm install`       |

### Transpile the code to JavaScript with:

| Package Manager     |  Command               |
| ------------------- | ---------------------- |
| **Yarn**            | `yarn build`           |
| **npm**             | `npm run build`        |
| **pnpm**            | `pnpm run build`       |

### Start the bot with:
| Package Manager     | Command          |
| ------------------- |------------------|
| **Yarn**            | `yarn start`     |
| **npm**             | `npm run start`  |
| **pnpm**            | `pnpm run start` |

## Usage example

```js
import Payment from './payments/PaymentPix';

const payment = new Payment("ACCESS_TOKEN");

async function main() {
  
  const pagamento = await payment.createPayment(Valor, "CPF", "Email", "Descrição"); "Caso queria por o Email e a descrição."

  await payment.createPayment(Valor, "CPF", "Email"); "Caso não queria por descrição, o padrão vai ser Pagamento, e caso não queira por Email, o padrão vai ser um email generico."
  
  await payment.createPayment(Valor, "CPF"); "Desse jeito é obrigatoriamente você preencher todos os campos, ou botando no automatico mudando diretamente o parametro no codigo que fica dentro da pasta payments."

  await payment.checkPayment(pagamento.paymentid); "Ele já está com o setInterval diretamente na API, então não é necessario você colocar no seu codigo. ele estará retornando o status do pagamento aprovado, rejeitado ou cancelado."

  await payment.cancelPayment(pagamento.paymentid); "Você precisa enviar o ID do pagamento, que retorna no createPayment diretamente na função, que ele irá realizar o cancelamento do pedido"

  await payment.refundPayment(pagamento.paymentid); "O estorno funciona da mesma forma que o cancelamento do pedido, passando diretamente o ID do pagamento que ele irá estornar o pedido automaticamente"

}

main();

```

## Functions

* **createPayment:** Utilizando `Valor` - `CPF` - `Email` - `descrição` para criar um pagamento.
* **checkPayment:** Utilizamos o `PaymentID` para realizarmos a busca do pagamento, assim retornando o status do pedido.
* **cancelPayment:** Utilizamos o `PaymentID` para realizar o cancelamento do pagamento.
* **refundPayment:** Utilizamos o `PaymentID` para realizar o estorno do pedido.

* **OBS:** A função de realizar o estorno irá estornar 100% do valor do pedido, tendo opção de colocar a quantidade que você irá querer estornar, adicionando no codigo. 