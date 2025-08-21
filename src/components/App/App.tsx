import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

const App = () => {
	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox />

				<button className={css.button}>Create note +</button>
			</header>
		</div>
	);
};

export default App;
