import { useState } from "react"
import { Download, Edit, Trash2, Filter, Search, CheckCircle2, Clock, Zap } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample mapping data
const sampleMappings = [
  {
    id: "1",
    sourceCode: "AY004",
    sourceTerm: "अग्निमान्द्य (Agnimandya)",
    targetCode: "DB91",
    targetTerm: "Dyspepsia",
    confidence: 85,
    status: "approved",
    reviewer: "Dr. Anya Sharma",
    tradition: "Ayurveda",
    mappedDate: "2024-09-08",
    notes: "Strong semantic correlation between digestive fire weakness and functional dyspepsia"
  },
  {
    id: "2", 
    sourceCode: "AY001",
    sourceTerm: "गृध्रसी (Gridhrasi)",
    targetCode: "8B91",
    targetTerm: "Sciatica",
    confidence: 92,
    status: "approved",
    reviewer: "Dr. Rajesh Kumar",
    tradition: "Ayurveda",
    mappedDate: "2024-09-07",
    notes: "Direct anatomical and symptomatic correspondence"
  },
  {
    id: "3",
    sourceCode: "SI001", 
    sourceTerm: "सुष्ठली वादम् (Suzhali Vadham)",
    targetCode: "FA20",
    targetTerm: "Rheumatoid arthritis",
    confidence: 78,
    status: "pending",
    reviewer: null,
    tradition: "Siddha",
    mappedDate: "2024-09-09",
    notes: "Joint inflammation patterns match, requires clinical validation"
  },
  {
    id: "4",
    sourceCode: "UN001",
    sourceTerm: "صداع (Suda)",
    targetCode: "8A80",
    targetTerm: "Headache",
    confidence: 95,
    status: "auto-suggested",
    reviewer: null,
    tradition: "Unani",
    mappedDate: "2024-09-09",
    notes: "AI-generated mapping with high confidence score"
  },
  {
    id: "5",
    sourceCode: "AY003",
    sourceTerm: "रक्तपित्त (Raktapitta)",
    targetCode: "3A10",
    targetTerm: "Bleeding disorders",
    confidence: 74,
    status: "pending",
    reviewer: null,
    tradition: "Ayurveda", 
    mappedDate: "2024-09-08",
    notes: "Broad category mapping requires specific subtype classification"
  }
]

const statusConfig = {
  approved: { label: "Approved", icon: CheckCircle2, className: "status-approved" },
  pending: { label: "Pending Validation", icon: Clock, className: "status-pending" },
  "auto-suggested": { label: "Auto-suggested", icon: Zap, className: "status-auto" }
}

export default function ConceptMaps() {
  const [mappings, setMappings] = useState(sampleMappings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [traditionFilter, setTraditionFilter] = useState("all")

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = searchTerm === "" || 
      mapping.sourceTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.targetTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.sourceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.targetCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || mapping.status === statusFilter
    const matchesTradition = traditionFilter === "all" || mapping.tradition === traditionFilter
    
    return matchesSearch && matchesStatus && matchesTradition
  })

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 dark:text-green-400"
    if (confidence >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const handleApprove = (id: string) => {
    setMappings(prev => 
      prev.map(mapping => 
        mapping.id === id 
          ? { ...mapping, status: "approved", reviewer: "Dr. Anya Sharma" }
          : mapping
      )
    )
  }

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      resourceType: "ConceptMap",
      id: "namaste-icd11-mapping",
      version: "1.0.0",
      name: "NAMASTE to ICD-11 Terminology Mapping",
      status: "active",
      date: new Date().toISOString(),
      publisher: "NAMASTE Portal",
      group: filteredMappings.map(mapping => ({
        source: `http://namaste.org/codesystem/${mapping.tradition.toLowerCase()}`,
        target: "http://id.who.int/icd/release/11/2019-04",
        element: [
          {
            code: mapping.sourceCode,
            display: mapping.sourceTerm,
            target: [
              {
                code: mapping.targetCode,
                display: mapping.targetTerm,
                equivalence: mapping.confidence >= 80 ? "equivalent" : "wider",
                comment: mapping.notes
              }
            ]
          }
        ]
      }))
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'namaste-conceptmap.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">ConceptMap Manager</h1>
              <p className="text-muted-foreground">
                Manage and validate terminology mappings between NAMASTE and ICD-11
              </p>
            </div>
            <Button onClick={handleExport} className="btn-medical">
              <Download className="w-4 h-4 mr-2" />
              Export ConceptMap (JSON)
            </Button>
          </div>

          {/* Filters */}
          <Card className="card-medical mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mappings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={traditionFilter} onValueChange={setTraditionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Tradition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Traditions</SelectItem>
                    <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="Siddha">Siddha</SelectItem>
                    <SelectItem value="Unani">Unani</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="auto-suggested">Auto-suggested</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground flex items-center">
                  Showing {filteredMappings.length} of {mappings.length} mappings
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mappings Table */}
          <Card className="card-medical">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Term (NAMASTE)</TableHead>
                  <TableHead>Target Term (ICD-11)</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMappings.map((mapping) => {
                  const StatusIcon = statusConfig[mapping.status as keyof typeof statusConfig]?.icon
                  return (
                    <TableRow key={mapping.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{mapping.sourceTerm}</div>
                          <div className="text-sm text-muted-foreground">{mapping.sourceCode}</div>
                          <Badge variant="outline" className="mt-1 text-xs">{mapping.tradition}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{mapping.targetTerm}</div>
                          <div className="text-sm text-muted-foreground">{mapping.targetCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-bold ${getConfidenceColor(mapping.confidence)}`}>
                          {mapping.confidence}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[mapping.status as keyof typeof statusConfig]?.className} flex items-center gap-1 w-fit`}>
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {statusConfig[mapping.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {mapping.reviewer || (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {mapping.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(mapping.id)}
                              className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}