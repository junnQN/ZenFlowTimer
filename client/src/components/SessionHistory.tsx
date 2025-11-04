import { useQuery } from "@tanstack/react-query";
import { type Session } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Activity, Clock, Flame, Trophy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
}

export function SessionHistory() {
  const { data: stats } = useQuery<SessionStats>({
    queryKey: ["/api/sessions/stats"],
  });

  const { data: sessions } = useQuery<Session[]>({
    queryKey: ["/api/sessions"],
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              Sessions
            </span>
          </div>
          <div className="text-3xl font-light">
            {stats?.totalSessions || 0}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              Minutes
            </span>
          </div>
          <div className="text-3xl font-light">
            {stats?.totalMinutes || 0}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              Streak
            </span>
          </div>
          <div className="text-3xl font-light">
            {stats?.currentStreak || 0}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              Best
            </span>
          </div>
          <div className="text-3xl font-light">
            {stats?.longestStreak || 0}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-normal tracking-wide mb-4">
          Recent Sessions
        </h3>
        <div className="space-y-2">
          {sessions && sessions.length > 0 ? (
            sessions.slice(0, 10).map((session) => (
              <Card
                key={session.id}
                className="p-4 flex items-center justify-between"
                data-testid={`session-${session.id}`}
              >
                <div>
                  <div className="font-normal">{session.presetName}</div>
                  <div className="text-sm text-muted-foreground">
                    {Math.floor(session.duration / 60)} minutes
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(session.completedAt), { addSuffix: true })}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No sessions yet. Complete a meditation to start tracking!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
