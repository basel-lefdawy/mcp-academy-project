import { readDataFile } from "./file.js";

export interface NoteRecord {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
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

export async function loadNotes(): Promise<NoteRecord[]> {
  const contents = await readDataFile("notes.json");
  return normalizeNotes(JSON.parse(contents));
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
