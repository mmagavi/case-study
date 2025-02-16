import { server } from "./App";

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
        console.log(`requesting ${server + url}`);
        // fetch and wait
        const response = await fetch(server + url);
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
        responseMap.set("ERROR", `failed to request from "${server + url}", error = "${error}"`);
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
                const resultMap = jsonObjectToMap(response_success);
                resolve(resultMap);
            } else {
                // type is not object! :(
                resolve(`response was SUCCESS but value was not object: ${response.get("SUCCESS")}`);                    
            }
        }
    });
}

/**
 * Function to turn our JSON objects to string maps!
 * @param {Object} object
 * @returns {Map<string, string>} A Map containing the object's key-value pairs as strings
 */
function jsonObjectToMap(object) {
    // grab keys and values and make a dict!
    const resultMap = new Map();
    Object.entries(object).forEach(([key, value]) => {
        resultMap.set(key, String(value));
    });
    return resultMap;
}

/**
 * Ping the server and check if we get a code!
 * @param {Function} setStatus - Function to set status after pinging
 */
function ping(setStatus) {
    // fetch no endpoint on server
    fetch(server)
        .then(
            // if we successfully get a response, we are online!
            () => setStatus("Online :)"),
            // if we fail to connect, we are offline!
            (failure) => { console.log(`ERROR: failed to ping ${server}`); setStatus("Offline :("); }
        );
}

export { makeRequest, ping, checkResponse, jsonObjectToMap };