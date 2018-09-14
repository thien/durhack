const sharp = require('sharp');
const path = require('path')

const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

function checkFinished(data){
    var finished = false;
    var counter = 0;
        for (var i in data){
            if (Object.keys(data[i]).includes("buffer")){
                counter++;
            }
        }
        if (counter == data.length){
            finished = true;
        }
    return finished;
}

module.exports.processJSON = function(data){
    var dumps = []
    var counter = 0;
    for (var i in data){
        console.log("processing", data[i].name)
        // load those images and get them into sharp.
        var photoPath = path.join(__dirname,data[i].mugshot);
        // process them to be of square shape.
        var processed = sharp(photoPath)
        .resize(200, 200)
        .overlayWith(roundedCorners, { cutout: true })
        .png().toBuffer()
        .then( buf => buf.toString('base64'))
        .then(function(sixtyfour){dumps.push([dumps[data[i].name], sixtyfour])})
        .then(console.log("finished processing", data[i].name))
        .then(counter++)
    }
    
    var finished = false;
    while (!finished){
        
        if (counter == data.length){
            finished = true;
            return dumps;
        } else {
            console.log(counter,data.length)
        }
    }
}