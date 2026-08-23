# Demo Day Script — Notes & FAQ Search MCP

## Demo Overview

**Total time:** 5 minutes

**Project:** Notes & FAQ Search MCP

**Author:** Basel Lefdawi

**Goal:** Demonstrate how an AI client such as Claude Desktop can use an MCP server to search, organize, and manage locally stored notes and FAQs.

The server uses local data stored in `data/notes.json`, allowing the core functionality to work without a cloud dependency.

---

# 0:00–0:40 — The Problem

## Slide 1 — Title

**Notes & FAQ Search MCP**

### What to say

> "The problem I wanted to solve is making local notes and FAQs easier to access through an AI assistant.
>
> Normally, notes are stored as files or data that a user has to search manually. With this project, an AI client can interact with the notes through MCP tools using natural-language requests.
>
> The MCP server provides tools for searching, organizing, retrieving, and managing notes, while keeping the data local in `data/notes.json`."

### Key points

* Notes and FAQs can become difficult to search manually.
* Users can interact with their notes using natural language.
* The project exposes note-management functionality through MCP.
* Data remains local and private.
* No cloud dependency is required for the core functionality.

---

# 0:40–1:10 — Architecture

## Slide 2 — Architecture

Show the following architecture:

```text
┌──────────────┐
│     User     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Claude       │
│ Desktop      │
└──────┬───────┘
       │
       │ MCP / stdio
       ▼
┌──────────────────────┐
│ Notes & FAQ Search   │
│ MCP Server           │
│ TypeScript           │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ data/notes.json      │
│ Local Storage        │
└──────────────────────┘
```

### What to say

> "The architecture is simple. The user communicates with Claude Desktop. Claude decides which MCP tool is appropriate for the request and sends the tool call to the local MCP server over stdio.
>
> The server executes the requested operation against the local `data/notes.json` file and returns the result to Claude, which then gives the user a natural-language response."

### Important point

> "Because the core notes data is local, the main functionality does not depend on an external API or cloud database."

---

# 1:10–3:30 — Live Demo

## Slide 3 — Tools

Show the available tools:

| Tool              | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `search_notes`    | Search notes and FAQs by keyword or phrase  |
| `list_notes`      | List notes, optionally filtered by category |
| `list_categories` | List available categories                   |
| `get_note`        | Retrieve a specific note                    |
| `add_note`        | Add a new note                              |
| `update_note`     | Update an existing note                     |
| `delete_note`     | Delete an existing note                     |

### Introduction to the live demo

> "Now I'll show how a user interacts with the server through Claude Desktop. Instead of manually calling the MCP tools, I'll use normal natural-language requests and let Claude decide which tool to use."

---

## Live Prompt 1 — Search Notes

### User prompt

> "Search for notes related to MCP."

### Expected tool

```text
search_notes
```

### What to demonstrate

1. Enter the prompt in Claude Desktop.
2. Let Claude select `search_notes`.
3. Approve the tool call if Claude asks for permission.
4. Show the returned notes.
5. Let Claude provide the final response.

### What to say

> "Here the user isn't asking for all the notes or the available categories. They're specifically looking for notes related to MCP, so Claude uses the `search_notes` tool.
>
> The server searches the local notes data and returns the matching results."

### Expected result

Claude should return notes or FAQs matching the MCP keyword or phrase.

---

## Live Prompt 2 — List Categories

### User prompt

> "Show me the available note categories."

### Expected tool

```text
list_categories
```

### What to demonstrate

1. Enter the prompt.
2. Let Claude select `list_categories`.
3. Approve the tool call.
4. Show the returned categories.
5. Let Claude provide the final answer.

### What to say

> "For this request, the user only wants to know which categories exist. Claude can recognize that this is different from listing the actual notes, so it uses `list_categories`.
>
> The server reads the local data and returns the available categories."

### Important

The goal here is to demonstrate **correct tool selection**.

Claude should use:

```text
list_categories
```

rather than:

```text
list_notes
```

---

## Backup Prompt — Add a Note

If one of the main prompts fails, use this tested backup:

### User prompt

> "Add a note titled 'Project Kickoff' with content 'We will confirm the sprint plan and owners' in the Planning category."

### Expected tool

```text
add_note
```

### What to demonstrate

1. Enter the prompt.
2. Let Claude call `add_note`.
3. Approve the tool call.
4. Show the successful result.
5. Ask Claude to confirm the note was added.

### What to say

> "This demonstrates that the server isn't only able to read data. It can also modify the local notes store through the `add_note` tool."

### Important

Only use this as the backup if the note data is in a safe state for the demonstration.

---

# Live Demo Flow

The core interaction is:

```text
Natural-language request
          ↓
        Claude
          ↓
    Select MCP tool
          ↓
      MCP server
          ↓
   data/notes.json
          ↓
      Tool result
          ↓
        Claude
          ↓
    Natural-language answer
```

### Main point to communicate

> "The important part is that the user doesn't need to know the tool names or the MCP implementation. They simply describe what they want, and Claude selects the appropriate tool."

---

# 3:30–4:30 — What I Would Build Next

## Slide 4 — Next Steps

Show:

* Better search capabilities
* More advanced filtering
* Full-text search
* Improved note organization
* Additional MCP tools
* More sophisticated FAQ support
* Additional local data sources

### What to say

