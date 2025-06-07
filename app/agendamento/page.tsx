"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Clock, MapPin, BookOpen, Search, Filter, Calendar, MessageSquare, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"

// Base de dados expandida de professores
const professors = [
  {
    id: 1,
    name: "Prof. Ana Silva",
    title: "Doutora em Engenharia Civil",
    department: "Engenharia Civil",
    expertise: ["Estruturas", "Concreto Armado", "TCC", "Projetos Estruturais"],
    rating: 4.8,
    totalReviews: 45,
    experience: "15 anos",
    availability: ["Segunda-feira: 14:00-16:00", "Quarta-feira: 10:00-12:00", "Sexta-feira: 14:00-16:00"],
    location: "Sala 201 - Bloco A",
    bio: "Especialista em estruturas de concreto armado com vasta experiência em projetos de grande porte. Orientadora de TCC há mais de 10 anos.",
    reviews: [
      {
        id: 1,
        student: "João M.",
        rating: 5,
        comment:
          "Excelente professora! Me ajudou muito com meu TCC sobre estruturas metálicas. Muito didática e paciente.",
        date: "2024-01-15",
      },
      {
        id: 2,
        student: "Maria S.",
        rating: 5,
        comment: "Aulas de reforço em concreto armado foram fundamentais para minha aprovação. Recomendo!",
        date: "2024-01-10",
      },
      {
        id: 3,
        student: "Pedro L.",
        rating: 4,
        comment: "Muito conhecimento técnico. Às vezes um pouco rápida nas explicações, mas sempre disposta a repetir.",
        date: "2024-01-05",
      },
    ],
  },
  {
    id: 2,
    name: "Prof. Carlos Lima",
    title: "Mestre em Ciência da Computação",
    department: "Ciência da Computação",
    expertise: ["Python", "Algoritmos", "Estruturas de Dados", "Machine Learning"],
    rating: 4.9,
    totalReviews: 62,
    experience: "12 anos",
    availability: ["Segunda-feira: 10:00-12:00", "Terça-feira: 14:00-16:00", "Quinta-feira: 16:00-18:00"],
    location: "Lab. Informática - Bloco C",
    bio: "Professor apaixonado por programação e inteligência artificial. Especialista em Python e desenvolvimento de algoritmos eficientes.",
    reviews: [
      {
        id: 1,
        student: "Ana R.",
        rating: 5,
        comment: "Melhor professor de programação! Conseguiu me fazer entender algoritmos complexos de forma simples.",
        date: "2024-01-20",
      },
      {
        id: 2,
        student: "Lucas T.",
        rating: 5,
        comment: "Aulas práticas excelentes. Aprendi Python do zero e agora me sinto confiante para programar.",
        date: "2024-01-18",
      },
      {
        id: 3,
        student: "Carla F.",
        rating: 4,
        comment: "Muito bom para tirar dúvidas sobre estruturas de dados. Sempre disponível para ajudar.",
        date: "2024-01-12",
      },
    ],
  },
  {
    id: 3,
    name: "Prof. Roberto Costa",
    title: "Doutor em Administração",
    department: "Administração",
    expertise: ["Gestão de Projetos", "Empreendedorismo", "Carreira", "TCC"],
    rating: 4.7,
    totalReviews: 38,
    experience: "20 anos",
    availability: ["Terça-feira: 14:00-16:00", "Quinta-feira: 10:00-12:00", "Sexta-feira: 16:00-18:00"],
    location: "Sala 305 - Bloco B",
    bio: "Consultor empresarial e professor universitário. Especialista em orientação de carreira e desenvolvimento de projetos empreendedores.",
    reviews: [
      {
        id: 1,
        student: "Fernanda K.",
        rating: 5,
        comment: "Orientação de TCC impecável! Me ajudou a estruturar todo o trabalho e dar foco na pesquisa.",
        date: "2024-01-22",
      },
      {
        id: 2,
        student: "Ricardo M.",
        rating: 4,
        comment: "Ótimas dicas sobre carreira e mercado de trabalho. Visão muito prática e realista.",
        date: "2024-01-16",
      },
      {
        id: 3,
        student: "Julia S.",
        rating: 5,
        comment: "Professor inspirador! Me motivou a seguir com meu projeto de startup.",
        date: "2024-01-08",
      },
    ],
  },
  {
    id: 4,
    name: "Prof. Mariana Santos",
    title: "Doutora em Química",
    department: "Química",
    expertise: ["Química Orgânica", "Química Analítica", "Laboratório", "Pesquisa"],
    rating: 4.6,
    totalReviews: 29,
    experience: "8 anos",
    availability: ["Segunda-feira: 16:00-18:00", "Quarta-feira: 14:00-16:00", "Sexta-feira: 10:00-12:00"],
    location: "Lab. Química - Bloco D",
    bio: "Pesquisadora em química orgânica com foco em síntese de compostos bioativos. Especialista em técnicas analíticas avançadas.",
    reviews: [
      {
        id: 1,
        student: "Gabriel P.",
        rating: 5,
        comment: "Aulas de laboratório excelentes! Aprendi muito sobre técnicas de síntese orgânica.",
        date: "2024-01-19",
      },
      {
        id: 2,
        student: "Beatriz L.",
        rating: 4,
        comment: "Muito boa para explicar reações complexas. Às vezes falta um pouco mais de tempo nas consultorias.",
        date: "2024-01-14",
      },
      {
        id: 3,
        student: "Diego R.",
        rating: 5,
        comment: "Me ajudou muito com meu projeto de iniciação científica. Professora dedicada e competente.",
        date: "2024-01-11",
      },
    ],
  },
  {
    id: 5,
    name: "Prof. Eduardo Ferreira",
    title: "Doutor em Matemática",
    department: "Matemática",
    expertise: ["Cálculo", "Álgebra Linear", "Estatística", "Matemática Aplicada"],
    rating: 4.5,
    totalReviews: 51,
    experience: "18 anos",
    availability: ["Segunda-feira: 08:00-10:00", "Quarta-feira: 16:00-18:00", "Quinta-feira: 14:00-16:00"],
    location: "Sala 102 - Bloco A",
    bio: "Professor de matemática com vasta experiência em ensino de cálculo e álgebra. Especialista em aplicações práticas da matemática.",
    reviews: [
      {
        id: 1,
        student: "Amanda C.",
        rating: 4,
        comment: "Muito bom para explicar cálculo. Consegui finalmente entender derivadas e integrais!",
        date: "2024-01-21",
      },
      {
        id: 2,
        student: "Thiago B.",
        rating: 5,
        comment: "Salvou meu semestre em álgebra linear! Explicações claras e muitos exercícios práticos.",
        date: "2024-01-17",
      },
      {
        id: 3,
        student: "Camila D.",
        rating: 4,
        comment: "Professor paciente e dedicado. Me ajudou muito com estatística aplicada.",
        date: "2024-01-13",
      },
    ],
  },
]

