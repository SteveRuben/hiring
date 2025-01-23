import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentSessions = [
  {
    id: "1",
    student: {
      name: "John Doe",
      email: "john@example.com",
      image: "/avatars/01.png",
    },
    type: "React Advanced",
    date: "2024-01-20T13:00:00",
    status: "completed",
  },
  {
    id: "2",
    student: {
      name: "Alice Smith",
      email: "alice@example.com",
      image: "/avatars/02.png",
    },
    type: "Node.js Basics",
    date: "2024-01-21T15:00:00",
    status: "scheduled",
  },
  {
    id: "3",
    student: {
      name: "Bob Wilson",
      email: "bob@example.com",
      image: "/avatars/03.png",
    },
    type: "TypeScript Fundamentals",
    date: "2024-01-22T10:00:00",
    status: "scheduled",
  },
]

export function RecentSessions() {
  return (
    <div className="space-y-8">
      {recentSessions.map((session) => (
        <div key={session.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={session.student.image} alt="Avatar" />
            <AvatarFallback>{session.student.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{session.student.name}</p>
            <p className="text-sm text-muted-foreground">{session.type}</p>
          </div>
          <div className="ml-auto text-sm">
            {new Date(session.date).toLocaleString()}
          </div>
          <div className={`ml-4 text-sm ${
            session.status === 'completed' 
              ? 'text-green-500' 
              : 'text-blue-500'
          }`}>
            {session.status}
          </div>
        </div>
      ))}
    </div>
  )
}