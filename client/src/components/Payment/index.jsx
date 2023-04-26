import React, { useState } from "react";
import styles from "./styles.module.css";


const Payment = () => {
  const [walletId, setWalletId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const handleWalletIdChange = (event) => {
    setWalletId(event.target.value);
  };

  const handlePaymentScreenshotChange = (event) => {
    setPaymentScreenshot(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit the form data using AJAX, fetch or other methods
  };

  return (
    <form className="crypto-form" onSubmit={handleSubmit}>
      <label htmlFor="walletId" className="crypto-form__label">Wallet ID:</label>
      <input className="crypto-form__input"
        type="text"
        id="walletId"
        name="walletId"
        value={walletId}
        onChange={handleWalletIdChange}
      />
      <br />
      <br />
      <label htmlFor="paymentScreenshot" className="crypto-form__label">Payment Screenshot:</label>
      <input className="crypto-form__input"        type="file"
        id="paymentScreenshot"
        name="paymentScreenshot"
        accept="image/*"
        onChange={handlePaymentScreenshotChange}
      />
      <br />
      <br />
      <button className="crypto-form__button" type="submit" value="Submit">Upload Payment</button>
    </form>
  );
}
export default Payment