// © 2018 R.S. 
//
//const maxspace = 241591910400 // 225 GB per cam
const maxspace = 144955146240 // 135 GB per cam
const minspace = 1073741824; // 1 GB
const fs = require("fs");

let recordPath = "/records";
process.title = "IPCAMStorageWatch";
let timer = setInterval(mainLoop, 10000);

function mainLoop() {

    let recordedSize = [];
    let filebase = [];
    let files = fs.readdirSync(recordPath);

    files.forEach(file => {
        let newfile = {};
        let size = fs.statSync(recordPath + '/' + file).size;
        let campool = file.split('_')[0];
        newfile.name = file;
        newfile.size = size;
        if (filebase[campool]) {
            filebase[campool].push(newfile);
        } else {
            filebase[campool] = [];
            filebase[campool].push(newfile);
        }
        if (recordedSize[campool]) {
            recordedSize[campool] += size;
        } else {
            recordedSize[campool] = size;
        }
    })

    Object.keys(filebase).forEach(naam => {
        if (maxspace - recordedSize[naam] < 0) {
            let free = recordedSize[naam] - maxspace;
            filebase[naam].forEach(file => {
                free -= file.size;
                if (free > 0) {
                    fs.unlinkSync(recordPath + "/" + file.name);
                }
            })
        }
    });
}
