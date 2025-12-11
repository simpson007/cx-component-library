const KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function utf8Decode(input) {
    const normalized = input.replace(/rn/g, 'n');
    let result = '';
    for (let i = 0; i < normalized.length; i++) {
        const charCode = normalized.charCodeAt(i);
        if (charCode < 128) {
            result += String.fromCharCode(charCode);
        }
        else if (charCode > 127 && charCode < 2048) {
            result += String.fromCharCode((charCode >> 6) | 192);
            result += String.fromCharCode((charCode & 63) | 128);
        }
        else {
            result += String.fromCharCode((charCode >> 12) | 224);
            result += String.fromCharCode(((charCode >> 6) & 63) | 128);
            result += String.fromCharCode((charCode & 63) | 128);
        }
    }
    return result;
}
export function decode(input) {
    let result = '';
    let i = 0;
    const sanitized = input.replace(/[^A-Za-z0-9+/=]/g, '');
    while (i < sanitized.length) {
        const enc1 = KEY_STR.indexOf(sanitized.charAt(i++));
        const enc2 = KEY_STR.indexOf(sanitized.charAt(i++));
        const enc3 = KEY_STR.indexOf(sanitized.charAt(i++));
        const enc4 = KEY_STR.indexOf(sanitized.charAt(i++));
        const chr1 = (enc1 << 2) | (enc2 >> 4);
        const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        const chr3 = ((enc3 & 3) << 6) | enc4;
        result += String.fromCharCode(chr1);
        if (enc3 !== 64)
            result += String.fromCharCode(chr2);
        if (enc4 !== 64)
            result += String.fromCharCode(chr3);
    }
    return utf8Decode(result);
}
export function generateRandomCode(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
//# sourceMappingURL=base64.js.map