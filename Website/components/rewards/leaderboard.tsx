import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  avatar?: string
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

const rankIcons = {
  1: { icon: Trophy, color: "text-yellow-500" },
  2: { icon: Medal, color: "text-gray-400" },
  3: { icon: Award, color: "text-amber-600" },
}

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const RankIcon = rankIcons[entry.rank as keyof typeof rankIcons]?.icon
        const rankColor = rankIcons[entry.rank as keyof typeof rankIcons]?.color

        return (
          <div
            key={entry.rank}
            className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
              currentUserId === entry.name ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              {RankIcon ? (
                <RankIcon className={`h-6 w-6 ${rankColor}`} />
              ) : (
                <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>
              )}
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {entry.avatar || entry.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <p className="font-medium">{entry.name}</p>
              <p className="text-xs text-muted-foreground">Eco Warrior</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-primary">{entry.points.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
