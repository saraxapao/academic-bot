"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, BookOpen, Users, Calendar, Star, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function AcademicMentorshipChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    maxSteps: 3,
  })
  const [showWelcome, setShowWelcome] = useState(true)

  const quickActions = [
    "Preciso de ajuda com Cálculo",
    "Quero orientação para meu TCC",
    "Busco mentoria em Programação",
    "Preciso de dicas de carreira acadêmica",
  ]

  const handleQuickAction = (action: string) => {
    setShowWelcome(false)
    handleSubmit(new Event("submit") as any, {
      data: { message: action },
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowWelcome(false)
    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">MentorBot Acadêmico</h1>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button asChild>
              <Link href="/agendamento">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Professores Disponíveis
              </Link>
            </Button>
          </div>
          <p className="text-gray-600">Conectando estudantes com mentores especializados</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">50+</div>
              <div className="text-sm text-gray-600">Mentores Disponíveis</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">200+</div>
              <div className="text-sm text-gray-600">Sessões Agendadas</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">4.8</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Assistente de Mentorias
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {showWelcome && messages.length === 0 && (
              <div className="text-center space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Olá! Como posso ajudá-lo hoje?</h3>
                  <p className="text-gray-600 mb-4">
                    Sou seu assistente para encontrar mentores acadêmicos. Posso ajudá-lo com:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>• Dúvidas em disciplinas</div>
                    <div>• Orientação de TCC</div>
                    <div>• Carreira acadêmica</div>
                    <div>• Dicas de estudo</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Ações rápidas:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="text-left justify-start"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[80%]`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">MB</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.role === "assistant" && (
                      <div className="text-xs opacity-70 mt-1">MentorBot • {new Date().toLocaleTimeString()}</div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-600 text-white text-xs">EU</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-xs">MB</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t bg-gray-50">
            <form onSubmit={onSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Digite sua mensagem ou dúvida..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Match Inteligente</h3>
              </div>
              <p className="text-sm text-gray-600">
                Encontramos o mentor ideal baseado na sua área de interesse e necessidade.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Agendamento Fácil</h3>
              </div>
              <p className="text-sm text-gray-600">
                Agende sessões diretamente pelo chat com integração ao Google Calendar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Dicas de Estudo</h3>
              </div>
              <p className="text-sm text-gray-600">
                Receba dicas personalizadas para melhorar sua produtividade acadêmica.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
