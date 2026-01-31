import fetch from 'node-fetch';

export async function checkTON(address, expectedAmount) {
  const url = `https://tonapi.io/v2/accounts/${address}`;
  const res = await fetch(url);
  const data = await res.json();

  const balance = Number(data.balance) / 1e9;
  return balance >= expectedAmount;
}
