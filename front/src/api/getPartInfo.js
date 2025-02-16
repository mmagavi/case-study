import { checkResponse } from "./requests";
import { makeRequest } from "./requests";

/**
 * Query my backend for part information
 * 
 * @param {*} part_id 
 * @returns 
 */
export async function getPartInfo(part_id) {
    // Return part information from my locally hosted server.

    // URL to query
    let my_server = "http://localhost:3333/getInfoFromID?";

    let url = my_server + "id=" + part_id;

    let response = await makeRequest(url);

    // Check response
    if (checkResponse(response)) {
        return response;
    } else {
        console.log("Error in Server Response");
        return null;
    }
}