> "The current version provides the core functionality for searching and managing local notes and FAQs. There are several directions I would take it next.
>
> First, I would improve the search capabilities with better full-text search and more advanced filtering.
>
> I would also expand the organization features so users can manage larger collections of notes more easily.
>
> Another direction would be improving the FAQ functionality and adding more specialized tools for working with different types of knowledge.
>
> Finally, I would continue improving the tool descriptions and validation so that an AI model can consistently select the most appropriate tool for each request."

---

# 4:30–5:00 — Closing

## Slide 5 — Summary

### What to say

> "To summarize, this project provides a local MCP server for searching, organizing, and managing notes and FAQs.
>
> It exposes seven tools that an AI client can use through natural-language requests, and the data is stored locally in `data/notes.json`.
>
> The main goal was to build an MCP server that is practical, testable, and usable with a real AI client such as Claude Desktop.
>
> Thank you. I'm ready for questions."

---

# Slide Plan

The presentation should contain **five slides or fewer**.

## Slide 1 — Title

**Notes & FAQ Search MCP**

Subtitle:

> A local MCP server for searching and managing notes and FAQs with AI clients.

Include:

* Basel Lefdawi
* NextFlows Academy
* Model Context Protocol

---

## Slide 2 — Problem & Architecture

Keep the problem explanation short.

### Problem

> "Make local notes and FAQs accessible through natural-language AI interactions while keeping the data local and private."

Then show the architecture:

```text
User
  ↓
Claude Desktop
  ↓
MCP / stdio
  ↓
Notes & FAQ Search MCP
  ↓
data/notes.json
```

---

## Slide 3 — Tools

| Tool              | Purpose               |
| ----------------- | --------------------- |
| `search_notes`    | Search notes and FAQs |
| `list_notes`      | List notes            |
| `list_categories` | List categories       |
| `get_note`        | Retrieve a note       |
| `add_note`        | Add a note            |
| `update_note`     | Update a note         |
| `delete_note`     | Delete a note         |

Do not explain every tool in detail.

The live demo will demonstrate the most important ones.

---

## Slide 4 — Live Demo

Show only:

```text
1. Search notes
2. List categories
3. Backup: Add a note
```

This keeps the audience focused on the actual MCP interaction.

---

## Slide 5 — Next Steps

### Next Steps

* Better search and filtering
* Improved note organization
* Enhanced FAQ capabilities
* Additional tools
* Larger local knowledge collections

---

# Offline Backup Plan

The project is designed to support an offline demonstration.

The notes and FAQ data are stored locally in:

```text
data/notes.json
```

The main demonstration therefore does not require a cloud database or external API.

If Wi-Fi becomes unavailable:

1. Keep Claude Desktop running.
2. Keep the local MCP server running.
3. Use the local notes tools.
4. Demonstrate `search_notes` and `list_categories`.
5. Use the fixture data in `data/notes.json`.

If Claude Desktop itself becomes unavailable, use MCP Inspector as the technical backup.

The Inspector can demonstrate that the MCP server and its tools are still functioning locally.

---

# Demo Day Preparation Checklist

## Project

* [ ] Repository is public.
* [ ] Final code is merged into `main`.
* [ ] `v1.0.0` tag exists.
* [ ] README is complete.
* [ ] LICENSE exists.
* [ ] `.gitignore` is complete.
* [ ] No secrets or API keys are committed.

## Claude Desktop

* [ ] MCP server is connected.
* [ ] `search_notes` works.
* [ ] `list_categories` works.
* [ ] `add_note` works as the backup.
* [ ] Claude selects the correct tools.
* [ ] Claude Desktop has been restarted after configuration changes.

## Demo

* [ ] Prompt 1 tested successfully.
* [ ] Prompt 2 tested successfully.
* [ ] Backup prompt tested successfully.
* [ ] Slides completed.
* [ ] Demo script reviewed.
* [ ] Demo rehearsed twice.
* [ ] Timer used during rehearsal.
* [ ] Total presentation is under 5 minutes.
* [ ] Offline backup plan is ready.

---

# Rehearsal Plan

## Rehearsal 1

Run the complete presentation using a timer.

Pay attention to:

* How long the introduction takes.
* How long the architecture explanation takes.
* Tool-call delays.
* Whether Claude selects the correct tools.
* Whether any explanation is unnecessary.
* Total presentation time.

## Rehearsal 2

Repeat the presentation after fixing any problems from the first rehearsal.

### Target time

Aim for approximately:

```text
4:00–4:45
```

This leaves some room for unexpected delays.

---

# Timing Summary

| Time      | Section      | Main Activity                |
| --------- | ------------ | ---------------------------- |
| 0:00–0:40 | Problem      | Explain the problem          |
| 0:40–1:10 | Architecture | Explain the system           |
| 1:10–3:30 | Live Demo    | Search + categories + backup |
| 3:30–4:30 | Next Steps   | Explain future improvements  |
| 4:30–5:00 | Closing      | Summarize and take questions |

---

# Demo Principle

The live demonstration is the most important part of the presentation.

If the presentation runs over time, reduce the amount of explanation on the slides before cutting the live demonstration.

The main story should be:

**User request → Claude → MCP tool → local data → useful answer**

The goal is to show that the project is not only an MCP server that works in Inspector, but a real server that an AI client can use to interact with local notes and FAQs.
