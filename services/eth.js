import fetch from 'node-fetch';

export async function checkETH(address, expectedAmount) {
  const url = `https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`;
  const res = await fetch(url);
  const data = await res.json();

  const received = data.total_received / 1e18;
  return received >= expectedAmount;
}
