import { letters } from "./letters"

const getHouseNumber = (boundingBoxPoint) => {
    return "1A";
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
    let country = addressDetails.context[addressDetails.context.length -1].text;
    let region = addressDetails.context[addressDetails.context.length -2].text;
    let city = addressDetails.text;

    return {
        country,
        region,
        city
    }
}


export default {
    getHouseNumber,
    formatCode,
    formatAddress,
};
