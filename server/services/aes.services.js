var crypto = require('crypto');


var PKCS7Encoder = {};

PKCS7Encoder.decode = function(text) {
    var pad = text[text.length - 1];

    if (pad < 1 || pad > 16) {
        pad = 0;
    }

    return text.slice(0, text.length - pad);
};

PKCS7Encoder.encode = function(text) {
    var blockSize = 16;
    var textLength = text.length;

    var amountToPad = blockSize - (textLength % blockSize);

    var result = new Buffer(amountToPad);
    result.fill(amountToPad);

    return Buffer.concat([text, result]);
};


async function encrypt(text, key) {

    var encoded = PKCS7Encoder.encode(new Buffer(text));

    key = crypto.createHash('sha256').update(key).digest();

    var iv = new Buffer(16);
    iv.fill(0);
 
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(false);
    var cipheredMsg = Buffer.concat([cipher.update(encoded), cipher.final()]);

    return cipheredMsg.toString('base64');
};


async function decrypt(text, key) {

    key = crypto.createHash('sha256').update(key).digest();

    var iv = new Buffer(16);
    iv.fill(0);

    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false);
    var deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()]);
    deciphered = PKCS7Encoder.decode(deciphered);

    return deciphered.toString();
};

module.exports = {
    encrypt,
    decrypt,
}