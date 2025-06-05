async function _renderDOMFromMarkdownFile(path) {
	const response = await fetch(path);
	const markdown = await response.text();
	const { document } = new DOMParser().parseFromString(markdown, "text/html");
	return document;
}
