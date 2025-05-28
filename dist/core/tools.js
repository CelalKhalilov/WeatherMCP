import { z } from "zod";
import * as services from "./services/index.js";
import { weatherTool } from "../tools/weather.js";
/**
 * Register all tools with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerTools(server) {
    // Greeting tool
    server.addTool({
        name: "hello_world",
        description: "A simple hello world tool",
        parameters: z.object({
            name: z.string().describe("Name to greet")
        }),
        execute: async (params) => {
            const greeting = services.GreetingService.generateGreeting(params.name);
            return greeting;
        }
    });
    // Farewell tool
    server.addTool({
        name: "goodbye",
        description: "A simple goodbye tool",
        parameters: z.object({
            name: z.string().describe("Name to bid farewell to")
        }),
        execute: async (params) => {
            const farewell = services.GreetingService.generateFarewell(params.name);
            return farewell;
        }
    });
    // Weather tool
    server.addTool(weatherTool);
}
//# sourceMappingURL=tools.js.map