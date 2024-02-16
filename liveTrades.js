import WebSocket from 'ws';
import moment from 'moment'; // Alternatively use built-in Date object

let minSum = 0;
let coinMinHistory = []


function startStream(symbol) {
  const socketUrl = `wss://stream.binance.com:9443/ws/${symbol}@trade`;

  const ws = new WebSocket(socketUrl);

  ws.on('open', () => console.log(`Connected to ${symbol} stream`));

  ws.on('message', (message) => {
    const tradeData = JSON.parse(message);

    // Extract relevant data
    const timestamp = moment.unix(tradeData.E / 1000).format('YYYY-MM-DD HH:mm:ss');
    const price = tradeData.p;
    const quantity = tradeData.q;

    if(tradeData.m){
        minSum += quantity * 1;    
    }else{
        minSum -= quantity * 1;
    }
    
    // // Do something with the data, e.g., store in a database
    // console.log(`SYMBOL: ${symbol}`);
    // console.log(`PRICE: ${price}`);
    // console.log(`QTY: ${quantity}`);
    // console.log(`TIMESTAMP: ${timestamp}`);
    // console.log('-----------------------');
  });
  

  ws.on('error', (error) => console.error('Error:', error));

  ws.on('close', (code, reason) => {
    console.log('Connection closed:', code, reason);
    // Optionally try to reconnect
    startStream(symbol); // Example of reconnection logic
  });
}

// Allow choosing the symbol through command-line arguments
const symbol = "xrpusdt"; // Access second argument

if (!symbol) {
  console.error('Please specify a symbol as an argument!');
  process.exit(1);
}

startStream(symbol);


setInterval(()=> {
    coinMinHistory.push(minSum)
    minSum = 0
    if(coinMinHistory.slice(-2,-1) < 0 && coinMinHistory.slice(-3,-2) < 0 &&coinMinHistory.slice(-1) > 0 ){
        fetch('https://api.telegram.org/bot5920328630:AAF4sQpkbeYnlVTyQOod_dhNWy3hu07gPBI/sendMessage?chat_id=1880721558&text=buy')
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    console.log(data); // Use the fetched data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    }
    console.log(coinMinHistory.slice(-1))
}, 60000)