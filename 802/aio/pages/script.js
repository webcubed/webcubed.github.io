function _renderDOMFromMarkdownFile(path) {
	return fetch(path)
		.then((response) => response.text())
		.then((markdown) => {
			const { document } = new DOMParser().parseFromString(
				markdown,
				"text/html"
			);
			return document;
		});
}
