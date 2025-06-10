
import { useState, useEffect } from "react";
import { Article } from "@/types/Article";
import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import articlesData from "@/data/articles.json";

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load articles from JSON file and any stored in localStorage
    const storedArticles = localStorage.getItem('studenthub-articles');
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      setArticles([...articlesData, ...parsedArticles]);
    } else {
      setArticles(articlesData);
    }
  }, []);

  const sortedArticles = articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredArticle = sortedArticles[0];
  const recentArticles = sortedArticles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {articles.length === 0 ? (
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No articles found.</p>
            <p className="text-muted-foreground">Be the first to share your insights!</p>
          </div>
        </main>
      ) : (
        <>
          <Hero featuredArticle={featuredArticle} recentArticles={recentArticles} />
          
          <main className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">All Articles</h2>
              <p className="text-muted-foreground">
                Browse through all our student articles and insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
