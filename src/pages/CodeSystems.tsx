import { useState } from "react"
import { ChevronRight, ChevronDown, FileText, BookOpen } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample hierarchical data for medical traditions
const ayurvedaHierarchy = {
  "Dosha Vyadhi": {
    "Vataja Nanatmaja Vyadhi": {
      "Gridhrasi": {
        code: "AY001",
        definition: "Sciatica-like condition with radiating pain from hip to foot",
        synonyms: ["Sciatica", "Katishula"],
        references: ["Charaka Samhita - Chikitsa Sthana 28"]
      },
      "Pakshaghata": {
        code: "AY002", 
        definition: "Hemiplegia or paralysis of one side of the body",
        synonyms: ["Hemiplegia", "Ekanga Vata"],
        references: ["Sushruta Samhita - Nidana Sthana 1"]
      }
    },
    "Pittaja Nanatmaja Vyadhi": {
      "Raktapitta": {
        code: "AY003",
        definition: "Bleeding disorders characterized by hemorrhage from various body parts",
        synonyms: ["Bleeding disorders", "Hemorrhage"],
        references: ["Charaka Samhita - Chikitsa Sthana 4"]
      }
    }
  },
  "Agni Vyadhi": {
    "Mandagni": {
      "Agnimandya": {
        code: "AY004",
        definition: "Weakened digestive fire leading to indigestion and poor appetite",
        synonyms: ["Dyspepsia", "Indigestion"],
        references: ["Charaka Samhita - Vimana Sthana 6", "Ashtanga Hridaya"]
      }
    }
  }
}

const siddhaHierarchy = {
  "Vadha Rogam": {
    "Kaal Vadham": {
      "Suzhali Vadham": {
        code: "SI001",
        definition: "Rheumatoid arthritis with joint inflammation and deformity",
        synonyms: ["Rheumatoid arthritis", "Joint inflammation"],
        references: ["Agathiyar Vaithiya Kaviyam"]
      }
    }
  },
  "Pitha Rogam": {
    "Azhal Keel Vayu": {
      "Pittha Suram": {
        code: "SI002",
        definition: "Fever due to pitta imbalance with burning sensation",
        synonyms: ["Pyrexia", "Burning fever"],
        references: ["Therayar Vagadam"]
      }
    }
  }
}

const unaniHierarchy = {
  "Amraz-e-Dimagh": {
    "Sara": {
      "Suda": {
        code: "UN001",
        definition: "Headache and cephalgia with various underlying causes",
        synonyms: ["Headache", "Cephalgia", "Sirdard"],
        references: ["Al-Qanun fi'l-Tibb", "Kamil al-Sina'a"]
      }
    }
  },
  "Amraz-e-Qalb": {
    "Khafaqan": {
      "Ikhtilas": {
        code: "UN002",
        definition: "Palpitation and irregular heartbeat conditions",
        synonyms: ["Palpitation", "Arrhythmia"],
        references: ["Zakhira Khwarizm Shahi"]
      }
    }
  }
}

interface TreeNodeProps {
  name: string
  data: any
  level: number
  onSelect: (term: any) => void
}

function TreeNode({ name, data, level, onSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = typeof data === 'object' && !data.code
  const isLeaf = data.code

  const handleClick = () => {
    if (isLeaf) {
      onSelect({ name, ...data })
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div>
      <div 
        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-muted/50 ${
          isLeaf ? 'text-primary hover:bg-primary/10' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          isExpanded ? 
            <ChevronDown className="w-4 h-4 text-muted-foreground" /> :
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        {isLeaf && <FileText className="w-4 h-4 text-primary" />}
        {!hasChildren && !isLeaf && <BookOpen className="w-4 h-4 text-muted-foreground" />}
        <span className={`text-sm ${isLeaf ? 'font-medium' : ''}`}>{name}</span>
        {isLeaf && <Badge variant="outline" className="ml-auto text-xs">{data.code}</Badge>}
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <TreeNode
              key={key}
              name={key}
              data={value}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CodeSystems() {
  const [selectedTerm, setSelectedTerm] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("ayurveda")

  const getHierarchyData = () => {
    switch (activeTab) {
      case "ayurveda": return ayurvedaHierarchy
      case "siddha": return siddhaHierarchy  
      case "unani": return unaniHierarchy
      default: return ayurvedaHierarchy
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">CodeSystems Explorer</h1>
            <p className="text-muted-foreground">
              Browse traditional medicine terminology hierarchies in a structured format
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="ayurveda">Ayurveda</TabsTrigger>
              <TabsTrigger value="siddha">Siddha</TabsTrigger>
              <TabsTrigger value="unani">Unani</TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tree Explorer */}
              <div>
                <Card className="card-medical h-[600px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Terminology Hierarchy
                    </CardTitle>
                    <CardDescription>
                      Expand categories to explore {activeTab} terminology structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-y-auto">
                    <div className="space-y-1">
                      {Object.entries(getHierarchyData()).map(([key, value]) => (
                        <TreeNode
                          key={key}
                          name={key}
                          data={value}
                          level={0}
                          onSelect={setSelectedTerm}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Term Details */}
              <div>
                {selectedTerm ? (
                  <Card className="card-medical-elevated h-[600px]">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-primary mb-1">
                            {selectedTerm.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{selectedTerm.code}</Badge>
                            <Badge variant="outline" className="capitalize">
                              {activeTab}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Definition</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedTerm.definition}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Synonyms</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTerm.synonyms?.map((synonym: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Classical References</h4>
                        <div className="space-y-2">
                          {selectedTerm.references?.map((ref: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm text-foreground">{ref}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="card-medical h-[600px] flex items-center justify-center">
                    <CardContent className="text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Select a Term
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        Click on any term in the hierarchy to view its detailed information,
                        definitions, and classical references.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}