import './style';
import { useState, useEffect } from 'preact/hooks';

function computeCurrentPageClass(cursor, page_index) {
	if (cursor == page_index) return 'center-page';
	if (cursor - 1 == page_index) return 'left-page';
	if (cursor + 1 == page_index) return 'right-page';
	if (page_index - cursor == -2) return 'offscreen-page-left';
	if (page_index - cursor == 2) return 'offscreen-page-right';
	return 'offscreen-page';
}

export default function App() {

	const pages = [0, 1, 2, 4, 5]; // temp

	const [cursor, setCursor] = useState(0);

	const onKeyPress = (e) => {
		if (e.key == 'a') {
			if (cursor - 1 < 0) return;
			setCursor(cursor - 1);
		} else if (e.key == 'd') {
			if (cursor + 1 > pages.length - 1) return;
			setCursor(cursor + 1);
		}
	}

	useEffect(() => {
		window.addEventListener('keypress', onKeyPress);
		return () => window.removeEventListener('keypress', onKeyPress);
	});

	return (
		<div>
			{pages.map((page, page_index) =>
				<div className={'page ' + computeCurrentPageClass(cursor, page_index)}>
					<input/>
					<h1>page {page}</h1>
				</div>)}
		</div>
	);
}
