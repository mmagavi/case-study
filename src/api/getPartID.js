/**
 * Either get the part ID from a string or return null
 * @param {*} str 
 * @returns a string representing the part ID, or null
 */
export function getPartID(str) {
    const regex = /PS\d+/;

    if (regex.test(str)) {
        const match = str.match(regex);

        console.log("Got part ID: ")
        console.log(match[0])

        return match[0]
    } else {
        return null
    }
}