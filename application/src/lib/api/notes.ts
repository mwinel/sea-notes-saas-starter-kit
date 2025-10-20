export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string | null;
  status: string | null;
  isFavorite: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title?: string;
  content: string;
  category?: string;
  status?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  category?: string;
  status?: string;
  isFavorite?: boolean;
}

export interface PaginatedNotes {
  notes: Note[];
  total: number;
}

/**
 * API client for managing notes
 * This client provides methods to interact with the notes API, including fetching, creating, updating, and deleting notes.
 */
export class NotesApiClient {
  constructor(private baseURL = '/api/notes') {}
  // Fetch all notes
  async getNotes(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    categories?: string[];
    statuses?: string[];
    isFavorite?: boolean;
  }): Promise<PaginatedNotes> {
    let url = `${this.baseURL}`;
    if (
      params &&
      (params.page !== undefined ||
        params.pageSize !== undefined ||
        params.search !== undefined ||
        params.sortBy !== undefined ||
        params.categories !== undefined ||
        params.statuses !== undefined ||
        params.isFavorite !== undefined)
    ) {
      const query = new URLSearchParams();
      if (params.page !== undefined) query.append('page', params.page.toString());
      if (params.pageSize !== undefined) query.append('pageSize', params.pageSize.toString());
      if (params.search !== undefined) query.append('search', params.search);
      if (params.sortBy !== undefined) query.append('sortBy', params.sortBy);
      if (params.categories !== undefined && params.categories.length > 0) {
        query.append('categories', params.categories.join(','));
      }
      if (params.statuses !== undefined && params.statuses.length > 0) {
        query.append('statuses', params.statuses.join(','));
      }
      if (params.isFavorite !== undefined) {
        query.append('isFavorite', params.isFavorite.toString());
      }
      url += `?${query.toString()}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
  }

  // Fetch a specific note
  async getNote(id: string): Promise<Note> {
    const res = await fetch(`${this.baseURL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch note');
    return res.json();
  }

  // Create a new note
  async createNote(noteData: CreateNoteData): Promise<Note> {
    const res = await fetch(`${this.baseURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
  }

  // Update a note
  async updateNote(id: string, updateData: UpdateNoteData): Promise<Note> {
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error('Failed to update note');
    return res.json();
  }

  // Delete a note
  async deleteNote(id: string): Promise<void> {
    const res = await fetch(`${this.baseURL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete note');
  }

  // Toggle favorite status
  async toggleFavorite(id: string, isFavorite: boolean): Promise<Note> {
    return this.updateNote(id, { isFavorite });
  }

  // Reorder notes
  async reorderNotes(items: { id: string; position: number }[]): Promise<void> {
    const res = await fetch(`${this.baseURL}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Failed to reorder notes');
  }
}
