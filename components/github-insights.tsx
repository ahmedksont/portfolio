"use client"

import { useEffect, useState } from "react"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalCommits: number
}

export function GitHubInsights() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userRes = await fetch("https://api.github.com/users/ahmedksont")
        const userData = await userRes.json()

        // Fetch repos to calculate total stars
        const reposRes = await fetch("https://api.github.com/users/ahmedksont/repos?per_page=100")
        const reposData = await reposRes.json()

        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          totalStars: totalStars,
          totalCommits: 0, // This would require additional API calls
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
  )
}
