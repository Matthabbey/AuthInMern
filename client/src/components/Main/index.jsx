import React, { useState, useEffect } from "react";
import "./CryptoForm.css";
import styles from "./styles.module.css";

const Main = () => {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [walletId, setWalletId] = useState('')


  const [btcPrice, setBtcPrice] = useState(null);

   const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD', {
      headers: {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': 'your_api_key_here',
      }
    })
      .then(response => response.json())
      .then(data => setCryptos(data.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      const data = await response.json();
      setBtcPrice(data.bitcoin.usd);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Buying ${amount} of ${currency} with ${paymentMethod}`);
    // TODO: Implement logic for buying cryptocurrencies
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Crypto Dashboard</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <form onSubmit={handleSubmit} className="crypto-form">
        <h2 className="crypto-form__title">Buy / Sell Cryptocurrency</h2>
        <h1>Current BTC Price: ${btcPrice}</h1>

        <div className="crypto-form__group">
          <label htmlFor="currency" className="crypto-form__label">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="crypto-form__select"
            required
          >
            <option value="">Select Coins</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>
        </div>
        <div className="crypto-form__group">
          <label htmlFor="amount" className="crypto-form__label">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            step="0.0001"
            placeholder="e.g. 0.5"
            className="crypto-form__input"
            required
          />
        </div>
		<div className="crypto-form__group">
          <label htmlFor="amount" className="crypto-form__label">
            WalletID
          </label>
          <input
            type="id"
            id="id"
            value={walletId}
            onChange={(event) => setWalletId(event.target.value)}
            step="0.0001"
            placeholder="xxxx"
            className="crypto-form__input"
            required
          />
        </div>
        <div className="crypto-form__group">
          <label htmlFor="payment-method" className="crypto-form__label">
            Payment Method
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="crypto-form__select"
            required
          >
            <option value="">Select payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="crypto-form__button">
          Buy
        </button>
        <br />
        <button type="submit" className="crypto-form__button-sell">
          Sell
        </button>
      </form>
    </div>
  );
};

export default Main;
