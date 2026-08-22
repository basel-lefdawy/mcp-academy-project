# Example Conversations

## Conversation A — Searching Notes

### User
> Do I have anything in my notes about MCP?

### Expected tool call
- Tool: `search_notes`
- Arguments:
  - `query`: "MCP"
  - `limit`: 5

### Good final answer
> I found a few notes related to MCP, including the one about the Model Context Protocol. It looks like your notes mention AI tools and how models connect to external systems.

## Conversation B — Listing Categories

### User
> What categories are already in my notes?

### Expected tool call
- Tool: `list_categories`
- Arguments: none

### Good final answer
> You currently have notes in several categories, including AI, Operating Systems, React, Development, Databases, Algorithms, Networks, and Security.

## Conversation C — Adding a Note and Listing the Result

### User
> Add a note about the Model Context Protocol in the AI category, and then show me the AI notes.

### Expected tool call
1. Tool: `add_note`
   - Arguments:
     - `title`: "Model Context Protocol"
     - `content`: "MCP allows AI models to interact with external tools and access local data safely."
     - `category`: "AI"
2. Tool: `list_notes`
   - Arguments:
     - `category`: "AI"

### Good final answer
> I added your new note about the Model Context Protocol in the AI category. You can now see it alongside your other AI notes, including the note about MCP and related AI tooling.
