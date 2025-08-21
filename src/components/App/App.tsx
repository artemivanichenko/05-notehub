import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

const App = () => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);

	const { data, isSuccess } = useQuery({
		queryKey: ["notes", query, page],
		queryFn: () => fetchNotes(query, page),
		placeholderData: keepPreviousData,
	});

	const handleSearch = useDebouncedCallback((value: string) => {
		setQuery(value);
		setPage(1);
	}, 300);

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onChange={handleSearch} />
				{isSuccess && data.totalPages > 1 && (
					<Pagination
						page={page}
						totalPages={data.totalPages}
						currentPage={setPage}
					/>
				)}

				<button onClick={() => setIsOpen(true)} className={css.button}>
					Create note +
				</button>
			</header>
			{data && data.notes.length > 0 && <NoteList notes={data.notes} />}
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<NoteForm onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};

export default App;
