import React, { useState, useEffect } from "react";
import "./CryptoForm.css";
import styles from "./styles.module.css";
import axios from "axios";
import Payment from "../Payment";

const Main = () => {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [walletId, setWalletId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [btcPrice, setBtcPrice] = useState([]);

  const [cryptos, setCryptos] = useState("");

  // useEffect(() => {
  //   fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD', {
  //     headers: {
  //       'Accepts': 'application/json',
  //       'X-CMC_PRO_API_KEY': 'your_api_key_here',
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => setCryptos(data.data))
  //     .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {
  //       axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD')
  //     .then(response => {
  //       console.log(response.data.bitcoin);
  //       // setBtcPrice(response.data.tokens);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD"
      );
      const data = await response.json();
      console.log(data);
      setCryptos(data);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Buying ${amount} of ${currency} with ${walletId} through${paymentMethod} `
    );
    // TODO: Implement logic for buying cryptocurrencies

    setAmount("");
    setCurrency("");
    setWalletId("");
    setPaymentMethod("");
  };

  return (
    <><div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Crypto Dashboard</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      {/*
    {cryptoData.map((crypto, index) => (
      <div key={index}>
        <h2>{crypto.name}</h2>
        <p>{crypto.current_price}</p> */}

      <form onSubmit={handleSubmit} className="crypto-form">
        <h2 className="crypto-form__title">Buy / Sell Cryptocurrency</h2>
        <h1>Current BTC Price: ${btcPrice}</h1>

        <div className="crypto-form__group">
          <label htmlFor="currency" className="crypto-form__label">
            Currency
          </label>
          <select
            id="currency"
            value={selectedOption}
            onChange={handleSelectChange}
            // onChange={(event) => setCryptos(event.target.value)}
            className="crypto-form__select"
            required
          >
            <option value="">Select Coin</option>
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
            required />
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
            required />
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
      <br />
      <br/>
      <hr />
      <br />
    <Payment />
    </div>
    
    </>
  );
};

export default Main;
