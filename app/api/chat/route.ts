import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Simulação de base de dados de mentores
const mentors = [
  {
    id: 1,
    name: "Prof. Ana Silva",
    expertise: ["Engenharia Civil", "TCC", "Estruturas"],
    type: "professor",
    availability: ["Segunda 14:00-16:00", "Quarta 10:00-12:00"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "João Santos",
    expertise: ["Matemática", "Cálculo", "Álgebra Linear"],
    type: "aluno_avancado",
    availability: ["Terça 16:00-18:00", "Quinta 14:00-16:00"],
    rating: 4.6,
  },
  {
    id: 3,
    name: "Prof. Carlos Lima",
    expertise: ["Programação", "Python", "Algoritmos"],
    type: "professor",
    availability: ["Segunda 10:00-12:00", "Sexta 14:00-16:00"],
    rating: 4.9,
  },
  {
    id: 4,
    name: "Maria Oliveira",
    expertise: ["Química", "Química Orgânica", "Laboratório"],
    type: "aluno_avancado",
    availability: ["Quarta 14:00-16:00", "Sexta 10:00-12:00"],
    rating: 4.7,
  },
  {
    id: 5,
    name: "Prof. Roberto Costa",
    expertise: ["Carreira Acadêmica", "Pesquisa", "Mestrado"],
    type: "professor",
    availability: ["Terça 14:00-16:00", "Quinta 10:00-12:00"],
    rating: 4.8,
  },
]

const studyTips = [
  "Técnica Pomodoro: Estude por 25 minutos, depois faça uma pausa de 5 minutos.",
  "Crie um cronograma de estudos e siga-o consistentemente.",
  "Use mapas mentais para organizar informações complexas.",
  "Ensine o que aprendeu para alguém - isso reforça seu conhecimento.",
  "Faça resumos após cada sessão de estudo.",
  "Elimine distrações do seu ambiente de estudo.",
]

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `Você é um assistente de mentorias acadêmicas para estudantes universitários. 
    Seu objetivo é ajudar estudantes a encontrarem mentores adequados e agendar sessões de mentoria.
    
    Seja amigável, profissional e focado em ajudar o estudante. Faça perguntas para entender:
    1. A área de interesse/disciplina
    2. O tipo de ajuda necessária (dúvidas específicas, TCC, orientação de carreira)
    3. O nível de urgência
    
    Sempre ofereça opções claras e seja proativo em sugerir próximos passos.`,
    tools: {
      findMentors: tool({
        description: "Encontrar mentores baseado na área de interesse do estudante",
        parameters: z.object({
          subject: z.string().describe("A disciplina ou área de interesse"),
          mentorshipType: z.string().describe("Tipo de mentoria: duvidas, tcc, carreira, etc."),
        }),
        execute: async ({ subject, mentorshipType }) => {
          const relevantMentors = mentors.filter((mentor) =>
            mentor.expertise.some(
              (exp) =>
                exp.toLowerCase().includes(subject.toLowerCase()) || subject.toLowerCase().includes(exp.toLowerCase()),
            ),
          )

          return {
            mentors: relevantMentors,
            totalFound: relevantMentors.length,
          }
        },
      }),
      scheduleSession: tool({
        description: "Agendar uma sessão de mentoria com um mentor específico",
        parameters: z.object({
          mentorId: z.number().describe("ID do mentor escolhido"),
          preferredTime: z.string().describe("Horário preferido pelo estudante"),
          topic: z.string().describe("Tópico ou assunto da mentoria"),
        }),
        execute: async ({ mentorId, preferredTime, topic }) => {
          const mentor = mentors.find((m) => m.id === mentorId)
          if (!mentor) {
            return { success: false, message: "Mentor não encontrado" }
          }

          return {
            success: true,
            message: `Sessão agendada com ${mentor.name}`,
            details: {
              mentor: mentor.name,
              time: preferredTime,
              topic: topic,
              meetingLink: "https://meet.google.com/abc-defg-hij",
            },
          }
        },
      }),
      getStudyTip: tool({
        description: "Fornecer uma dica de estudo aleatória",
        parameters: z.object({}),
        execute: async () => {
          const randomTip = studyTips[Math.floor(Math.random() * studyTips.length)]
          return { tip: randomTip }
        },
      }),
      submitFeedback: tool({
        description: "Coletar feedback sobre uma sessão de mentoria",
        parameters: z.object({
          rating: z.number().min(1).max(5).describe("Avaliação de 1 a 5"),
          comments: z.string().optional().describe("Comentários adicionais"),
        }),
        execute: async ({ rating, comments }) => {
          return {
            success: true,
            message: "Obrigado pelo seu feedback! Isso nos ajuda a melhorar o serviço.",
            rating,
            comments,
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
