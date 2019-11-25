function Base64() {

    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding  
    this.decode = function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {
        let string = "";
        let i = 0;
        let c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
let key = 'AuIgNymwLSiWhjMZ'
let word = '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'
/**
* 加密
* @param word
* @returns {*}
*/
function encrypt(word, keyM) {
    let key = CryptoJS.enc.Utf8.parse(keyM);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
function decrypt(word, keyM) {
    let key = CryptoJS.enc.Utf8.parse(keyM);
    let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}