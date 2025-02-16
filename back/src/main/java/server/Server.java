package server;
import java.util.ArrayList;
import java.util.List;

import main.java.server.ScrapeHandler;
import spark.Spark;
import static spark.Spark.after;

/**
 * Create an Apache spark server
 */
public class Server {

    public static void main(String[] args) {
        Spark.port(3333);

        after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

        Spark.get("getInfoFromID", new ScrapeHandler(request.params(":id")));
        Spark.init();
        Spark.awaitInitialization();
        System.out.println("Server started.");
    }
    
}
