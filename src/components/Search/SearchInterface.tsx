import { useState } from "react"
import { Search, FileText, Link2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample data for demonstration
const sampleNamasteTerm = {
  term: "अग्निमान्द्य",
  romanized: "Agnimandya",
  tradition: "Ayurveda",
  definition: "A condition of weakened digestive fire, leading to indigestion, heaviness, and poor appetite.",
  references: ["Charaka Samhita", "Sushruta Samhita"],
  category: "Digestive Disorders"
}

const sampleIcdMatches = [
  {
    id: "1",
    code: "DB91",
    title: "Dyspepsia",
    confidence: 85,
    definition: "A condition characterized by recurring pain or discomfort centered in the upper abdomen.",
    isMapped: false
  },
  {
    id: "2", 
    code: "DB90",
    title: "Functional dyspepsia",
    confidence: 78,
    definition: "Chronic or recurrent pain or discomfort centered in the upper abdomen with no clear structural cause.",
    isMapped: false
  },
  {
    id: "3",
    code: "DB92",
    title: "Gastritis",
    confidence: 65,
    definition: "Inflammation of the lining of the stomach, often causing nausea, vomiting, and stomach pain.",
    isMapped: false
  }
]

export function SearchInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof sampleNamasteTerm | null>(null)
  const [icdMatches, setIcdMatches] = useState(sampleIcdMatches)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setSearchResults(sampleNamasteTerm)
      setIsSearching(false)
    }, 1000)
  }

  const handleSaveMapping = (matchId: string) => {
    setIcdMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, isMapped: true }
          : match
      )
    )
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "confidence-fill-high"
    if (confidence >= 60) return "confidence-fill-medium"
    return "confidence-fill-low"
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return "High"
    if (confidence >= 60) return "Medium"
    return "Low"
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Map NAMASTE Terms to ICD-11
            </h2>
            <p className="text-muted-foreground">
              Search for traditional medicine terms and find their international classifications
            </p>
          </div>

          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter NAMASTE term (e.g., अग्निमान्द्य, Agnimandya)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchTerm.trim()}
              className="btn-medical h-12 px-6"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* NAMASTE Term Card */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">NAMASTE Term</h3>
              <Card className="card-medical-elevated">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary mb-1">
                        {searchResults.term}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {searchResults.romanized}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {searchResults.tradition}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Definition</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {searchResults.definition}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Category</h4>
                    <Badge variant="outline">{searchResults.category}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">References</h4>
                    <div className="flex gap-2">
                      {searchResults.references.map((ref, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ICD-11 Matches */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">ICD-11 Matches</h3>
              <div className="space-y-4">
                {icdMatches.map((match) => (
                  <Card key={match.id} className="card-medical">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-primary mb-1">
                            {match.code} - {match.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {match.definition}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Confidence Score */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              Confidence Score
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              {match.confidence}% ({getConfidenceText(match.confidence)})
                            </span>
                          </div>
                          <div className="confidence-bar">
                            <div 
                              className={`h-full transition-all duration-500 ${getConfidenceColor(match.confidence)}`}
                              style={{ width: `${match.confidence}%` }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            disabled
                          >
                            <Link2 className="w-4 h-4 mr-2" />
                            View in ConceptMap
                          </Button>
                          <Button
                            onClick={() => handleSaveMapping(match.id)}
                            disabled={match.isMapped}
                            className={`flex-1 ${match.isMapped ? 'btn-medical-success' : 'btn-medical'}`}
                          >
                            <Bookmark className="w-4 h-4 mr-2" />
                            {match.isMapped ? "Saved" : "Save Mapping"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchResults && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Start by searching for a NAMASTE term
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a traditional medicine term to find its corresponding ICD-11 classifications 
              and create accurate terminology mappings.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}