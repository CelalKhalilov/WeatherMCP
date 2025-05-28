import { FastMCP } from "fastmcp";
import { weatherTool } from './tools/weather.js';
// Create a new FastMCP server instance for Smithery.ai
const server = new FastMCP({
    name: "OpenWeather MCP Server",
    version: "1.0.0",
    instructions: "Bu MCP server OpenWeatherMap API kullanarak hava durumu bilgileri sağlar. Latitude ve longitude koordinatları ile detaylı hava durumu verilerini alabilirsiniz."
});
// Add the weather tool to the server
server.addTool(weatherTool);
// Error handling for production
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
// Start the server with stdio transport for Smithery.ai
server.start({
    transportType: "stdio",
});
console.error("🌤️ OpenWeather MCP Server running on stdio for Smithery.ai");
//# sourceMappingURL=index.js.map