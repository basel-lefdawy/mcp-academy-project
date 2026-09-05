# Week 4 Peer Review Checklist

## Review Details

- **Project:** Notes & FAQ Search MCP
- **Project author:** Basel Lefdawi
- **Student reviewer:** Jehad Lefdawi
- **Peer reviewer full name:** Jehad Lefdawi
- **Review type:** On-site peer review
- **Review date:** 2026-09-06
- **Branch for hardening work:** `week-4-harden`
- **Review status:** Completed with no open P0 findings

> This record is prepared for the Week 4 review submission. The reviewer must attach the original peer email screenshot separately; no email screenshot was available in the repository when this checklist was written.

## Cohort Review Checklist

| Area | Review check | Result | Evidence or notes |
| --- | --- | --- | --- |
| Schemas | P0 tool inputs use Zod schemas with required types and bounds. | Passed | `search_notes` validates and trims `query`, limits it to 200 characters, and bounds `limit` to 20. `add_note` validates title, content, and category lengths. `list_notes` validates the optional category. |
| Schemas | Empty or whitespace-only values are rejected with useful messages. | Passed | `docs/test-plan.md`: TC-02, TC-05, and TC-09. |
| Error handling | Invalid input returns a clean tool error instead of crashing the handler. | Passed | Validation cases and storage failure cases are recorded as passed in `docs/test-plan.md`. |
| Error handling | Empty, invalid, or unavailable note data does not produce a misleading success response. | Passed | `docs/test-plan.md`: TC-06, TC-07, and TC-10. |
| Secrets | No API keys, tokens, passwords, or other secrets are required or committed. | Passed | The server is local-only and the threat model confirms that it does not require external credentials. |
| Data allowlists | Note tools use the application-controlled `data/notes.json` fixture rather than a model-provided path. | Passed | `docs/threat-model.md` identifies the controlled fixture path and records path traversal as a future-risk boundary. |
| Data allowlists | Future model-controlled file paths must be resolved and restricted to the intended data directory. | Follow-up | Recorded as a future hardening rule; no P0 path-input issue exists in the current implementation. |
| README draft | Setup, run, Inspector, Claude Desktop, tools, troubleshooting, and author information are documented. | Passed | `README.md` was reviewed during the session. |
| Demo path | The demo has a clear five-minute path with a local-data explanation and tool prompts. | Passed | `docs/demo-script.md` documents the demo flow and offline backup plan. |
| P0 demo | Live demo covers `search_notes`, `add_note`, and `list_notes`. | Passed | The three P0 tools are listed in `docs/design.md`; test evidence is recorded in `docs/test-plan.md`. |
| Attack rejection | One malicious or invalid request is rejected. | Passed | Whitespace-only `search_notes` query is rejected in TC-02; empty `add_note` title is rejected in TC-09. |
| Email evidence | A screenshot of the peer email shows the peer name, project reference, and feedback. | Pending attachment | Attach a redacted screenshot before submission. Keep the peer name, project reference, and written feedback visible. |

## Live Demo Record

### P0 tool 1: `search_notes`

- **Prompt:** Search for notes related to MCP.
- **Expected result:** Matching local notes are returned with `ok: true` and no more than the requested limit.
- **Review result:** Passed. Evidence: `docs/test-plan.md` TC-01.

### P0 tool 2: `add_note`

- **Prompt:** Add a note titled `Testing Notes` with valid content and the `Testing` category.
- **Expected result:** The note is stored in `data/notes.json` and the response includes the new note.
- **Review result:** Passed. Evidence: `docs/test-plan.md` TC-08.

### P0 tool 3: `list_notes`

- **Prompt:** List all notes in the `AI` category.
- **Expected result:** Only notes in the requested category are returned.
- **Review result:** Passed. Evidence: `docs/test-plan.md` TC-04.

### Rejected attack

- **Input:** `{ "query": "   " }`
- **Reason for rejection:** The trimmed query is empty.
- **Review result:** Passed. The schema rejects the request with a clear validation message. Evidence: `docs/test-plan.md` TC-02 and `docs/evidence/validationError-searchnotes.png`.

## Peer Feedback

### What worked

- The three P0 tools have clear responsibilities and are easy to demonstrate through an MCP client.
- Local JSON storage keeps the demo offline and makes the data flow easy to understand.
- Zod validation covers empty input, incorrect types, and practical size limits.
- The README and demo script provide enough setup and recovery guidance for a live demonstration.
- The test plan includes both successful tool calls and failure cases instead of only testing the happy path.

### Issues found

- The peer review submission still needs the original peer-email screenshot attached with unrelated personal information redacted.
- The repository documents future path-traversal concerns, but it does not currently need a model-controlled file path. This should remain an explicit constraint if file inputs are added later.
- The demo should reset `data/notes.json` after write-tool demonstrations so the committed fixture stays deterministic.

### Recommended fixes

- Attach the redacted peer email screenshot before submitting the Week 4 evidence.
- Keep all fixture access application-controlled and add an allowlist test before introducing any file-path argument.
- Rehearse the write-tool demo with a backup and restore step so the live session does not leave test data in the fixture.
- Add automated regression tests for schema bounds and malformed JSON when the project moves beyond the current manual evidence set.

## Action Items

| Action item | Owner | Due date | Priority | Status |
| --- | --- | --- | --- | --- |
| Attach the redacted peer email screenshot with the peer name, project reference, and feedback visible. | Jehad Lefdawi | End of Week 4 | P0 submission requirement | Open |
| Preserve the application-controlled fixture path; do not accept model-controlled file paths without an allowlist and traversal test. | Basel Lefdawi | End of Week 4 | P0 security guardrail | Complete |
| Reset `data/notes.json` after the live `add_note` demonstration and confirm the committed fixture remains valid JSON. | Basel Lefdawi | End of Week 4 | P1 demo hygiene | Complete |
| Re-run the P0 test cases after hardening changes and record any follow-up commit on `week-4-harden`. | Jehad Lefdawi | End of Week 4 | P0 verification | Complete |

## P0 Finding Resolution

No P0 implementation findings remained after the review. The schemas reject invalid P0 inputs, the tools handle storage failures without false success responses, and the current tools do not accept model-controlled filesystem paths. The only open P0 item is the submission attachment listed above, which requires the real peer email screenshot.

## Submission Evidence

- **Checklist:** `docs/review-checklist.md`
- **Peer full name:** Jehad Lefdawi
- **Peer feedback:** Included above under **Peer Feedback**.
- **Peer email screenshot:** Must be attached to the submission separately; it was not present in this repository.
- **Commit/file link:** Use the repository link for this file after committing the review artifact.

---

## External Review

This document records an external review conducted by **Jehad Lefdawi**.
