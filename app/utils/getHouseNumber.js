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

    if (housePosition >= 1000 && housePosition < 2000)
        code = (housePosition - 999) + "B";
    else if (housePosition >= 2000) code = (housePosition - 1999) + "C";
    else code = housePosition + "A";

    return code;
}

export default getHouseNumber;