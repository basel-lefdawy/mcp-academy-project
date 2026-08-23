import { readDataFile, writeDataFile } from "./file.js";

export interface NoteRecord {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface AddNoteInput {
  title: string;
  content: string;
  category?: string;
}

export interface UpdateNoteInput {
  noteId: string;
  title?: string;
  content?: string;
  category?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeNotes(raw: unknown): NoteRecord[] {
  if (!Array.isArray(raw)) {
    throw new Error("Notes fixture must be an array.");
  }

  return raw.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Fixture entry ${index} is invalid.`);
    }

    const { id, title, content, category, tags } = entry;

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof category !== "string" ||
      !Array.isArray(tags) ||
      tags.some((tag) => typeof tag !== "string")
    ) {
      throw new Error(`Fixture entry ${index} is invalid.`);
    }

    return { id, title, content, category, tags };
  });
}

function makeTags(title: string, content: string, category?: string): string[] {
  const words = [title, content, category ?? ""]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return Array.from(new Set(words)).slice(0, 8);
}

function buildNoteId(notes: NoteRecord[]): string {
  const usedIds = notes
    .map((note) => note.id)
    .filter((id) => /^note-\d+$/.test(id));

  const nextNumber = usedIds.length
    ? Math.max(
        ...usedIds.map((id) => Number.parseInt(id.replace(/^note-/, ""), 10) || 0)
      ) + 1
    : 1;

  return `note-${String(nextNumber).padStart(3, "0")}`;
}

export async function loadNotes(): Promise<NoteRecord[]> {
  const contents = await readDataFile("notes.json");

  try {
    return normalizeNotes(JSON.parse(contents));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to read notes data: ${error.message}`);
    }

    throw new Error("Unable to read notes data: invalid JSON or malformed notes file.");
  }
}

export async function getNote(noteId: string): Promise<NoteRecord> {
  const normalizedNoteId = noteId.trim();
  const notes = await loadNotes();
  const note = notes.find((entry) => entry.id === normalizedNoteId);

  if (!note) {
    throw new Error(`Note not found: ${normalizedNoteId}`);
  }

  return note;
}

export async function addNote(input: AddNoteInput): Promise<NoteRecord> {
  const title = input.title?.trim();
  const content = input.content?.trim();
  const category = input.category?.trim() || "General";

  if (!title) {
    throw new Error("Title is required.");
  }

  if (!content) {
    throw new Error("Content is required.");
  }

  const notes = await loadNotes();

  const note: NoteRecord = {
    id: buildNoteId(notes),
    title,
    content,
    category,
    tags: makeTags(title, content, category),
  };

  const nextNotes = [...notes, note];

  try {
    await writeDataFile("notes.json", `${JSON.stringify(nextNotes, null, 2)}\n`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to save the new note: ${error.message}`);
    }

    throw new Error("Unable to save the new note: write failed.");
  }

  return note;
}

export async function updateNote(input: UpdateNoteInput): Promise<NoteRecord> {
  const noteId = input.noteId.trim();
  const notes = await loadNotes();
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    throw new Error(`Note not found: ${noteId}`);
  }

  const currentNote = notes[noteIndex];
  const updatedNote: NoteRecord = {
    ...currentNote,
    title: input.title?.trim() ?? currentNote.title,
    content: input.content?.trim() ?? currentNote.content,
    category: input.category?.trim() ?? currentNote.category,
    tags: makeTags(
      input.title?.trim() ?? currentNote.title,
      input.content?.trim() ?? currentNote.content,
      input.category?.trim() ?? currentNote.category
    ),
  };

  const nextNotes = [...notes];
  nextNotes[noteIndex] = updatedNote;

  try {
    await writeDataFile("notes.json", `${JSON.stringify(nextNotes, null, 2)}\n`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to save the updated note: ${error.message}`);
    }

    throw new Error("Unable to save the updated note: write failed.");
  }

  return updatedNote;
}

export async function deleteNote(noteId: string): Promise<Pick<NoteRecord, "id">> {
  const normalizedNoteId = noteId.trim();
  const notes = await loadNotes();
  const noteIndex = notes.findIndex((note) => note.id === normalizedNoteId);

  if (noteIndex === -1) {
    throw new Error(`Note not found: ${normalizedNoteId}`);
  }

  const nextNotes = notes.filter((note) => note.id !== normalizedNoteId);

  try {
    await writeDataFile("notes.json", `${JSON.stringify(nextNotes, null, 2)}\n`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to delete the note: ${error.message}`);
    }

    throw new Error("Unable to delete the note: write failed.");
  }

  return { id: normalizedNoteId };
}

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export async function searchNotes(query: string, limit = 10): Promise<NoteRecord[]> {
  const notes = await loadNotes();
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return [];
  }

  return notes
    .filter((note) => {
      const haystack = [note.title, note.content, note.category, ...note.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .slice(0, limit);
}

export async function listNotes(category?: string, limit = 10): Promise<NoteRecord[]> {
  const notes = await loadNotes();
  const normalizedCategory = category?.trim();

  const filtered = normalizedCategory
    ? notes.filter(
        (note) => note.category.toLowerCase() === normalizedCategory.toLowerCase()
      )
    : notes;

  return filtered.slice(0, limit);
}

export async function listCategories(limit = 10): Promise<string[]> {
  const notes = await loadNotes();
  const categories = Array.from(new Set(notes.map((note) => note.category)));

  return categories.slice(0, limit);
}
