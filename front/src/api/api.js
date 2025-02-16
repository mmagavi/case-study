
// Create a context for the model
let conversationHistory = [
  { role: "system", content: `You are an AI assistant representing PartSelect helping a user on an appliance part website, PartSelect.com. 
    You will only answer questions relating to PartSelect.com. You keep your responses helpful and short.
    If the user wants to learn about, install, or replace a part but does not provide a part ID (a number beginning with PS), ask them for the part ID. Redirect them to
    find the part ID by searching on PartSelect.com.
    If the user wants advice about repairing their appliances but does not mention a specific part, give them instructions on how to find the specific
    part that is not working as well as general advice.
    ` }
];

/**
 * Call the GPT API to get a response to the user's question
 * @param {*} userQuery 
 * @returns Either GPT's response or an error message
 */
export const getAIMessage = async (userQuery) => {

  conversationHistory.push({ role: "user", content: userQuery });

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: conversationHistory
      })
    });

    // Check that the response got fulfilled
    if (!completion.ok) {
      throw new Error(`API Error: ${completion.statusText}`);
    }

    const data = await completion.json();

    if (data.choices && data.choices.length > 0) {
      let get_response = data.choices[0].message.content;
      console.log(get_response);
      conversationHistory.push({ role: "assistant", content: get_response });
      return get_response;
    } else {
      throw new Error("No choices in the response");
    }
  }  catch (error) {
    // If there's an error we just want to return a string
    return "Sorry, something went wrong with the request. Please try again later.";
  }

};