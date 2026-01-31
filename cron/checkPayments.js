import { checkBTC } from '../services/btc.js';
import { checkETH } from '../services/eth.js';
import { checkUSDT } from '../services/usdt.js';
import { checkTON } from '../services/ton.js';
import { sendTelegram } from '../services/telegram.js';

(async () => {
  console.log('🔍 Checking payments...');

  const results = [];

  if (await checkBTC(process.env.BTC_ADDRESS, 0.001)) {
    results.push('✅ BTC payment received');
  }

  if (await checkETH(process.env.ETH_ADDRESS, 0.01)) {
    results.push('✅ ETH payment received');
  }

  if (await checkUSDT(process.env.USDT_ADDRESS, 10)) {
    results.push('✅ USDT payment received');
  }

  if (await checkTON(process.env.TON_ADDRESS, 5)) {
    results.push('✅ TON payment received');
  }

  if (results.length) {
    await sendTelegram(results.join('\n'));
  } else {
    console.log('No payments yet');
  }
})();
