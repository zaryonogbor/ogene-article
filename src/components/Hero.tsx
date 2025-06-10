
import { Article } from "@/types/Article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroProps {
  featuredArticle: Article;
  recentArticles: Article[];
}

const Hero = ({ featuredArticle, recentArticles }: HeroProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Combine featured article with recent articles for the slider
  const allArticles = [featuredArticle, ...recentArticles.slice(0, 4)];

  return (
    <section className="relative bg-gradient-to-br from-background to-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Student Articles & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover thought-provoking articles written by students, covering topics from technology and science to culture and personal experiences.
            </p>
          </div>

          {/* Articles Slider */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {allArticles.map((article, index) => (
                  <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow h-full overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {index === 0 && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(article.date)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground line-clamp-2">
                          <Link 
                            to={`/article/${article.id}`} 
                            className="hover:text-primary transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className="text-muted-foreground line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Link to={`/article/${article.id}`}>
                          <Button className="group w-full">
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
