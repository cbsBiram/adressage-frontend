import { letters } from "./letters"

const getHouseNumber = (boundingBoxPoint, boundingBoxRoad) => {
    const latStep = 0.0004;
    const longStep = 0.0005;
    const unitOfChange = 1000;

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

    return code;
}

export default getHouseNumber;