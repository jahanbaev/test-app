import fs from 'fs';
import { dirname } from 'path';

const saveFile = (fileName, newLines) => {
    
    fs.open(process.cwd() + '/files/' + fileName, 'w', function (err, file) {
        if (err) throw err;
        fs.writeFile(process.cwd() +'/files/' + fileName, JSON.stringify(newLines), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }); 
}



 export default saveFile;