/**
 * Get part information by visitng partSelect page for that id
 * 
 * @param {*} part_id 
 * @returns 
 */
export async function getPartInfo(part_id) {
    // Return part information from my locally hosted server.

    // URL to query
    const url = "https%3A%2F%2Fwww.partselect.com%2F" + part_id + "-.htm";

    try {

        let page_content = null;

        // Call scraper API to get the page content
        await fetch(`https://api.scraperapi.com?api_key=${process.env.REACT_APP_SCRAPER_API_KEY}&url=${url}&output_format=json&autoparse=true&render=true`)
            .then(response => {
                console.log(response);
                page_content = response;
            })
            .catch(error => {
                console.log(error);
            });

        // Get the text from the response body and convert it into a String
        const reader = page_content.body.getReader();
        const decoder = new TextDecoder();

        let done = false;
        let text = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            text += decoder.decode(value, { stream: true });
            done = doneReading;
        }

        // Return the text from the part page
        return text;

    } catch (error) {
        console.log("Could not get part info: " + error);
        return null;
    }
}