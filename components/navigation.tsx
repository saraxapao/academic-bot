"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageCircle, BarChart3, List } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "Chat",
      icon: MessageCircle,
      description: "Converse com o assistente",
    },
    {
      href: "/agendamento",
      label: "Professores",
      icon: Calendar,
      description: "Veja todos os professores disponíveis",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      description: "Acompanhe seu progresso acadêmico",
    },
    {
      href: "/matriculas",
      label: "Matrículas",
      icon: List,
      description: "Lista de matrículas para demo",
    },
  ]

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "default" : "outline"}
                className="flex-1 justify-start"
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
