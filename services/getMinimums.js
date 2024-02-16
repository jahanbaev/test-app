import KlinesJson from "../data/klines.js";
import saveFile from "./saveFiles.js";
import saveHtml from "./saveHtml.js";
let history = [];
let newHistory = []
KlinesJson.forEach((kline)=> {
    history.push({'price':kline[4], 'status': 0})
})

for (let i = 0; i < history.length; i+=3) {
    let lst = history.slice(i,i+3);
    let lstNumbers = lst.map((a)=>a.price )
    let min = Math.min(...lstNumbers);
    let max = Math.max(...lstNumbers);
    
    lst.forEach((e,i)=> {
        if(e.price == min) {
            lst[i].status = -1
        }
        
        if(e.price == max) {
            lst[i].status = 1
        }
    })
    newHistory = newHistory.concat(lst);
}
let lastIndex = 0;
let lastValue = 0;
newHistory.forEach((val, index)=> {
    if(val.status == 1 && lastValue == 1){
        if(newHistory[lastIndex].price * 1 < val.price * 1) {
            newHistory[lastIndex].status = 0
        }else{
            newHistory[index].status = 0
        }
    }
    
    if(val.status == -1 && lastValue == -1){
        if(newHistory[lastIndex].price * 1 > val.price * 1) {
            newHistory[lastIndex].status = 0
        }else{
            newHistory[index].status = 0
        }
    }
    
    if(val.status == 1 && lastValue == -1){
        if(newHistory[lastIndex].price * 1 > val.price * 1) {
            newHistory[lastIndex].status = 0
            newHistory[index].status = 0
        }
    }
    
    if(val.status == -1 && lastValue == 1){
        if(newHistory[lastIndex].price * 1 < val.price * 1) {
            newHistory[lastIndex].status = 0
            newHistory[index].status = 0
        }
    }
    
    if(val.status == 1 && lastValue == -1){
        if((val.price * 1 - newHistory[lastIndex].price * 1)/newHistory[lastIndex].price*100 < 0.5) {
            newHistory[index].status = 0
        }
    }
    
    if(val.status == -1 && lastValue == 1){
        if(( newHistory[lastIndex].price * 1 - val.price * 1)/val.price*100 < 0.5) {
            newHistory[index].status = 0
        }
    }
    
    
    if(val.status !== 0){
        lastIndex = index;
        lastValue = val.status;
    }
    
})

let min = [], max = [];
    
newHistory.forEach((e)=>{
    if(e.status == 0) {
        min.push(0.78)
        max.push(0.78)
    }else if(e.status == -1) {
        min.push(e.price)
        max.push(0.78)
    }else if(e.status == 1) {
        max.push(e.price)
        min.push(0.78)
    }
})

saveFile("maxes.txt", max)
saveFile("mins.txt", min)
saveHtml([KlinesJson, max, min])