import { letters } from "./letters"

const getHouseNumber = (boundingBoxPoint, boundingBoxRoad) => {
    const step = 0.001

    let code;
    let housePosition = 0;
    let [latMin, latMax, longMin, longMax] = boundingBoxRoad.map(Number);

    for (var i = latMin; i <= latMax; i += step) {

        if (i >= boundingBoxPoint[1])
            break;
        else {
            for (var y = longMin; y <= longMax; y += step) {
                housePosition += 1;
                if (y >= boundingBoxPoint[3])
                    break;
            }
        }
    }

    if (housePosition < 1000) code = housePosition + "A";
    else {
        for (var key in letters) {
            if (housePosition < letters[key] * 1000) {
                var numericPart = housePosition - (((letters[key] - 1) * 1000) - 1);
                code = numericPart + key
                break;
            }
        }
    }

    return code;
}

export default getHouseNumber;