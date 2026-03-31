import axios, { type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!token) {
  throw new Error(
    'VITE_NOTEHUB_TOKEN is not defined. Please add it to the .env file.'
  );
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export type CreateNoteResponse = Note;

export type DeleteNoteResponse = Note;

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params,
  });
  return response.data;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<CreateNoteResponse> {
  const response: AxiosResponse<CreateNoteResponse> = await api.post(
    '/notes',
    payload
  );
  return response.data;
}

export async function deleteNote(noteId: string): Promise<DeleteNoteResponse> {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
    `/notes/${noteId}`
  );
  return response.data;
}
