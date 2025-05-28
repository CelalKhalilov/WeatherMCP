import { FastMCP } from "fastmcp";
import { weatherTool } from './tools/weather.js';

// Create a new FastMCP server instance
const server = new FastMCP({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Add the weather tool to the server
server.addTool(weatherTool);

// Start the server
server.start({
  transportType: "stdio",
});

console.error("MCP Server running on stdio");
