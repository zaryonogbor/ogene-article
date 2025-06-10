
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "@/types/Article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    content: "",
    tags: "",
    image: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields (title, author, and content).",
        variant: "destructive"
      });
      return;
    }

    // Create new article
    const newArticle: Article = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      date: new Date().toISOString().split('T')[0],
      excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      image: formData.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
    };

    // Save to localStorage
    const existingArticles = localStorage.getItem('studenthub-articles');
    const articles = existingArticles ? JSON.parse(existingArticles) : [];
    articles.unshift(newArticle);
    localStorage.setItem('studenthub-articles', JSON.stringify(articles));

    toast({
      title: "Article Published!",
      description: "Your article has been successfully published."
    });

    // Navigate to the new article
    navigate(`/article/${newArticle.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">It seems this page is still under maintenance please be patient with us as the feature will soon be made available, thank you.</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
