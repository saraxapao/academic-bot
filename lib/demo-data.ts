// Base de dados de demonstração para o sistema de mentorias

export interface Student {
  id: number
  name: string
  email: string
  course: string
  semester: number
  registrationNumber: string
  avatar?: string
  gpa: number
  status: "ativo" | "trancado" | "formado"
  subjects: StudentSubject[]
  mentoringSessions: MentoringSession[]
  chatHistory: ChatMessage[]
}

export interface StudentSubject {
  id: number
  name: string
  code: string
  semester: number
  grade?: number
  status: "cursando" | "aprovado" | "reprovado" | "trancado"
  professor: string
  credits: number
}

export interface MentoringSession {
  id: number
  mentorId: number
  mentorName: string
  subject: string
  date: string
  time: string
  status: "agendado" | "concluido" | "cancelado"
  rating?: number
  feedback?: string
  notes?: string
}

export interface ChatMessage {
  id: number
  message: string
  response: string
  timestamp: string
  category: "duvida" | "agendamento" | "feedback" | "geral"
}

// Dados dos estudantes
export const students: Student[] = [
  {
    id: 1,
    name: "Ana Carolina Silva",
    email: "ana.silva@universidade.edu.br",
    course: "Engenharia Civil",
    semester: 6,
    registrationNumber: "2021001234",
    gpa: 8.5,
    status: "ativo",
    subjects: [
      {
        id: 1,
        name: "Estruturas de Concreto Armado",
        code: "ECV301",
        semester: 6,
        grade: 9.2,
        status: "cursando",
        professor: "Prof. Ana Silva",
        credits: 4,
      },
      {
        id: 2,
        name: "Mecânica dos Solos",
        code: "ECV302",
        semester: 6,
        grade: 7.8,
        status: "cursando",
        professor: "Prof. Roberto Lima",
        credits: 4,
      },
      {
        id: 3,
        name: "Cálculo III",
        code: "MAT201",
        semester: 5,
        grade: 8.7,
        status: "aprovado",
        professor: "Prof. Eduardo Ferreira",
        credits: 6,
      },
      {
        id: 4,
        name: "Resistência dos Materiais",
        code: "ECV201",
        semester: 5,
        grade: 9.1,
        status: "aprovado",
        professor: "Prof. Carlos Santos",
        credits: 4,
      },
      {
        id: 5,
        name: "Física II",
        code: "FIS102",
        semester: 4,
        grade: 6.5,
        status: "aprovado",
        professor: "Prof. Maria Oliveira",
        credits: 4,
      },
    ],
    mentoringSessions: [
      {
        id: 1,
        mentorId: 1,
        mentorName: "Prof. Ana Silva",
        subject: "Estruturas de Concreto Armado",
        date: "2024-01-25",
        time: "14:00",
        status: "agendado",
        notes: "Dúvidas sobre dimensionamento de vigas",
      },
      {
        id: 2,
        mentorId: 1,
        mentorName: "Prof. Ana Silva",
        subject: "TCC - Estruturas Metálicas",
        date: "2024-01-15",
        time: "14:00",
        status: "concluido",
        rating: 5,
        feedback: "Excelente orientação! Consegui definir melhor o escopo do meu TCC.",
        notes: "Orientação sobre metodologia de pesquisa",
      },
    ],
    chatHistory: [
      {
        id: 1,
        message: "Preciso de ajuda com Estruturas de Concreto Armado",
        response:
          "Encontrei a Prof. Ana Silva, especialista em estruturas. Ela tem disponibilidade na segunda-feira às 14:00. Gostaria de agendar?",
        timestamp: "2024-01-20 10:30:00",
        category: "duvida",
      },
      {
        id: 2,
        message: "Sim, quero agendar com a Prof. Ana Silva",
        response:
          "Perfeito! Agendei sua mentoria com a Prof. Ana Silva para segunda-feira, 25/01 às 14:00. Você receberá um lembrete por email.",
        timestamp: "2024-01-20 10:32:00",
        category: "agendamento",
      },
    ],
  },
  {
    id: 2,
    name: "João Pedro Santos",
    email: "joao.santos@universidade.edu.br",
    course: "Ciência da Computação",
    semester: 4,
    registrationNumber: "2022005678",
    gpa: 7.8,
    status: "ativo",
    subjects: [
      {
        id: 6,
        name: "Algoritmos e Estruturas de Dados",
        code: "CCP201",
        semester: 4,
        grade: 8.5,
        status: "cursando",
        professor: "Prof. Carlos Lima",
        credits: 6,
      },
      {
        id: 7,
        name: "Programação Orientada a Objetos",
        code: "CCP202",
        semester: 4,
        grade: 9.0,
        status: "cursando",
        professor: "Prof. Carlos Lima",
        credits: 4,
      },
      {
        id: 8,
        name: "Banco de Dados",
        code: "CCP203",
        semester: 4,
        grade: 7.2,
        status: "cursando",
        professor: "Prof. Fernanda Costa",
        credits: 4,
      },
      {
        id: 9,
        name: "Cálculo II",
        code: "MAT102",
        semester: 3,
        grade: 6.8,
        status: "aprovado",
        professor: "Prof. Eduardo Ferreira",
        credits: 6,
      },
      {
        id: 10,
        name: "Programação I",
        code: "CCP101",
        semester: 2,
        grade: 9.5,
        status: "aprovado",
        professor: "Prof. Carlos Lima",
        credits: 4,
      },
    ],
    mentoringSessions: [
      {
        id: 3,
        mentorId: 2,
        mentorName: "Prof. Carlos Lima",
        subject: "Algoritmos - Árvores Binárias",
        date: "2024-01-22",
        time: "16:00",
        status: "concluido",
        rating: 5,
        feedback: "Professor excelente! Consegui entender perfeitamente o conceito de árvores binárias.",
        notes: "Revisão de algoritmos de busca em árvores",
      },
      {
        id: 4,
        mentorId: 2,
        mentorName: "Prof. Carlos Lima",
        subject: "Python - Machine Learning",
        date: "2024-01-28",
        time: "14:00",
        status: "agendado",
        notes: "Introdução a bibliotecas de ML",
      },
    ],
    chatHistory: [
      {
        id: 3,
        message: "Estou com dificuldades em algoritmos, especificamente árvores binárias",
        response:
          "O Prof. Carlos Lima é especialista em algoritmos e estruturas de dados. Ele tem disponibilidade na terça-feira às 16:00. Posso agendar para você?",
        timestamp: "2024-01-18 14:20:00",
        category: "duvida",
      },
      {
        id: 4,
        message: "Perfeito, pode agendar",
        response:
          "Agendado! Sua mentoria com o Prof. Carlos Lima está marcada para terça-feira, 22/01 às 16:00 no Lab. de Informática.",
        timestamp: "2024-01-18 14:22:00",
        category: "agendamento",
      },
      {
        id: 5,
        message: "A mentoria foi excelente! Gostaria de agendar outra sobre Machine Learning",
        response:
          "Que ótimo! O Prof. Carlos Lima também é especialista em ML. Ele tem disponibilidade na segunda-feira às 14:00. Gostaria de agendar?",
        timestamp: "2024-01-22 17:30:00",
        category: "feedback",
      },
    ],
  },
  {
    id: 3,
    name: "Maria Fernanda Costa",
    email: "maria.costa@universidade.edu.br",
    course: "Administração",
    semester: 8,
    registrationNumber: "2020009876",
    gpa: 9.1,
    status: "ativo",
    subjects: [
      {
        id: 11,
        name: "Trabalho de Conclusão de Curso",
        code: "ADM401",
        semester: 8,
        status: "cursando",
        professor: "Prof. Roberto Costa",
        credits: 8,
      },
      {
        id: 12,
        name: "Gestão Estratégica",
        code: "ADM301",
        semester: 7,
        grade: 9.5,
        status: "aprovado",
        professor: "Prof. Roberto Costa",
        credits: 4,
      },
      {
        id: 13,
        name: "Empreendedorismo",
        code: "ADM302",
        semester: 7,
        grade: 9.8,
        status: "aprovado",
        professor: "Prof. Roberto Costa",
        credits: 4,
      },
      {
        id: 14,
        name: "Marketing Digital",
        code: "ADM303",
        semester: 7,
        grade: 8.9,
        status: "aprovado",
        professor: "Prof. Ana Beatriz",
        credits: 4,
      },
    ],
    mentoringSessions: [
      {
        id: 5,
        mentorId: 3,
        mentorName: "Prof. Roberto Costa",
        subject: "TCC - Empreendedorismo Digital",
        date: "2024-01-30",
        time: "14:00",
        status: "agendado",
        notes: "Revisão da metodologia de pesquisa",
      },
      {
        id: 6,
        mentorId: 3,
        mentorName: "Prof. Roberto Costa",
        subject: "TCC - Estruturação do Projeto",
        date: "2024-01-10",
        time: "16:00",
        status: "concluido",
        rating: 5,
        feedback: "Orientação impecável! Professor muito experiente e me ajudou a focar no tema.",
        notes: "Definição do tema e objetivos do TCC",
      },
    ],
    chatHistory: [
      {
        id: 6,
        message: "Preciso de orientação para meu TCC sobre empreendedorismo digital",
        response:
          "O Prof. Roberto Costa é especialista em empreendedorismo e orientação de TCC. Ele tem disponibilidade na terça-feira às 14:00. Posso agendar?",
        timestamp: "2024-01-25 09:15:00",
        category: "duvida",
      },
      {
        id: 7,
        message: "Sim, por favor agende",
        response:
          "Agendado! Sua orientação de TCC com o Prof. Roberto Costa está marcada para terça-feira, 30/01 às 14:00.",
        timestamp: "2024-01-25 09:17:00",
        category: "agendamento",
      },
    ],
  },
  {
    id: 4,
    name: "Pedro Henrique Lima",
    email: "pedro.lima@universidade.edu.br",
    course: "Química",
    semester: 5,
    registrationNumber: "2021003456",
    gpa: 7.2,
    status: "ativo",
    subjects: [
      {
        id: 15,
        name: "Química Orgânica II",
        code: "QUI301",
        semester: 5,
        grade: 6.8,
        status: "cursando",
        professor: "Prof. Mariana Santos",
        credits: 6,
      },
      {
        id: 16,
        name: "Química Analítica",
        code: "QUI302",
        semester: 5,
        grade: 7.5,
        status: "cursando",
        professor: "Prof. Mariana Santos",
        credits: 4,
      },
      {
        id: 17,
        name: "Físico-Química",
        code: "QUI303",
        semester: 5,
        grade: 6.2,
        status: "cursando",
        professor: "Prof. João Silva",
        credits: 4,
      },
      {
        id: 18,
        name: "Química Orgânica I",
        code: "QUI201",
        semester: 4,
        grade: 7.8,
        status: "aprovado",
        professor: "Prof. Mariana Santos",
        credits: 6,
      },
    ],
    mentoringSessions: [
      {
        id: 7,
        mentorId: 4,
        mentorName: "Prof. Mariana Santos",
        subject: "Química Orgânica - Reações de Substituição",
        date: "2024-01-26",
        time: "14:00",
        status: "agendado",
        notes: "Dúvidas sobre mecanismos de reação",
      },
    ],
    chatHistory: [
      {
        id: 8,
        message: "Estou com dificuldades em química orgânica, especificamente reações de substituição",
        response:
          "A Prof. Mariana Santos é especialista em química orgânica. Ela tem disponibilidade na sexta-feira às 14:00. Gostaria de agendar?",
        timestamp: "2024-01-23 11:45:00",
        category: "duvida",
      },
      {
        id: 9,
        message: "Sim, quero agendar",
        response:
          "Agendado! Sua mentoria com a Prof. Mariana Santos está marcada para sexta-feira, 26/01 às 14:00 no Lab. de Química.",
        timestamp: "2024-01-23 11:47:00",
        category: "agendamento",
      },
    ],
  },
  {
    id: 5,
    name: "Beatriz Oliveira Santos",
    email: "beatriz.santos@universidade.edu.br",
    course: "Matemática",
    semester: 3,
    registrationNumber: "2022007890",
    gpa: 8.9,
    status: "ativo",
    subjects: [
      {
        id: 19,
        name: "Cálculo III",
        code: "MAT301",
        semester: 3,
        grade: 8.5,
        status: "cursando",
        professor: "Prof. Eduardo Ferreira",
        credits: 6,
      },
      {
        id: 20,
        name: "Álgebra Linear",
        code: "MAT302",
        semester: 3,
        grade: 9.2,
        status: "cursando",
        professor: "Prof. Eduardo Ferreira",
        credits: 4,
      },
      {
        id: 21,
        name: "Estatística",
        code: "MAT303",
        semester: 3,
        grade: 8.8,
        status: "cursando",
        professor: "Prof. Eduardo Ferreira",
        credits: 4,
      },
      {
        id: 22,
        name: "Cálculo II",
        code: "MAT201",
        semester: 2,
        grade: 9.0,
        status: "aprovado",
        professor: "Prof. Eduardo Ferreira",
        credits: 6,
      },
    ],
    mentoringSessions: [
      {
        id: 8,
        mentorId: 5,
        mentorName: "Prof. Eduardo Ferreira",
        subject: "Cálculo III - Integrais Múltiplas",
        date: "2024-01-24",
        time: "16:00",
        status: "concluido",
        rating: 4,
        feedback: "Boa explicação, mas gostaria de mais exercícios práticos.",
        notes: "Revisão de integrais duplas e triplas",
      },
    ],
    chatHistory: [
      {
        id: 10,
        message: "Preciso de ajuda com integrais múltiplas em Cálculo III",
        response:
          "O Prof. Eduardo Ferreira é especialista em cálculo. Ele tem disponibilidade na quarta-feira às 16:00. Posso agendar?",
        timestamp: "2024-01-22 13:20:00",
        category: "duvida",
      },
      {
        id: 11,
        message: "Pode agendar, por favor",
        response: "Agendado! Sua mentoria com o Prof. Eduardo Ferreira está marcada para quarta-feira, 24/01 às 16:00.",
        timestamp: "2024-01-22 13:22:00",
        category: "agendamento",
      },
    ],
  },
]

