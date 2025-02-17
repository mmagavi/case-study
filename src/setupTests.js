// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * BASIC TESTING FOR FRONTEND ELEMENTS ARE RENDERED PROPERLY, BUTTONS WORK
 */
// render elements and verify they show up!
test("test that elements render properly", async() => {
    render(<App />);

    // Check that the header is rendered
    const header = screen.getByText("PartSelect");
    expect(header).toBeInTheDocument();

    // Check that the menu is rendered
    const menu = screen.getByText("Find by Brand ▼");
    expect(menu).toBeInTheDocument();

    // Check that the chat window is rendered
    const chatWindow = screen.getByText("Chat with Assistant");
    expect(chatWindow).toBeInTheDocument();

    // Check the input is there
    const input = screen.getByPlaceholderText("Type a message...");
    const button = screen.getByText("Send");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // Check that the user can type a message
    userEvent.type(input, "Hello, world!");
    expect(input).toHaveValue("Hello, world!");

    // Check that message is rendered in the message window
    userEvent.click(button);
    const message = screen.getByText("Hello, world!");
    expect(message).toBeInTheDocument();

    // Check that initial message is rendered from the agent
    const agentMessage = screen.getByText("Hello, how can I help you today?");
    expect(agentMessage).toBeInTheDocument();

})