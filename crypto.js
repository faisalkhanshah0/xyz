var crypto = require('crypto');    
    
    var cipher = crypto.createCipher('aes-256-ecb', 'abc');
    var mystr = cipher.update(mypass, 'utf8', 'hex') + cipher.final('hex');
    
    console.log(mystr);
    // res.json({docs : mystr});
    // docs.mypass = mypass;

    var cipher1 = crypto.createDecipher('aes-256-ecb', 'abc');
    var newvar = cipher1.update(mystr, 'hex', 'utf8') + cipher1.final('utf8');
