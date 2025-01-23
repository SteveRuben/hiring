import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ExpertCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View and manage your sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Sessions for {date?.toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Liste des sessions */}
            {[1, 2, 3].map((session) => (
              <div key={session} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">React Advanced Patterns</h3>
                  <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                </div>
                <Button>Join Session</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}