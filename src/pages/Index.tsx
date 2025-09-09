import { Header } from "@/components/Layout/Header";
import { SearchInterface } from "@/components/Search/SearchInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchInterface />
    </div>
  );
};

export default Index;
