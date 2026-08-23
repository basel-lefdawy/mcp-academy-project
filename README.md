# Notes & FAQ Search MCP

This project is a local Model Context Protocol (MCP) server for storing, searching, and organizing notes and FAQs. It lets an AI client or MCP-compatible tool call locally available functions such as searching notes, listing categories, and adding a new note without any cloud dependency.

The server reads and writes data from the local `data/notes.json` file, so everything stays offline and private.

## Requirements

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- Git
- A terminal or shell

## Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/basel-lefdawy/mcp-academy-project
cd mcp-academy-project
npm install
```

## Run

Start the MCP server locally:

```bash
npm run dev
```

This starts the server on stdio, which is how MCP clients connect to it.

## Run with the MCP Inspector

The easiest way to test the server manually is with the MCP Inspector.

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

This launches the Inspector UI directly. Once the page opens:

1. Click the `Connect` button
2. The Inspector connects to the local server
3. The Tools section appears with the available MCP tools
4. You can test the tools from there

If the Inspector does not connect, check the troubleshooting section below.

## Tools

| Tool | Status | Description |
| --- | --- | --- |
| `search_notes` | Implemented | Search notes and FAQs by keyword or phrase. |
| `add_note` | Implemented | Add a new note or FAQ entry with a title, content, and optional category. |
| `list_notes` | Implemented | List notes, optionally filtered by category. |
| `list_categories` | Implemented | List all categories currently in the local notes store. |
| `update_note` | Implemented | Update one or more fields on an existing note. |
| `delete_note` | Implemented | Delete an existing note by its identifier. |

See also: [Example conversations](examples/conversations.md)

## Example prompts

These are example requests an AI assistant or MCP client might send to the server:

```text
Search for notes related to MCP.
```

```text
Add a note titled "Project Kickoff" with content "We will confirm the sprint plan and owners" in the Planning category.
```

```text
List all notes in the AI category.
```

```text
Show me the available note categories.
```

## Troubleshooting

### 1) `npm install` fails

This is usually caused by an unsupported Node version.

Fix:

```bash
node -v
```

If the version is below 18, upgrade Node.js and retry:

```bash
npm install
```

### 2) The Inspector cannot connect to the server

This usually means the Inspector is not configured to launch the app correctly.

Check:

- transport is set to `stdio`
- command is `npm`
- arguments are `run dev`
- the project folder is the repo root

If needed, restart the Inspector and reconnect.

### 3) The tool fails because the notes file is empty or invalid

The server expects `data/notes.json` to contain a valid JSON array of notes.

Check:

```bash
cat data/notes.json
```

If the file is empty, malformed, or missing, restore a valid array before retrying.

## 📖 Academy
[](https://github.com/basel-lefdawy/mcp-academy-project#-academy)
This project is being developed as part of the **NextFlows Academy – Building an MCP for an AI Engine** program.

Learn more: [https://nextflows.ai/academy](https://nextflows.ai/academy)

---

## 👨‍💻 Author
[](https://github.com/basel-lefdawy/mcp-academy-project#%E2%80%8D-author)
**Basel Lefdawi**

Computer Science Student
An-Najah National University

---

## 📄 License
[](https://github.com/basel-lefdawy/mcp-academy-project#-license)
This project is intended for educational purposes as part of the NextFlows Academy MCP training program.

See the [LICENSE](LICENSE) file for the full MIT license terms.
