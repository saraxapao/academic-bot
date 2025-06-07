"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock } from "lucide-react"

interface MentorCardProps {
  mentor: {
    id: number
    name: string
    expertise: string[]
    type: string
    availability: string[]
    rating: number
  }
  onSelect: (mentorId: number) => void
}

export function MentorCard({ mentor, onSelect }: MentorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-600 text-white">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
              <Badge variant={mentor.type === "professor" ? "default" : "secondary"}>
                {mentor.type === "professor" ? "Professor" : "Aluno Avançado"}
              </Badge>
            </div>

            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">{mentor.rating}</span>
            </div>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {mentor.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Disponibilidade:</span>
              </div>
              <div className="text-xs text-gray-500">{mentor.availability.join(", ")}</div>
            </div>

            <Button size="sm" onClick={() => onSelect(mentor.id)} className="w-full">
              Agendar Mentoria
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
