package main.java.server;

import server.FetchContent;

public class ScrapeHandler {
    
    /**
     * Scrape content from the doc returned by fetch content
     * @param ID
     */
    public String handle(String ID) {
        try {
            Document doc;
            doc = FetchContent(ID);

            String htmlString = doc.toString();
            System.out.println(doc);

            return htmlString;

        } catch (Exception e) {
            e.printStackTrace();
            throw ScrapeFailException("Scraping Failed");
        }
    }
}
