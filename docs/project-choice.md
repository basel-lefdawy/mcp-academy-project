# Notes & FAQ Search - Design

## Pitch

Many students and professionals keep important notes but struggle to quickly find the information they need. This project provides an offline Notes & FAQ Search application that stores personal notes and question-and-answer pairs locally. Through the Model Context Protocol (MCP), an AI assistant can search, add, update, and manage notes using natural language. The project does not rely on internet access or paid APIs, making it lightweight, private, and easy to demonstrate.

---

## User & Demo Story

A student is preparing for an Operating Systems exam and asks, "What are the responsibilities of an operating system?" The AI calls the `search_notes` tool to search the local knowledge base and finds a matching note. It returns the stored explanation along with the note title. The student then says, "Add a note about process scheduling," which triggers the `add_note` tool. Finally, the student asks, "List all my Operating Systems notes," and the AI calls `list_notes` to display the available notes.

---

## Tool Inventory

| Tool Name | Description | Inputs | Output | Priority |
|-----------|-------------|--------|--------|----------|
| search_notes | Search notes and FAQs using keywords | query | Matching notes (list of title + content) | **P0** |
| add_note | Create a new note or FAQ entry | title, content, category | Success message + note ID | **P0** |
| list_notes | Display all stored notes | optional category | List of notes | **P0** |
| update_note | Modify an existing note | note_id, updated fields | Updated note | P1 |
| delete_note | Remove a note | note_id | Success message | P1 |
| list_categories | Show available note categories | none | List of categories | P1 |

---

## Out of Scope

- User authentication and multiple user accounts.
- Cloud synchronization or online storage.
- Mobile or web interface (command-line/MCP only).
- AI-generated note summaries.
- Semantic search using embeddings or vector databases.

---

## Success Criteria

- [ ] Users can add a note and retrieve it using the search tool.
- [ ] Users can list all stored notes through MCP.
- [ ] All data is stored and retrieved locally without internet access.

---

## Risks

### Risk 1
Designing the search so it returns relevant notes without becoming overly complex.

**Mitigation:** Start with simple keyword matching and improve only if time allows.

### Risk 2
Learning the MCP SDK while implementing multiple tools.

**Mitigation:** Build one tool at a time and test each tool before adding the next.