# Six-Week Reflection

## Wins

Over the six weeks, I built and shipped a local MCP server for searching and managing notes and FAQs. I implemented multiple working MCP tools, including `search_notes`, `list_notes`, `list_categories`, and tools for adding, updating, and deleting notes. I also added Zod validation, error handling, security checks, offline fixture data, threat modeling, and documentation. The project is now publicly available on GitHub with a `v1.0.0` ship tag, and I verified that it works from a fresh clone using MCP Inspector.

## Blockers

One of the main challenges was understanding how MCP tools, schemas, and the server communicate with an MCP client. Making the tools work with real fixture data instead of placeholders also required careful testing and debugging. Security was another challenging part, especially validating file paths and preventing path traversal while keeping the tools useful. Finally, verifying the project from a completely fresh clone highlighted issues that were easy to miss when working only inside the original development environment.

## Resume Blurb

Built and shipped a public Model Context Protocol (MCP) server using TypeScript, Zod, and the MCP SDK for searching and managing offline notes and FAQs. Implemented and validated multiple MCP tools with real fixture data, schema validation, error handling, and security controls. Published the project as `v1.0.0` and verified the complete setup from a fresh Git clone using MCP Inspector. The project provides a working local AI-tool integration that can be demonstrated without relying on external APIs or cloud services.

## LinkedIn Draft

Over the past six weeks, I built and shipped my first Model Context Protocol (MCP) server using TypeScript, Zod, and the MCP SDK. The project started as a simple idea and evolved into a working local server with multiple tools, offline fixture data, input validation, error handling, and security protections. I also learned how to test MCP tools using MCP Inspector and verified the final `v1.0.0` release from a fresh clone. This experience gave me a much better understanding of how AI applications can interact with external tools through MCP.

## Post-Cohort Improvement

If I continued working on the project for the next two weeks, I would improve the search functionality by adding better ranking and filtering for notes and FAQs. I would also add more automated tests for the MCP tools and security validations so that future changes can be verified automatically.

## Mentor Appreciation

Thank you to my mentor for the guidance and feedback throughout the six weeks. The reviews and requested improvements helped me look beyond simply making the project work and focus on testing, security, documentation, and making the final result something that can actually be used and demonstrated.
