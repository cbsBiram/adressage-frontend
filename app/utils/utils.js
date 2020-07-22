import { letters } from "./letters"

const getHouseNumber = (boundingBoxPoint, boundingBoxRoad) => {
    const latStep = 0.0001;
    const longStep = 0.0002;
    const unitOfChange = 2000;

    let code;
    let housePosition = 0;
    let [latMin, latMax, longMin, longMax] = boundingBoxRoad.map(Number);

    for (var i = latMin; i <= latMax; i += latStep) {

        if (i >= boundingBoxPoint[1])
            break;
        else {
            for (var y = longMin; y <= longMax; y += longStep) {
                housePosition += 1;

                if (y >= boundingBoxPoint[3])
                    break;
            }
        }
    }

    if (housePosition < unitOfChange) code = housePosition + "A";
    else {
        for (var key in letters) {
            if (housePosition < letters[key] * unitOfChange) {
                var numericPart = housePosition - (((letters[key] - 1) * unitOfChange) - 1);
                code = numericPart + key
                break;
            }
        }
    }
    if (code === undefined) code = "1A"
    return code;
}


const formatCode = (str) => {
    let newCode;

    if (str.split(" ").length !== 1 || str.split("-").length !== 1) {
        if (str.search(" ") !== -1) {
            var res = str.split(" ")
            var charTab = res.map(item => item.charAt(0))
            newCode = charTab.join("")
        }
        if (str.search("-") !== -1) {
            var res = str.split("-")
            var charTab = res.map(item => item.trim().charAt(0))
            newCode = charTab.join("")
        }
    } else {
        newCode = str.substring(0, 3);
    }

    return newCode.toUpperCase();
}


const formatAddress = (addressDetails) => {
    let {
        country,
        state: region,
        region: region2,
        county,
        city,
        locality,
        town,
        suburb,
        road,
        street,
        district,
        hamlet,
        village
    } = addressDetails;

    if (!region) {
        if (region2) region = region2
        else {
            region = city;
        }
    }

    if (!city) {
        if (county) city = county;
        else if (town) city = town;
        else if (locality) city = locality;
        else city = village
    }

    if (!suburb) {
        if (road) suburb = road;
        else if (!road && street) suburb = street;
        else suburb = district;
    };

    if (!road) {
        if (street) road = street;
        else if (!street && district) road = district
        else if (!district && suburb) road = suburb
        else road = hamlet
    }

    return {
        country,
        region,
        city,
        road
    }
}


const Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
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
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
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
        output = Base64._utf8_decode(output);
        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
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
    },
    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
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

export default {
    getHouseNumber,
    formatCode,
    formatAddress,
    Base64
};