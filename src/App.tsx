import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [article, setArticle] = useState();
  const [articleTitle, setArticleTitle] = useState("");
  async function fetchRandomWikipediaPage() {
    const titleUrl = "https://en.wikipedia.org/api/rest_v1/page/random/title";

    try {
      const titleResponse = await fetch(titleUrl);
      const titleData = await titleResponse.json();

      if (titleData.items && titleData.items.length > 0) {
        console.log("Fetched title: " + titleData.items[0].title);
        console.log("ArticleTitleState: " + articleTitle);

        setArticleTitle(titleData.items[0].title);
      }

      fetchWikipediaArticle();
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  const fetchWikipediaArticle = async () => {
    const fullPageUrl = `https://en.wikipedia.org/api/rest_v1/page/html/${articleTitle}`;
    console.log("ARTICLE TITLE:" + articleTitle);

    try {
      const fullPageResponse = await fetch(fullPageUrl);
      const fullPageData = await fullPageResponse.json();

      setArticle(fullPageData);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchRandomWikipediaPage();
    console.log(articleTitle);
  }, []);

  return <div>{article ? <p>{article.extract}</p> : <p>Loading...</p>}</div>;
}

export default App;
