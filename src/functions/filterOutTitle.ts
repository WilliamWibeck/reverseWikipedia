interface IfilterOutName {
    articleString: string,
    articleTitle: string
}

export const filterOutName = (articleString, articleTitle) => {
    console.log("ArticleString: ", articleString, " ArticleTitle: " , articleTitle);

    const normalizeString = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const formattedTitle = articleTitle.replaceAll(/[_\(\)0-9]/g, " ").trim();
    const normalizedTitle = normalizeString(formattedTitle);

    const regex = new RegExp(`\\b${normalizedTitle}\\b`, "gi"); // Ensure whole-word matching
   
    const filteredArticle = articleString.replace(regex, "___")

    console.log("Filtered: ", filteredArticle)
    return filteredArticle    
}