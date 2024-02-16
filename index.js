import {doji} from 'technicalindicators';
import fetchData from './services/GetRequest.js';
import saveFile from './services/saveFiles.js';
import KlinesJson from './data/klines.js';

let lib = "doji";
let Daylen = 1;

// let klines = await fetchData("https://api.binance.com/api/v3/klines?symbol=MATICUSDT&interval=1d")
let klines = KlinesJson
let newLines = []
var threeDayInput = {
    open: [],
    high: [],
    close: [],
    low: []
}

klines.forEach(candlestick => {
    const [timestamp, open, high, low, close, volume, endTimestamp, quoteVolume, trades, takerBuyBaseVolume, takerBuyQuoteVolume, ignore] = candlestick;
    threeDayInput.open.push(open);
    threeDayInput.high.push(high);
    threeDayInput.low.push(low);
    threeDayInput.close.push(close);
    
    if( threeDayInput.open.length === Daylen){
        if(setAbadoned()){
            newLines.push(close)
        }else{
            newLines.push(0.78)
        }
    }else {
        newLines.push(0.78)
    }
});

function setAbadoned() {
    var result = eval(lib + '(threeDayInput)');
    threeDayInput.open = []
    threeDayInput.low = []
    threeDayInput.high = []
    threeDayInput.close = []
    
    return result
}


console.log(newLines)

saveFile(lib + ".txt", newLines)