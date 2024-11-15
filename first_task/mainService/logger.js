//const express = require("express");
const axios = require("axios");

const targetUrl = 'http://localhost:4000/log'

/* 
{
  "shop_id": "shop_2",
  "plu": "123456",
  "action": "create_stock"
} */

module.exports.sendRequest = async (shop_id, plu, action) => {
    try {
      const response = await axios.post(targetUrl, { shop_id, plu, action });
      console.log("Response received:", response.data);
    } catch (error) {
      console.error("Error sending request:", error.message);
    }
  };