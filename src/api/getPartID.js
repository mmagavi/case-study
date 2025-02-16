
// Function to either get the part ID from a string if it exists, else return null
export function getPartID(str) {
    const regex = /PS\d+/;

    if (regex.test(str)) {
        const match = str.match(regex);
        return match[0]
    } else {
        return null
    }
}

