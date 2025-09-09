import { useState } from "react"
import { Upload, Download, CheckCircle2, AlertCircle, FileText, User, Calendar } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface FhirBundle {
  resourceType: string
  id: string
  type: string
  timestamp: string
  total: number
  entry: Array<{
    resource: {
      resourceType: string
      id: string
      subject?: { reference: string }
      code?: {
        coding: Array<{
          system: string
          code: string
          display: string
        }>
      }
      [key: string]: any
    }
  }>
}

const sampleProcessedBundle: FhirBundle = {
  resourceType: "Bundle",
  id: "namaste-processed-example",
  type: "collection",
  timestamp: "2024-09-09T10:30:00Z",
  total: 3,
  entry: [
    {
      resource: {
        resourceType: "Patient",
        id: "patient-001",
        name: [{ given: ["Priya"], family: "Sharma" }],
        gender: "female",
        birthDate: "1985-03-15",
        identifier: [
          {
            system: "http://namaste.org/patient-id",
            value: "PAT001"
          }
        ]
      }
    },
    {
      resource: {
        resourceType: "Condition", 
        id: "condition-001",
        subject: { reference: "Patient/patient-001" },
        code: {
          coding: [
            {
              system: "http://namaste.org/codesystem/ayurveda",
              code: "AY004",
              display: "अग्निमान्द्य (Agnimandya)"
            },
            {
              system: "http://id.who.int/icd/release/11/2019-04",
              code: "DB91",
              display: "Dyspepsia"
            }
          ]
        },
        clinicalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active"
            }
          ]
        },
        recordedDate: "2024-09-09"
      }
    },
    {
      resource: {
        resourceType: "Observation",
        id: "observation-001", 
        subject: { reference: "Patient/patient-001" },
        status: "final",
        code: {
          coding: [
            {
              system: "http://namaste.org/codesystem/ayurveda",
              code: "DOSHA_ASSESS",
              display: "Dosha Assessment"
            }
          ]
        },
        valueString: "Vata-Pitta predominant constitution with Agni mandya"
      }
    }
  ]
}

export default function FhirBundles() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processedBundle, setProcessedBundle] = useState<FhirBundle | null>(null)
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setProcessedBundle(null)
    setValidationStatus(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && (files[0].type === 'application/json' || files[0].name.endsWith('.xml'))) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const processBundle = async () => {
    if (!selectedFile) return
    
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate processing steps
    const steps = [
      { name: "Validating FHIR structure", duration: 1000 },
      { name: "Extracting NAMASTE terms", duration: 1500 },
      { name: "Mapping to ICD-11", duration: 2000 },
      { name: "Generating enhanced bundle", duration: 800 }
    ]
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration))
      setProcessingProgress(((i + 1) / steps.length) * 100)
    }
    
    setIsProcessing(false)
    setProcessedBundle(sampleProcessedBundle)
    setValidationStatus('valid')
  }

  const downloadProcessedBundle = () => {
    if (!processedBundle) return
    
    const blob = new Blob([JSON.stringify(processedBundle, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'namaste-processed-bundle.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getPatientInfo = () => {
    const patient = processedBundle?.entry.find(e => e.resource.resourceType === "Patient")?.resource
    return patient ? {
      name: patient.name?.[0] ? `${patient.name[0].given?.[0]} ${patient.name[0].family}` : "Unknown",
      gender: patient.gender || "Unknown",
      birthDate: patient.birthDate || "Unknown",
      id: patient.identifier?.[0]?.value || patient.id
    } : null
  }

  const getConditions = () => {
    return processedBundle?.entry
      .filter(e => e.resource.resourceType === "Condition")
      .map(e => e.resource) || []
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">FHIR Bundle Processing</h1>
            <p className="text-muted-foreground">
              Upload FHIR bundles to map NAMASTE terms to ICD-11 classifications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card className="card-medical">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload FHIR Bundle
                  </CardTitle>
                  <CardDescription>
                    Support for JSON and XML FHIR R4 bundles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    {selectedFile ? (
                      <div>
                        <p className="font-medium text-foreground mb-1">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Unknown type'}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-foreground mb-2">Drag and drop your FHIR bundle here</p>
                        <p className="text-sm text-muted-foreground mb-4">or</p>
                        <Button variant="outline" asChild>
                          <label>
                            <input
                              type="file"
                              accept=".json,.xml"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileSelect(file)
                              }}
                            />
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {selectedFile && (
                    <div className="mt-4">
                      <Button 
                        onClick={processBundle}
                        disabled={isProcessing}
                        className="btn-medical w-full"
                      >
                        {isProcessing ? "Processing..." : "Process Bundle"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Processing Progress */}
              {isProcessing && (
                <Card className="card-medical">
                  <CardHeader>
                    <CardTitle>Processing Bundle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={processingProgress} className="w-full mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {processingProgress < 25 ? "Validating FHIR structure..." :
                       processingProgress < 50 ? "Extracting NAMASTE terms..." :
                       processingProgress < 75 ? "Mapping to ICD-11..." :
                       "Generating enhanced bundle..."}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Data Privacy Notice */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  All uploaded data is processed locally and securely. No patient information 
                  is stored or transmitted to external servers.
                </AlertDescription>
              </Alert>
            </div>

            {/* Results Section */}
            <div>
              {processedBundle && validationStatus && (
                <div className="space-y-6">
                  {/* Validation Status */}
                  <Card className="card-medical-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {validationStatus === 'valid' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        FHIR Validation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className={validationStatus === 'valid' ? 'status-approved' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'}>
                            {validationStatus === 'valid' ? 'FHIR Compliant' : 'Validation Errors'}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-2">
                            Bundle structure and terminology mappings validated successfully
                          </p>
                        </div>
                        <Button onClick={downloadProcessedBundle} className="btn-medical">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Information */}
                  {getPatientInfo() && (
                    <Card className="card-medical">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Patient Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium">{getPatientInfo()?.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Gender</p>
                            <p className="font-medium capitalize">{getPatientInfo()?.gender}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Birth Date</p>
                            <p className="font-medium">{getPatientInfo()?.birthDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Patient ID</p>
                            <p className="font-medium">{getPatientInfo()?.id}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Mapped Diagnoses */}
                  <Card className="card-medical">
                    <CardHeader>
                      <CardTitle>Mapped Diagnoses</CardTitle>
                      <CardDescription>
                        NAMASTE terms with corresponding ICD-11 classifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getConditions().map((condition, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground">Original NAMASTE Term</p>
                                <p className="font-medium text-primary">
                                  {condition.code?.coding?.find(c => c.system?.includes('namaste'))?.display}
                                </p>
                                <Badge variant="outline" className="mt-1">
                                  {condition.code?.coding?.find(c => c.system?.includes('namaste'))?.code}
                                </Badge>
                              </div>
                              <Separator />
                              <div>
                                <p className="text-sm text-muted-foreground">Mapped ICD-11 Code</p>
                                <p className="font-medium text-foreground">
                                  {condition.code?.coding?.find(c => c.system?.includes('icd'))?.display}
                                </p>
                                <Badge variant="secondary" className="mt-1">
                                  {condition.code?.coding?.find(c => c.system?.includes('icd'))?.code}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!processedBundle && (
                <Card className="card-medical h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Upload a FHIR Bundle
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Upload your FHIR bundle to see processed results with 
                      NAMASTE to ICD-11 terminology mappings.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}