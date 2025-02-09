export const fetchPopularWikiPage = async () => {

    const date = new Date();
    const formattedDate = date.toLocaleDateString();    

    const popularUrl =
      "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2025/01/06"; 

    try {
      const response = await fetch(popularUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const articles = data.items[0].articles.filter((a) => a.rank <= 50); 
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        
        return randomArticle

    }
    } catch (error) {
      console.error("Error fetching popular articles:", error);
    }
  }