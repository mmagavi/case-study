// Get part info from PartSelect?

export async function scrape(url) {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        const html = await response.text();  // Get the raw HTML
        console.log(html)
        return html
    } catch (error) {
        return null;
    }
}

