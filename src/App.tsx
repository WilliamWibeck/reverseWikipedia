import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");

  async function fetchPopularWikipediaPage() {

    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate);
    

    const popularUrl =
      "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2024/02/04"; 

    try {
      const response = await fetch(popularUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const articles = data.items[0].articles.filter((a) => a.rank <= 50); 
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        console.log("Fetched popular title: " + randomArticle.article);
        setArticleTitle(randomArticle.article);
      }
    } catch (error) {
      console.error("Error fetching popular articles:", error);
    }
  }

  useEffect(() => {
    fetchPopularWikipediaPage();
  }, []);

  useEffect(() => {
    if (articleTitle) {
      const fetchWikipediaSummary = async () => {
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleTitle)}`;

        try {
          const summaryResponse = await fetch(summaryUrl);
          const summaryData = await summaryResponse.json();

          setArticle(summaryData.extract);
        } catch (error) {
          console.log("Error fetching article summary:", error);
        }
      };
      

      fetchWikipediaSummary();
    }
  }, [articleTitle]);



  return <div>{article ? <p>{article}</p> : <p>Loading...</p>}</div>;
}

export default App;