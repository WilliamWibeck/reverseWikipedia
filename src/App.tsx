import "./App.css";
import { useEffect, useState } from "react";
import { fetchPopularWikiPage } from "./functions/fetchPopularWikiPage";
import { fetchWikipediaSummary } from "./functions/fetchArticleSummary"
import { filterOutName } from "./functions/filterOutTitle";

const App = () => {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleSummary, setArticleSummary] = useState()

  const fetchTitle = async () => {
    try {
      const fetchedArticleTitle = await fetchPopularWikiPage();
      setArticleTitle(fetchedArticleTitle)
    } catch {
      
    }
  } 
  
  useEffect(() => {
    fetchTitle();    
  }, []);
  
  
  const filterName = (article, articleTitle) => {
    console.log("ARTICLE: " + article + "TITLE: " + articleTitle);
    
    // const filteredArticle = article.replace(articleTitle, "___")
    // console.log(filteredArticle);
    
  }

  const fetchArticleSummary = async () => {
    const fetchedArticleSummary = await fetchWikipediaSummary(articleTitle.article)
    setArticle(fetchedArticleSummary)
  }



  useEffect(() => {
    if (articleTitle) {
      console.log(articleTitle.article);
      fetchArticleSummary()      
    }
  }, [articleTitle]);

  useEffect(()=> {
    if(article && articleTitle){
      console.log(article, articleTitle);
      
      const formattedSummary = filterOutName(article.extract, articleTitle.article)
      setArticleSummary(formattedSummary)
    }
  }, [article, articleTitle])


  return <div>{article ? <p>{articleSummary}</p> : <p>Loading...</p>}</div>;
}

export default App;