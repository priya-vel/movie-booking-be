const crypto = require('crypto');

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL

const encrypt = (key, text) => {
    const cipher = crypto.createCipher(algorithm, key);
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted
}
const decrypt = (key, hash) => {
    const decipher = crypto.createDecipher(algorithm, key);
    const decrypted = decipher.update(hash, 'hex', 'utf8') + decipher.final('utf8');    
    return decrypted
}
module.exports = {
    encrypt,
    decrypt
}
