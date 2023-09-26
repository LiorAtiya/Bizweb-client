import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import ApiClient from "../../../api/ApiRoutes";

const PaypalPayment = (cart) => {
  
  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:3010/api/payment/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        products: cart.cart,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(
      `http://localhost:3010/api/payment/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "ILS",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalPayment;
