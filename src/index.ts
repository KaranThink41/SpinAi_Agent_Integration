import express from "express";
import dotenv from "dotenv";
import { createAgent, createActionsFromMcpConfig } from "spinai";
import { openai } from "@ai-sdk/openai";
import mcpConfig from "../mcp-config";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function setupAgent() {
  try {
    // Create actions from the MCP configuration.
    const hubspotActions = await createActionsFromMcpConfig({
      config: mcpConfig,
      envMapping: {
        // Map your environment variables so that your MCP server can authenticate.
        HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
        SHARED_CONTACT_ID: process.env.SHARED_CONTACT_ID,
      },
    });

    // Create the SpinAI agent with the HubSpot MCP actions.
    const agent = createAgent({
      instructions: `You are a HubSpot assistant that can create, retrieve, update, and delete summary notes in HubSpot.
Available tools:
  • create_shared_summary: Accepts title, summary, and author.
  • get_summaries: Retrieves notes using optional filters (date, dayOfWeek, limit, timeRange).
  • update_shared_summary: Updates a note by Engagement ID or search query.
  • delete_shared_summary: Deletes a note by Engagement ID or filters.`,
      actions: [...hubspotActions],
      model: openai("gpt-4o"),
    });

    return agent;
  } catch (error) {
    console.error("Error setting up the HubSpot agent:", error);
    throw error;
  }
}

// Initialize the agent and start the Express server.
setupAgent()
  .then((agent) => {
    // Implement a simple keep-alive mechanism.
    // This example sends a "ping" message every 30 seconds.
    // Adjust based on the actual methods available from the SpinAI SDK.
    const keepAliveInterval = setInterval(() => {
      try {
        if (agent && typeof (agent as any).send === "function") {
          // This is a generic ping; check your SDK documentation if a dedicated method exists.
          (agent as any).send({ type: "ping" });
        }
      } catch (err) {
        console.error("Error sending keep-alive ping:", err);
      }
    }, 30000); // 30 seconds interval

    // Clear the interval on process shutdown.
    process.on("SIGINT", () => {
      clearInterval(keepAliveInterval);
      process.exit(0);
    });

    // Endpoint to send prompts to the SpinAI agent.
    app.post("/prompt", async (req, res) => {
      try {
        const { input } = req.body;
        // The agent processes the input and invokes the correct MCP tool.
        const response = await agent({ input });
        res.json({ response });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });

    // Simple test endpoint to check that the server is running.
    app.get("/test", (req, res) => {
      res.send("SpinAI HubSpot agent is running!");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to set up the agent:", error);
  });
