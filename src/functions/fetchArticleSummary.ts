export const fetchWikipediaSummary = async (articleTitle: string) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(articleTitle)}`;

    try {
        const response = await fetch(url);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Extract all paragraphs
        const paragraphs = Array.from(doc.querySelectorAll("p"));

        // Filter out empty or very short paragraphs
        const validParagraphs = paragraphs.map(p => p.innerText).filter(text => text.length > 50);

        if (validParagraphs.length === 0) throw new Error("No valid paragraphs found");

        // Pick a random paragraph
        let randomParagraph = validParagraphs[Math.floor(Math.random() * validParagraphs.length)];

        // Split into sentences
        const sentences = randomParagraph.match(/[^.!?]+[.!?]+/g) || [randomParagraph];

        // Choose a random sentence or short excerpt (1-3 sentences)
        let excerpt = sentences[Math.floor(Math.random() * sentences.length)];

        // If possible, extend the excerpt to two sentences for better context
        const excerptIndex = sentences.indexOf(excerpt);
        if (excerptIndex < sentences.length - 1) {
            excerpt += " " + sentences[excerptIndex + 1];
        }

        console.log("Random excerpt:", excerpt);
        return excerpt;
    } catch (error) {
        console.log("Error fetching article excerpt:", error);
        return null;
  }
}