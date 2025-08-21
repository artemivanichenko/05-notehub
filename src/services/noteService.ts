// GET https://notehub-public.goit.study/api/notes?page=1&perPage=12
// GET https://notehub-public.goit.study/api/notes?search=mysearchtext

import axios from "axios";
import { type Note, type NoteTag } from "../types/note";

const axiosInst = axios.create({
	baseURL: "https://notehub-public.goit.study/api",
	headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

interface fetchNotesProps {
	notes: Note[];
	totalPages: number;
}

export const fetchNotes = async (
	search: string,
	page: number
): Promise<fetchNotesProps> => {
	const params = {
		params: {
			page,
			perPage: 12,
			search,
		},
	};

	const fetchNotesResponse = await axiosInst.get<fetchNotesProps>(
		"/notes",
		params
	);
	return fetchNotesResponse.data;
};

interface newTaskProp {
	title: string; // description
	content: string; // description
	tag: NoteTag;
}

export const createNote = async (newTask: newTaskProp): Promise<Note> => {
	const createNoteResponse = await axiosInst.post("/notes", newTask);
	return createNoteResponse.data;
};

export const deleteNote = async (taskID: string): Promise<Note> => {
	const deleteNoteResponse = await axiosInst.delete(`/notes/${taskID}`);
	return deleteNoteResponse.data;
};
