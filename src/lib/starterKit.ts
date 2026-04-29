const KEY = "had:starter-kit";

export interface SavedFile {
  id: string;
  name: string;
  body: string;
  savedAt: number;
}

export function listSaved(): SavedFile[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveFile(name: string, body: string): SavedFile {
  const file: SavedFile = { id: crypto.randomUUID(), name, body, savedAt: Date.now() };
  const all = listSaved();
  all.push(file);
  localStorage.setItem(KEY, JSON.stringify(all));
  return file;
}

export function removeFile(id: string) {
  const all = listSaved().filter((f) => f.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearAll() {
  localStorage.removeItem(KEY);
}
