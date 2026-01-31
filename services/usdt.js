import fetch from 'node-fetch';

export async function checkUSDT(address, expectedAmount) {
  const url = `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20`;
  const res = await fetch(url);
  const data = await res.json();

  let total = 0;

  for (const tx of data.data || []) {
    if (tx.token_info.symbol === 'USDT') {
      total += Number(tx.value) / 1e6;
    }
  }

  return total >= expectedAmount;
}
