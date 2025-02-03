// apps/web/src/components/sessions/session-details-dialog.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Calendar, Clock, User, Star, Video, FileText, MessageSquare } from "lucide-react";
  import { Card } from "@/components/ui/card";
  
  interface SessionDetailsDialogProps {
    session: any; // Remplacer par le type correct de session
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export function SessionDetailsDialog({
    session,
    open,
    onOpenChange,
  }: SessionDetailsDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{session?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{session?.type}</Badge>
                <span className="text-sm text-muted-foreground">
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  {session?.duration}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
  
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="recording">Recording</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
  
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Session Info */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Session Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(session?.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {session?.student}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {session?.rating} / 5.0
                    </div>
                  </div>
                </Card>
  
                {/* Session Stats */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Session Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div>Lines of code: {session?.codeLines || 'N/A'}</div>
                    <div>Questions asked: {session?.questions || 0}</div>
                    <div>Exercises completed: {session?.exercises || 0}</div>
                  </div>
                </Card>
              </div>
  
              {/* Timeline */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Session Timeline</h3>
                <div className="space-y-4">
                  {(session?.timeline || []).map((event: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 text-sm text-muted-foreground">
                        {event.time}
                      </div>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
  
            {/* Notes Tab */}
            <TabsContent value="notes">
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Session Notes</h3>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Notes
                  </Button>
                </div>
                <div className="prose max-w-none">
                  {session?.notes || 'No notes available for this session.'}
                </div>
              </Card>
            </TabsContent>
  
            {/* Recording Tab */}
            <TabsContent value="recording">
              {session?.recording ? (
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </Card>
                  <div className="flex justify-end">
                    <Button>
                      Download Recording
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="p-8 text-center text-muted-foreground">
                  No recording available for this session.
                </Card>
              )}
            </TabsContent>
  
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Student Feedback</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < session?.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      ({session?.rating}/5)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.feedback || 'No feedback provided.'}
                  </p>
                </div>
  
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {(session?.improvements || []).map((item: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }