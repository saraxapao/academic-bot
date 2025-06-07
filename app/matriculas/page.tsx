"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Copy, User, GraduationCap, Calendar, Star } from "lucide-react"
import { students } from "@/lib/demo-data"
import Link from "next/link"

export default function MatriculasPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aqui você poderia adicionar uma notificação de sucesso
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Lista de Matrículas</h1>
          <p className="text-gray-600">Matrículas disponíveis para demonstração do sistema</p>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Instructions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Como usar</h3>
              <p className="text-gray-600">
                Copie qualquer matrícula abaixo e use no{" "}
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Dashboard
                </Link>{" "}
                para acessar os dados do estudante
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <Badge variant={student.status === "ativo" ? "default" : "secondary"} className="mt-1">
                      {student.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Matrícula */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">Matrícula:</span>
                        <div className="text-xl font-bold text-blue-600">{student.registrationNumber}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(student.registrationNumber)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Curso:</span>
                      </div>
                      <p className="text-sm font-medium">{student.course}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Semestre:</span>
                      </div>
                      <p className="text-sm font-medium">{student.semester}º</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-500">CRA:</span>
                      </div>
                      <p className="text-sm font-medium text-blue-600">{student.gpa}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Mentorias:</span>
                      </div>
                      <p className="text-sm font-medium">{student.mentoringSessions.length}</p>
                    </div>
                  </div>

                  {/* Quick Access */}
                  <Button asChild className="w-full">
                    <Link href={`/dashboard?matricula=${student.registrationNumber}`}>Acessar Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resumo das Matrículas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {students.map((student, index) => (
                <div key={student.id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-bold text-blue-600">{student.registrationNumber}</div>
                  <div className="text-sm text-gray-600">{student.name.split(" ")[0]}</div>
                  <div className="text-xs text-gray-500">{student.course}</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 text-xs"
                    onClick={() => copyToClipboard(student.registrationNumber)}
                  >
                    Copiar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
