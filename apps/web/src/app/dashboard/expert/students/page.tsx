import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ExpertStudentsPage() {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((student) => (
          <Card key={student}>
            <CardHeader>
              <CardTitle>Student Name</CardTitle>
              <CardDescription>Joined 3 months ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sessions completed</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span>Average rating</span>
                  <span>4.8</span>
                </div>
                <Progress value={75} className="w-full" />
                <Button className="w-full">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }