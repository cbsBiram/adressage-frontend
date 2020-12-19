import { letters } from "./letters"

const getHouseNumber = (boundingBoxPoint, boundingBoxRoad) => {
    // console.log('BBR', boundingBoxRoad)
    const latStep = 0.0001;
    const longStep = 0.0002;
    const unitOfChange = 5000;

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
    if (str.search("\\(") !== -1) {
        str = str.split("(")
        str = str[0].replace("(", "")
    }

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


export default {
    getHouseNumber,
    formatCode,
    formatAddress,
};