"use client"

import { useEffect, useState } from "react"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalCommits: number
}

interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface MonthLabel {
  month: string
  weekIndex: number
}

export function GitHubInsights() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/ahmedksont")
        const userData = await userRes.json()

        const reposRes = await fetch("https://api.github.com/users/ahmedksont/repos?per_page=100")
        const reposData = await reposRes.json()

        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          totalStars: totalStars,
          totalCommits: 0,
        })
      } catch (error) {
        console.error("Error fetching GitHub stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-card border border-border rounded-lg animate-pulse">
            <div className="h-8 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const insights = [
    { label: "Public Repos", value: stats.publicRepos },
    { label: "Followers", value: stats.followers },
    { label: "Following", value: stats.following },
    { label: "Total Stars", value: stats.totalStars },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="p-4 bg-card border border-border rounded-lg glow-border hover-glow transition-all hover:scale-105 cursor-pointer"
          >
            <p className="text-2xl font-bold text-primary mb-1">{insight.value}</p>
            <p className="text-sm text-muted-foreground">{insight.label}</p>
          </div>
        ))}
      </div>
      
      <ContributionGraph />
    </div>
  )
}

function ContributionGraph() {
  const [contributions, setContributions] = useState<ContributionWeek[]>([])
  const [loading, setLoading] = useState(true)
  const [totalContributions, setTotalContributions] = useState(0)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const graphqlQuery = {
          query: `
            query {
              user(login: "ahmedksont") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                        color
                      }
                    }
                  }
                }
              }
            }
          `
        }

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graphqlQuery),
        })

        const data = await response.json()
        
        if (data.errors) {
          console.error("GraphQL errors:", data.errors)
          return
        }

        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks
        setContributions(weeks)
        setTotalContributions(data.data.user.contributionsCollection.contributionCalendar.totalContributions)
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  const getColorClass = (count: number): string => {
    if (count === 0) return "bg-gray-400/20 dark:bg-gray-600/30"
    if (count < 4) return "bg-[#9be9a8] dark:bg-[#0e4429]"
    if (count < 8) return "bg-[#40c463] dark:bg-[#006d32]"
    if (count < 12) return "bg-[#30a14e] dark:bg-[#26a641]"
    return "bg-[#216e39] dark:bg-[#39d353]"
  }

  // Get month labels from the weeks data
  const getMonthLabels = (): MonthLabel[] => {
    if (!contributions.length) return []
    
    const months: MonthLabel[] = []
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    // Get the first day of each month that appears in the contribution data
    let lastMonth = -1
    contributions.forEach((week, weekIndex) => {
      week.contributionDays.forEach(day => {
        const date = new Date(day.date)
        const month = date.getMonth()
        const dayOfMonth = date.getDate()
        
        // Only show month label if it's the first few days of the month and month changed
        if (month !== lastMonth && dayOfMonth <= 7) {
          months.push({
            month: monthNames[month],
            weekIndex
          })
          lastMonth = month
        }
      })
    })
    
    return months
  }

  if (loading) {
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold">Contributions</h3>
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-1 items-start">
          {/* Day labels */}
          <div className="grid grid-rows-7 gap-1 text-xs text-muted-foreground pt-3 mr-2">
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
              <div key={i} className="h-3 text-xs">{day}</div>
            ))}
          </div>
          
          {/* Contribution grid skeleton */}
          <div className="flex gap-1">
            {[...Array(53)].map((_, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {[...Array(7)].map((_, dayIndex) => (
                  <div key={dayIndex} className="w-3 h-3 bg-gray-400/20 rounded-sm animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const monthLabels = getMonthLabels()

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold">Contributions</h3>
        <span className="text-xs text-muted-foreground">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>
      
      <div className="flex gap-1 items-start">
        {/* Day labels */}
        <div className="grid grid-rows-7 gap-1 text-xs text-muted-foreground pt-3 mr-2">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
            <div key={i} className="h-3 text-xs" style={{ fontSize: '10px' }}>{day}</div>
          ))}
        </div>
        
        <div className="flex flex-col">
          {/* Month labels */}
          <div className="flex gap-1 mb-1 text-xs text-muted-foreground" style={{ fontSize: '10px' }}>
            {monthLabels.map((month, index) => (
              <div 
                key={index} 
                className="text-xs"
                style={{ 
                  marginLeft: index === 0 ? '0' : 'auto',
                  width: '12px'
                }}
              >
                {month.month}
              </div>
            ))}
          </div>
          
          {/* Contribution grid - Exact GitHub layout */}
          <div className="flex gap-1">
            {contributions.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.contributionDays.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getColorClass(day.contributionCount)} hover:border hover:border-gray-400 cursor-pointer`}
                    title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span className="text-xs" style={{ fontSize: '10px' }}>Less</span>
        <div className="flex gap-[2px]">
          <div className="w-3 h-3 rounded-sm bg-gray-400/20"></div>
          <div className="w-3 h-3 rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#40c463] dark:bg-[#006d32]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#30a14e] dark:bg-[#26a641]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#216e39] dark:bg-[#39d353]"></div>
        </div>
        <span className="text-xs" style={{ fontSize: '10px' }}>More</span>
      </div>
    </div>
  )
}