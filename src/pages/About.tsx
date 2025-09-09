import { BookOpen, Users, Target, Award, Github, Mail, Globe } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Dr. Anya Sharma",
    role: "Clinical Lead & Ayurveda Expert",
    bio: "15+ years in traditional medicine research with expertise in Ayurvedic diagnostics and modern clinical integration.",
    image: "👩‍⚕️"
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Siddha Medicine Specialist", 
    bio: "Leading researcher in Siddha medicine with focus on standardization of traditional diagnostic methods.",
    image: "👨‍⚕️"
  },
  {
    name: "Dr. Fatima Al-Zahra",
    role: "Unani Medicine Expert",
    bio: "Renowned practitioner and researcher in Unani medicine with extensive knowledge of classical texts.",
    image: "👩‍🔬"
  },
  {
    name: "Alex Chen",
    role: "Lead Developer & FHIR Architect",
    bio: "Healthcare technology specialist with deep expertise in FHIR standards and medical informatics.",
    image: "👨‍💻"
  }
]

const milestones = [
  {
    year: "2023",
    title: "Project Inception",
    description: "NAMASTE initiative launched with support from traditional medicine institutions"
  },
  {
    year: "2024",
    title: "Initial Mapping",
    description: "First 1000 terminology mappings created and validated by expert panel"
  },
  {
    year: "2024",
    title: "Portal Launch",
    description: "NAMASTE Terminology Mapping Portal released with full FHIR R4 support"
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Planned integration with WHO ICD-11 maintenance platform"
  }
]

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">न</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About NAMASTE Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bridging traditional Indian medicine with modern healthcare standards through 
              precise terminology mapping and international classification integration.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-medical-elevated text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create accurate, clinically validated mappings between traditional 
                  Indian medicine terminologies and international healthcare standards.
                </p>
              </CardContent>
            </Card>

            <Card className="card-medical-elevated text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A globally recognized platform that seamlessly integrates traditional 
                  medicine knowledge with modern healthcare informatics.
                </p>
              </CardContent>
            </Card>

            <Card className="card-medical-elevated text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enabling interoperability between traditional and modern healthcare 
                  systems for better patient outcomes worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What is NAMASTE */}
          <Card className="card-medical mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                What is NAMASTE?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">NAMASTE</strong> (Network for Ayurveda, Medicine, Alternative, 
                Siddha, Traditional, and Emerging healthcare) is a comprehensive initiative to standardize 
                and map traditional Indian medicine terminologies to international healthcare classifications.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Traditional Systems Covered</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Ayurveda</Badge>
                    <Badge variant="outline">Siddha</Badge>
                    <Badge variant="outline">Unani</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">International Standards</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">ICD-11</Badge>
                    <Badge variant="outline">SNOMED CT</Badge>
                    <Badge variant="outline">FHIR R4</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Expert Validation</Badge>
                    <Badge variant="outline">AI-Assisted Mapping</Badge>
                    <Badge variant="outline">Semantic Analysis</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Expert Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-medical text-center">
                  <CardHeader>
                    <div className="text-4xl mb-2">{member.image}</div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <Card className="card-medical mb-12">
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Key milestones in the NAMASTE journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">
                          {milestone.year.slice(-2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{milestone.year}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact & Collaboration */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We welcome collaboration with traditional medicine institutions, 
                  healthcare organizations, and technology partners.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Partner Organizations:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• All India Institute of Ayurveda</div>
                    <div>• National Institute of Siddha</div>
                    <div>• Central Council for Research in Unani Medicine</div>
                    <div>• WHO Traditional Medicine Programme</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  For research collaborations, technical support, or general inquiries 
                  about the NAMASTE platform.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    contact@namaste-portal.org
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Github className="w-4 h-4 mr-2" />
                    github.com/namaste-portal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    www.namaste-portal.org
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}