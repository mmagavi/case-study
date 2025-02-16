/**
 * Either get the part ID from a string or return null
 * @param {*} str 
 * @returns a string representing the part ID, or null
 */
export function getPartID(str) {
    const regex = /PS\d+/;

    if (regex.test(str)) {
        const match = str.match(regex);
        return match[0]
    } else {
        return null
    }
}

