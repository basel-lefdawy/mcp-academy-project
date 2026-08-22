# Threat Model

## Assets

* `./data/notes.json` — the local fixture containing the notes used by the MCP tools. Its contents and integrity should be protected from unintended modification or disclosure.
* API/tool responses — data returned by `search_notes`, `list_notes`, and `list_categories` should be accurate and limited to a reasonable size.
* The machine's filesystem — MCP tools must not allow model-controlled input to access files outside the intended `./data` directory.
* Tokens and API keys — the current project does not require external API keys or authentication tokens. If this changes later, secrets must not be logged or committed to Git.

## Trust Boundaries

* **Model → tool arguments:** Tool arguments come from the model and must be treated as untrusted input. For example, the `query` supplied to `search_notes` must be validated before being used.
* **Tool → filesystem:** The note tools read data from `./data/notes.json`. File access must remain restricted to the intended fixture location and must not allow model-controlled paths to escape the data directory.
* **Tool → network:** The current P0 tools do not make network requests. Therefore, there is currently no user-controlled URL being passed to a network client. Any future network tool will require URL validation and request timeouts.

## Top 5 Risks

### 1. Excessive or malicious search input

`search_notes` accepts a model-controlled `query`. An extremely long or unexpected query could cause unnecessary processing or produce an excessively large response.

### 2. Runaway responses from fixture data

`list_notes` could return a large number of notes if the fixture grows. Returning the entire dataset could consume too much of the model's context.

### 3. Path traversal through future file inputs

The current P0 tools use the application's known fixture path rather than accepting a file path from the model. However, future note tools such as `add_note`, `update_note`, or `delete_note` could become unsafe if model-controlled paths are introduced.

### 4. Invalid tool arguments

The model may provide missing, incorrectly typed, empty, or unexpectedly large arguments. Without schema validation, these inputs could cause errors or unexpected behavior in the handlers.

### 5. Accidental secret exposure

The current project does not need API keys or tokens, but future network integrations could introduce secrets. Logging request data or committing `.env` files could expose them.

## Mitigations This Week

* **Search input:** Use Zod validation for tool arguments and impose a reasonable maximum length on the `search_notes` query.
* **Response size:** Add a maximum number of results returned by `search_notes` and `list_notes`, and limit excessively large note content where necessary.
* **Filesystem access:** Keep fixture paths controlled by the application. If a model-controlled path is introduced, use an allowlist and resolve the path to ensure it remains inside `./data`.
* **Argument validation:** Define Zod schemas for all P0 tool inputs and reject invalid input with clean tool errors instead of allowing the handler to crash.
* **Secrets:** Keep secrets out of source code and logs, use environment variables if authentication is introduced later, and ensure `.env` files are excluded from Git.

## Out of Scope

* Authentication and authorization between MCP clients and the local student server are out of scope because this project is a local training/demo application and does not currently expose protected user accounts.
* Full production-grade network security is out of scope because the current P0 tools do not make external network requests.
* Encryption of the local fixture is out of scope because `notes.json` contains demo data rather than sensitive production information.
* Multi-user isolation is out of scope because the project is currently designed for a single local demo environment.
* Advanced denial-of-service protection is out of scope; reasonable input and response size limits are sufficient for the scope of this student project.
