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
    }
    firstPart = positionLat;

    for (var i in _.range(boundingBoxRoad[2], boundingBoxRoad[3], stepLong)) {
        positionLong += 1;
        if (i >= boundingBoxPoint[3])
            break;
    }

    if (positionLong >= 100) {
        lastPart = (positionLong - 99) + "b";
    } else lastPart = positionLong + "a";

    code = firstPart + lastPart;
    return code;
}

export default getHouseNumber;