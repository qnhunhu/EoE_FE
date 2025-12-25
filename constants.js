// constants.js
const DEV = 'http://192.168.1.176:5241'; 
const PROD = 'https://api.supplyeggs.com';

const API_BASE_URL = __DEV__ ? DEV : PROD;

export default {
  API_BASE_URL,
};
