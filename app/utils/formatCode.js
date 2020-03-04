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

export default formatCode;