const departments = ["Todos", "Engenharia Civil", "Ciência da Computação", "Administração", "Química", "Matemática"]

export default function AgendamentoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Todos")
  const [selectedProfessor, setSelectedProfessor] = useState<(typeof professors)[0] | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  const filteredProfessors = professors.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === "Todos" || prof.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const handleSchedule = (professor: (typeof professors)[0]) => {
    setSelectedProfessor(professor)
    setShowScheduleDialog(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Agendamento de Mentorias</h1>
          <p className="text-gray-600">Encontre o professor ideal para suas necessidades acadêmicas</p>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{professors.length}</div>
              <div className="text-sm text-gray-600">Professores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{departments.length - 1}</div>
              <div className="text-sm text-gray-600">Departamentos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">4.7</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">225</div>
              <div className="text-sm text-gray-600">Avaliações</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome ou área de expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professors List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfessors.map((professor) => (
            <Card key={professor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {professor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{professor.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{professor.title}</p>
                    <Badge variant="secondary" className="mb-2">
                      {professor.department}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(professor.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{professor.rating}</span>
                      <span className="text-sm text-gray-500">({professor.totalReviews} avaliações)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Áreas de Expertise
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {professor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Disponibilidade
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {professor.availability.map((time, index) => (
                        <div key={index}>{time}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Localização
                    </h4>
                    <p className="text-sm text-gray-600">{professor.location}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Sobre</h4>
                    <p className="text-sm text-gray-600">{professor.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Últimas Avaliações</h4>
                    <div className="space-y-2">
                      {professor.reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{review.student}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSchedule(professor)} className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Mentoria
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Ver Todas as Avaliações</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Avaliações - {professor.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {professor.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.student}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule Dialog */}
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Agendar Mentoria</DialogTitle>
            </DialogHeader>
            {selectedProfessor && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {selectedProfessor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedProfessor.name}</h3>
                    <p className="text-sm text-gray-600">{selectedProfessor.department}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Assunto da Mentoria</Label>
                    <Input id="topic" placeholder="Ex: Dúvidas sobre Cálculo II" />
                  </div>

                  <div>
                    <Label htmlFor="schedule">Horário Preferido</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProfessor.availability.map((time, index) => (
                          <SelectItem key={index} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição (Opcional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva brevemente suas dúvidas ou objetivos para a mentoria..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => setShowScheduleDialog(false)} variant="outline" className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => {
                        setShowScheduleDialog(false)
                        // Aqui você implementaria a lógica de agendamento
                        alert("Mentoria agendada com sucesso!")
                      }}
                      className="flex-1"
                    >
                      Confirmar Agendamento
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {filteredProfessors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum professor encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
