import server.Server;

/**
 * Main
 * 
 * Runs spark server from Server.java
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("Starting the server...");

        Server server = new Server();
        server.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down the server...");
            server.stop();
        }));

        System.out.println("Server is running.");
    }
}

