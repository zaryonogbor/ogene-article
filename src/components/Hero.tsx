import { useEffect, useState } from "react";
import { Article } from "@/types/Article";
import { Link } from "react-router-dom";

interface HeroProps {
  featuredArticle: Article;
  recentArticles: Article[];
}

const Hero = ({ featuredArticle, recentArticles }: HeroProps) => {
  const allArticles = [featuredArticle, ...recentArticles.slice(0, 4)];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allArticles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allArticles.length]);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          width: `${allArticles.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / allArticles.length)}%)`,
        }}
      >
        {allArticles.map((article) => (
          <div
            key={article.id}
            className="w-full flex-shrink-0 relative h-full"
            style={{ width: `${100 / allArticles.length}%` }}
          >
            {/* Background Image */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover brightness-75"
            />

            {/* Centered Title */}
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <Link to={`/article/${article.id}`}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
