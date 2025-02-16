package server;

import java.io.IOException;
import java.net.URL;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import exceptions;

/**
   * Makes a fetch request to ParkSelect.com using the input String url
   *
   * @param Part - Part ID we are getting content for
   * @param <T> return type
   * @return a response of type T
   * @throws IOException if we fail to connect & read page
   */
public class FetchContent {
    public static <T> T getContent(String partID) throws IOException {

        // Build url for the partID we are looking for
        String url;
        url = "https://www.partselect.com/" + partID + "-.htm";

        try {

            Document part_page = Jsoup.connect(url).get();

            // Try getting the title for the page
            String title = part_page.title();
            System.out.println("Title: " + title);

            return part_page;

        } catch (Exception e) {
            e.printStackTrace();
            throw FetchFailException("Fetch content from ParkSelect.com failed");
        }

    }
}
