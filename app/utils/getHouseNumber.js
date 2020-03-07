import _ from "lodash";

const getHouseNumber = (boundingBoxPoint, boundingBoxRoad) => {
    const stepLat = Number(boundingBoxPoint[1]) - Number(boundingBoxPoint[0])
    const stepLong = Number(boundingBoxPoint[3]) - Number(boundingBoxPoint[2])

    let firstPart;
    let lastPart;
    let positionLat = 0;
    let positionLong = 0;

    for (var i in _.range(boundingBoxRoad[0], boundingBoxRoad[1], stepLat)) {
        positionLat += 1;
        if (i >= boundingBoxPoint[1])
            break;
        else {
            for (var y in _.range(boundingBoxRoad[2], boundingBoxRoad[3], stepLong)) {
                positionLong += 1;
                if (y >= boundingBoxPoint[3])
                    break;
            }
        }
    }

    console.log('Latitude Position:', stepLat);
    console.log('Longitude Position:', stepLong);

    firstPart = positionLat;
    if (positionLong >= 100) {
        lastPart = (positionLong - 99) + "B";
    } else lastPart = positionLong + "A";

    code = firstPart + lastPart;
    return code;
}

export default getHouseNumber;