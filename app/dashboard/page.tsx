"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  GraduationCap,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react"
import { students, getStudentStats, getRecentChatHistory } from "@/lib/demo-data"

export default function DashboardPage() {
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showMatriculas, setShowMatriculas] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    const student = students.find((s) => s.registrationNumber === registrationNumber)

    if (student) {
      setSelectedStudent(student)
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Matrícula não encontrada. Verifique o número e tente novamente.")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSelectedStudent(null)
    setRegistrationNumber("")
    setError("")
  }

  // Lista de matrículas disponíveis para demonstração
  const availableRegistrations = students.map((student) => ({
    registration: student.registrationNumber,
    name: student.name,
    course: student.course,
  }))

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto mt-20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Acesso ao Dashboard</h1>
            <p className="text-gray-600">Digite sua matrícula para acessar seus dados acadêmicos</p>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Login do Estudante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Matrícula
                </label>
                <Input
                  id="registration"
                  type="text"
                  placeholder="Ex: 2021001234"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

              <Button onClick={handleLogin} className="w-full" disabled={!registrationNumber.trim()}>
                <LogIn className="h-4 w-4 mr-2" />
                Acessar Dashboard
              </Button>

              {/* Demo Matriculas */}
              <div className="mt-6">
                <Button variant="outline" onClick={() => setShowMatriculas(!showMatriculas)} className="w-full">
                  {showMatriculas ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showMatriculas ? "Ocultar" : "Ver"} Matrículas de Demonstração
                </Button>

                {showMatriculas && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Matrículas Disponíveis para Demo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {availableRegistrations.map((student, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-blue-600">{student.registration}</div>
                              <div className="text-sm text-gray-600">{student.name}</div>
                              <div className="text-xs text-gray-500">{student.course}</div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setRegistrationNumber(student.registration)
                                setShowMatriculas(false)
                              }}
                            >
                              Usar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation back */}
          <div className="mt-6">
            <Navigation />
          </div>
        </div>
      </div>
    )
  }

  const studentStats = getStudentStats(selectedStudent.id)
  const recentChats = getRecentChatHistory(selectedStudent.id)

  if (!studentStats) {
    return <div>Erro ao carregar dados do estudante</div>
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600"
    if (grade >= 7) return "text-blue-600"
    if (grade >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      cursando: "default",
      aprovado: "secondary",
      reprovado: "destructive",
      trancado: "outline",
    } as const

    return variants[status as keyof typeof variants] || "default"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard do Estudante</h1>
          <p className="text-gray-600">Acompanhe seu progresso acadêmico e mentorias</p>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Logout Button */}
        <div className="flex justify-end mb-6">
          <Button variant="outline" onClick={handleLogout}>
            <LogIn className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Student Profile */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-blue-600 text-white text-xl">
                  {selectedStudent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                <p className="text-gray-600 mb-2">{selectedStudent.email}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Curso:</span>
                    <p className="font-medium">{selectedStudent.course}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Semestre:</span>
                    <p className="font-medium">{selectedStudent.semester}º</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Matrícula:</span>
                    <p className="font-medium">{selectedStudent.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">CRA:</span>
                    <p className="font-medium text-blue-600">{selectedStudent.gpa}</p>
                  </div>
                </div>
              </div>
              <Badge variant={selectedStudent.status === "ativo" ? "default" : "secondary"}>
                {selectedStudent.status.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{studentStats.approvedSubjects}</div>
              <div className="text-sm text-gray-600">Disciplinas Aprovadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{studentStats.currentSubjects}</div>
              <div className="text-sm text-gray-600">Disciplinas Cursando</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{studentStats.completedSessions}</div>
              <div className="text-sm text-gray-600">Mentorias Realizadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{studentStats.averageRating}</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subjects">Disciplinas</TabsTrigger>
            <TabsTrigger value="mentoring">Mentorias</TabsTrigger>
            <TabsTrigger value="chat">Histórico de Chat</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
          </TabsList>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Disciplinas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedStudent.subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm text-gray-600">
                          {subject.code} - {subject.professor}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{subject.credits} créditos</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{subject.semester}º semestre</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusBadge(subject.status)}>{subject.status}</Badge>
                        {subject.grade && (
                          <div className={`text-lg font-bold mt-1 ${getGradeColor(subject.grade)}`}>
                            {subject.grade.toFixed(1)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentoring Tab */}
          <TabsContent value="mentoring">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Histórico de Mentorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedStudent.mentoringSessions.map((session) => (
                    <div key={session.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{session.subject}</h3>
                        <p className="text-sm text-gray-600">com {session.mentorName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {session.date} às {session.time}
                          </span>
                        </div>
                        {session.notes && <p className="text-sm text-gray-600 mt-2">{session.notes}</p>}
                        {session.feedback && (
                          <div className="mt-2 p-2 bg-gray-50 rounded">
                            <p className="text-sm text-gray-700">{session.feedback}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            session.status === "concluido"
                              ? "secondary"
                              : session.status === "agendado"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {session.status}
                        </Badge>
                        {session.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat History Tab */}
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Histórico de Conversas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="space-y-2 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{chat.category}</Badge>
                        <span className="text-xs text-gray-500">{new Date(chat.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm">
                            <strong>Estudante:</strong> {chat.message}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm">
                            <strong>MentorBot:</strong> {chat.response}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Progresso Acadêmico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Créditos Concluídos</span>
                        <span>{studentStats.totalCredits} / 240</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(studentStats.totalCredits / 240) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Semestre Atual</span>
                        <span>{selectedStudent.semester} / 10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(selectedStudent.semester / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Desempenho por Semestre
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(selectedStudent.semester)].map((_, index) => {
                      const semester = index + 1
                      const semesterSubjects = selectedStudent.subjects.filter(
                        (s) => s.semester === semester && s.grade,
                      )
                      const avgGrade =
                        semesterSubjects.length > 0
                          ? semesterSubjects.reduce((sum, s) => sum + (s.grade || 0), 0) / semesterSubjects.length
                          : 0

                      return (
                        <div key={semester} className="flex items-center justify-between">
                          <span className="text-sm">{semester}º Semestre</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getGradeColor(avgGrade)}`}>
                              {avgGrade > 0 ? avgGrade.toFixed(1) : "Em andamento"}
                            </span>
                            {avgGrade > 0 && (
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${avgGrade >= 9 ? "bg-green-500" : avgGrade >= 7 ? "bg-blue-500" : avgGrade >= 6 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${(avgGrade / 10) * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
