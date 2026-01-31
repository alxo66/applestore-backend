import axios from "axios";

export async function getRates() {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "bitcoin,ethereum,tether,the-open-network",
        vs_currencies: "rub"
      }
    }
  );

  return {
    BTC: data.bitcoin.rub,
    ETH: data.ethereum.rub,
    USDT: data.tether.rub,
    TON: data["the-open-network"].rub
  };
}
