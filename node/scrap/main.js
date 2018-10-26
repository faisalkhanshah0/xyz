console.time('time');
const fs = require('fs');
var Xray = require('x-ray');
var x = Xray();
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('data.txt');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
    x(line, 'html@html')(function(err, html) {
        let arr = line.split('/');
        let filename = `secret/html-${arr[arr.length-1]}.txt`;
        fs.writeFileSync(filename, '<!DOCTYPE html><html>'+html+'</html>');
        console.log('just one');
        // console.log(html);
        console.timeEnd('time');
        if(arr[arr.length-1] == '4934857'){
            console.log('final last entry');
            console.timeEnd('time');
            console.log('stopped now');
            if(html !=''){
                console.timeEnd('time');
                console.log('htmlalsothere');
            }
            process.exit();

        }

         //process.exit();

    })

	
});

lr.on('end', function () {
    console.log('done');
    // All lines are read, file is closed now.
    console.timeEnd('time');
    
});