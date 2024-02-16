import saveFile from './saveFiles.js';


const saveHtml = (data) => {
    let str = `<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Klines Visualization</title>
        <script src='https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'></script>
    </head>
    <body>
        <canvas id='chartContainer' style='width: 800px; height: 400px;'></canvas>
        <canvas id='chartContainer2' style='width: 800px; height: 400px;'></canvas>
        <script>
            const klinesData = ${JSON.stringify(data[0])};
    
    let lines = ${JSON.stringify(data[1])};
    
    
    let lines2 = ${JSON.stringify(data[2])};
            function parseTimestamp(timestamp) {
               
                return new Date(timestamp).toLocaleDateString();
            }
    
           
            const timestamps = klinesData.map(kline => parseTimestamp(kline[6]));
            const closingPrices = klinesData.map(kline => kline[4] * 1);
    
            const config = {
                type: 'line', 
                data: {
                    labels: timestamps,
                    datasets: [
          {
            label: 'closingPrices',
            data: closingPrices,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Chart 2 Data',
            data: lines,
            backgroundColor: 'rgba(54, 162, 235, 1)', 
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 0,
            radius: 4
          },
          
          {
            label: 'Chart 2 Data',
            data: lines2,
            backgroundColor: 'red', 
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 0,
            radius: 4
          }
        ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true 
                            }
                        }]
                    }
                }
            };
    
            const ctx = document.getElementById('chartContainer').getContext('2d');
            const chart = new Chart(ctx, config);
            
         
        </script>
    </body>
    </html>
    `;
    saveFile('index.html', str.replace(/[\r\n]+/g, '').replace(/\"/g, ""))
}

export default saveHtml;