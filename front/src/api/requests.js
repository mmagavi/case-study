
/**
 * Make a request to a url via fetch, await for it, then grab the json if it's there
 * and put it in a nice map!
 * @param {string} url - URL to make request to
 * @returns {Promise<Map<string, string|object>>} A promise resolving to a Map containing 1 key SUCCESS or ERROR, with 
 * details for each as the value
 */

async function makeRequest(url) {
    // Simple GET request using fetch
    // make empty map for responseMap
    var responseMap = new Map();
    try {
        console.log(`requesting ${url}`);
        // fetch and wait
        const response = await fetch(url);
        try {
            // fetch worked! let's grab json!
            const data = await response.json();
            responseMap.set("SUCCESS", data);
        } catch (error) {
            // couldn't json!
            responseMap.set("ERROR", `didn't receive JSON, error = ${error}`);
        }
    } catch (error) {
        // if fetch failed, we failed to make request!
        responseMap.set("ERROR", `failed to request from "${url}", error = "${error}"`);
    }
    // resolve to responseMap
    return new Promise((resolve) => resolve(responseMap));
}

/**
 * checkResponse checks our server's response
 * @param {Map<string, string|object>} response - The response we get from makeRequest()
 * @returns {Promise<string | Map<string, string>>} Either a string indicating failure or a Map representing the JSON response
 */
async function checkResponse(response) {
    return new Promise((resolve) => {
        if (response.has("ERROR")) {
            // check for errors!
            resolve(`${response.get("ERROR")}`);
        } else if (response.has("SUCCESS")) {
            // check for success!
            const response_success = response.get("SUCCESS");
            if (typeof response_success === "Document") {
                // type is document! what we want :)
                // turn it into dict and look for result!

                // turn document into dict
                const resultMap = response_success;
                resolve(resultMap);
            } else {
                // type is not object! :(
                resolve(`response was SUCCESS but value was not object: ${response.get("SUCCESS")}`);                    
            }
        }
    });
}

export { makeRequest, checkResponse};