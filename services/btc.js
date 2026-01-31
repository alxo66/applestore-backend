import fetch from 'node-fetch';

export async function checkBTC(address, expectedAmount) {
  const url = `https://blockstream.info/api/address/${address}/utxo`;
  const res = await fetch(url);
  const utxos = await res.json();

  const received = utxos.reduce(
    (sum, utxo) => sum + utxo.value,
    0
  ) / 100000000;

  return received >= expectedAmount;
}
