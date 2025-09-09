import { useState } from "react"
import { Calendar, Download, TrendingUp, Users, Map, BarChart3 } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Sample analytics data
const topTermsData = [
  { term: "अग्निमान्द्य (Agnimandya)", searches: 1247 },
  { term: "गृध्रसी (Gridhrasi)", searches: 892 },
  { term: "रक्तपित्त (Raktapitta)", searches: 756 },
  { term: "सुष्ठली वादम् (Suzhali Vadham)", searches: 634 },
  { term: "صداع (Suda)", searches: 578 },
  { term: "पक्षाघात (Pakshaghata)", searches: 456 },
  { term: "श्वास (Shwasa)", searches: 389 },
  { term: "कास (Kasa)", searches: 312 }
]

const mappingActivityData = [
  { date: "Sep 1", mappings: 12, validations: 8 },
  { date: "Sep 2", mappings: 15, validations: 12 },
  { date: "Sep 3", mappings: 23, validations: 18 },
  { date: "Sep 4", mappings: 18, validations: 15 },
  { date: "Sep 5", mappings: 31, validations: 24 },
  { date: "Sep 6", mappings: 28, validations: 22 },
  { date: "Sep 7", mappings: 35, validations: 28 },
  { date: "Sep 8", mappings: 42, validations: 35 },
  { date: "Sep 9", mappings: 38, validations: 31 }
]

const traditionDistributionData = [
  { name: "Ayurveda", value: 45, color: "#2A64F5" },
  { name: "Siddha", value: 30, color: "#198754" },
  { name: "Unani", value: 25, color: "#FFC107" }
]

const confidenceHeatmapData = [
  { range: "90-100%", count: 156, color: "#198754" },
  { range: "80-89%", count: 234, color: "#20C997" },
  { range: "70-79%", count: 189, color: "#FFC107" },
  { range: "60-69%", count: 145, color: "#FD7E14" },
  { range: "50-59%", count: 87, color: "#DC3545" }
]

const kpiData = {
  totalMappings: 1247,
  successRate: 87.3,
  avgConfidence: 82.5,
  activeUsers: 34
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState("7d")

  const downloadReport = (format: 'pdf' | 'csv') => {
    // Simulate report generation
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange,
      summary: kpiData,
      topTerms: topTermsData,
      mappingActivity: mappingActivityData,
      traditionDistribution: traditionDistributionData
    }
    
    if (format === 'csv') {
      // Simple CSV export simulation
      const csv = [
        'Term,Searches',
        ...topTermsData.map(item => `"${item.term}",${item.searches}`)
      ].join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `namaste-analytics-${dateRange}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else {
      // PDF would require additional library, this is a placeholder
      console.log('PDF export would generate:', reportData)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Insights into portal usage and mapping quality metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => downloadReport('csv')}>
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" onClick={() => downloadReport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-medical-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mappings</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.totalMappings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="card-medical-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="card-medical-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.avgConfidence}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+1.5%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="card-medical-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{kpiData.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Terms Searched */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Top Terms Searched</CardTitle>
                <CardDescription>Most frequently searched NAMASTE terms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topTermsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="term" 
                      width={120}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip />
                    <Bar dataKey="searches" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mapping Activity */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Mapping Activity</CardTitle>
                <CardDescription>Daily mappings created and validated</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mappingActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mappings" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Mappings Created"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="validations" 
                      stroke="hsl(var(--medical-success))" 
                      strokeWidth={2}
                      name="Validations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tradition Distribution */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Tradition Distribution</CardTitle>
                <CardDescription>Percentage of mappings by medical tradition</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={traditionDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {traditionDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Confidence Score Distribution */}
            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Mapping Confidence Distribution</CardTitle>
                <CardDescription>Distribution of confidence scores across mappings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceHeatmapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary Insights */}
          <Card className="card-medical-elevated mt-8">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">High Performance Areas</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Digestive disorders show highest mapping accuracy (92%)</li>
                    <li>• Ayurvedic terms have strong ICD-11 correlations</li>
                    <li>• User validation rate has improved by 15%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Areas for Improvement</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Complex multi-system conditions need review</li>
                    <li>• Unani respiratory terms require expert validation</li>
                    <li>• Confidence scores below 70% need manual review</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}