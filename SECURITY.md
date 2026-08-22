# Security Policy

## Supported versions

This repository is maintained as a single project and is only supported in its current checked-out state. We do not publish separate release branches or versioned support guarantees for historical snapshots.

If you are using this repo, please make sure you are on the latest branch that contains the current security fixes.

## Reporting a vulnerability

Please report security issues privately to the mentor at:

mjaradat@nextflows.ai

When reporting, include:

- a description of the issue
- the affected file or behavior
- steps to reproduce
- the impact and severity
- any suggested fix or mitigation

We aim to acknowledge reports promptly and work toward a fix as quickly as possible.

## Security boundaries and safeguards

This project intentionally keeps the attack surface narrow:

- Allowlist: file reads are limited to the local data directory under ./data; path traversal is rejected.
- Caps: search queries are limited to 200 characters and result counts are capped at 20 items.
- Validation: user input is validated with Zod schemas to reject empty, malformed, or overly long values.
- Safe defaults: no arbitrary filesystem paths, no network access, and no model-controlled file writes outside the repository's known data location.

## What is not allowed

The application is not intended to handle arbitrary user-controlled file paths, remote network access, or unbounded query sizes. Requests outside those boundaries should be treated as invalid input.
