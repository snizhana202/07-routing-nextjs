import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";
import type { Category } from "../types/category";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  note: Note;
}

export interface FetchNoteResponse {
  note: Note;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  tag: string,
  search?: string,
): Promise<FetchNotesResponse> {
  try {
    const response: AxiosResponse<FetchNotesResponse> = await api.get(
      "/notes",
      {
        params: { page, perPage, tag, search },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
}

export async function createNote(
  data: CreateNoteData,
): Promise<CreateNoteResponse> {
  try {
    const response: AxiosResponse<CreateNoteResponse> = await api.post(
      "/notes",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  try {
    const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
      `/notes/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<FetchNoteResponse> {
  try {
    const response: AxiosResponse<FetchNoteResponse> = await api.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch note details:", error);
    throw error;
  }
}
