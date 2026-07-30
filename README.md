# 📚 Notes & FAQ Search

An offline **Model Context Protocol (MCP)** application that enables users to store, organize, and search personal notes and frequently asked questions (FAQs). The project exposes note management through MCP tools, allowing an AI assistant to retrieve and manage information using natural language while keeping all data stored locally.

> Developed as part of the **NextFlows Academy – Building an MCP for an AI Engine** program.

---

## ✨ Features

* 🔍 Search notes and FAQs using keywords.
* ➕ Add new notes or FAQ entries.
* 📋 List all stored notes.
* 📝 Update existing notes *(planned)*.
* 🗑️ Delete notes *(planned)*.
* 📂 Organize notes by category *(planned)*.
* 💻 Fully offline with local storage.
* 🔒 No paid APIs or cloud services required.

---

## 🎯 Project Goals

The goal of this project is to demonstrate how the **Model Context Protocol (MCP)** can expose local tools that allow an AI assistant to interact with a personal knowledge base.

By the end of the project, users should be able to:

* Maintain a collection of personal notes.
* Search notes quickly using natural language or keywords.
* Manage notes through MCP tools.
* Keep all information private by storing everything locally.

---

## 🛠️ Tech Stack

* **TypeScript**
* **Node.js**
* **Model Context Protocol (MCP) SDK**
* **JSON Local Storage** *(SQLite may be considered in future versions)*

---

## 📦 MCP Tools

| Tool              | Description                           | Status |
| ----------------- | ------------------------------------- | ------ |
| `search_notes`    | Search notes and FAQs using keywords. | ✅ P0   |
| `add_note`        | Add a new note or FAQ entry.          | ✅ P0   |
| `list_notes`      | Display all stored notes.             | ✅ P0   |
| `update_note`     | Update an existing note.              | 🚧 P1  |
| `delete_note`     | Delete a note.                        | 🚧 P1  |
| `list_categories` | Display available categories.         | 🚧 P1  |

---

## 📁 Project Structure

```text
.
├── docs/
│   └── design.md
├── src/
│   ├── data/
│   ├── tools/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/basel-lefdawy/mcp-academy-project
cd mcp-academy-project
```

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm run dev
```

---


### Future Enhancements

* Semantic search using embeddings.
* AI-generated summaries.
* Import/export notes.
* SQLite database support.
* Desktop or web interface.
* Cloud synchronization.

---

## ✅ Success Criteria

The project will be considered successful if it can:

* Search and return relevant notes from local storage.
* Add and retrieve notes through MCP tools.
* Operate completely offline.
* Demonstrate all required P0 tools during Demo Day.

---

## 📖 Academy

This project is being developed as part of the **NextFlows Academy – Building an MCP for an AI Engine** program.

Learn more:
https://nextflows.ai/academy

---

## 👨‍💻 Author

**Basel Lefdawi**

Computer Science Student
An-Najah National University

---

## 📄 License

This project is intended for educational purposes as part of the NextFlows Academy MCP training program.
