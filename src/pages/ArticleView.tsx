
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Article } from "@/types/Article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Calendar, User, ArrowLeft } from "lucide-react";
import articlesData from "@/data/articles.json";

const ArticleView = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Load articles from JSON file and localStorage
    const storedArticles = localStorage.getItem('studenthub-articles');
    let allArticles = [...articlesData];
    
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      allArticles = [...allArticles, ...parsedArticles];
    }

    const foundArticle = allArticles.find(a => a.id === id);
    setArticle(foundArticle || null);
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>

          <article className="bg-card rounded-lg border shadow-sm overflow-hidden">
            {/* Article Image */}
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              <div className="prose prose-gray max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ArticleView;
