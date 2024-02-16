import { RSI } from 'technicalindicators';
import KlinesJson from './data/klines.js'
import saveFile from './services/saveFiles.js';
let val = []

KlinesJson.forEach(candlestick => {
  val.push(candlestick[4])  
})

var inputRSI = {
  values : val,
  period : 16
};

let rsiResult = RSI.calculate(inputRSI);

saveFile("rsi.txt", rsiResult)

console.log(rsiResult)