// Dados dos cursos disponíveis
export const courses = [
  {
    id: 1,
    name: "Engenharia Civil",
    duration: 10,
    totalCredits: 240,
    department: "Engenharias",
  },
  {
    id: 2,
    name: "Ciência da Computação",
    duration: 8,
    totalCredits: 200,
    department: "Exatas",
  },
  {
    id: 3,
    name: "Administração",
    duration: 8,
    totalCredits: 180,
    department: "Humanas",
  },
  {
    id: 4,
    name: "Química",
    duration: 8,
    totalCredits: 200,
    department: "Exatas",
  },
  {
    id: 5,
    name: "Matemática",
    duration: 8,
    totalCredits: 180,
    department: "Exatas",
  },
]

// Função para buscar estudante por ID
export function getStudentById(id: number): Student | undefined {
  return students.find((student) => student.id === id)
}

// Função para buscar estudante por email
export function getStudentByEmail(email: string): Student | undefined {
  return students.find((student) => student.email === email)
}

// Função para calcular estatísticas do estudante
export function getStudentStats(studentId: number) {
  const student = getStudentById(studentId)
  if (!student) return null

  const approvedSubjects = student.subjects.filter((s) => s.status === "aprovado")
  const currentSubjects = student.subjects.filter((s) => s.status === "cursando")
  const totalCredits = approvedSubjects.reduce((sum, s) => sum + s.credits, 0)
  const completedSessions = student.mentoringSessions.filter((s) => s.status === "concluido")
  const averageRating =
    completedSessions.length > 0
      ? completedSessions.reduce((sum, s) => sum + (s.rating || 0), 0) / completedSessions.length
      : 0

  return {
    approvedSubjects: approvedSubjects.length,
    currentSubjects: currentSubjects.length,
    totalCredits,
    completedSessions: completedSessions.length,
    averageRating: averageRating.toFixed(1),
    gpa: student.gpa,
  }
}

// Função para obter histórico de chat recente
export function getRecentChatHistory(studentId: number, limit = 5) {
  const student = getStudentById(studentId)
  if (!student) return []

  return student.chatHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}
