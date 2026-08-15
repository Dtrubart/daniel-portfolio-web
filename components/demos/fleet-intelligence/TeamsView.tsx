"use client";

import { cn } from "@/lib/utils";
import {
  type FleetIntelligenceState,
  type FleetIntelligenceAction,
  teams,
  drivers,
  type Driver,
} from "./state";

interface TeamsViewProps {
  state: FleetIntelligenceState;
  dispatch: (action: FleetIntelligenceAction) => void;
}

export const TeamsView = ({ state, dispatch }: TeamsViewProps) => {
  const { selectedTeamId } = state;

  // Team Score = 0.70 × Mean Driver Score + 0.30 × Lowest Driver Score
  const calculateTeamScore = (driverArray: Driver[]) => {
    if (driverArray.length === 0) return 0;
    const meanScore =
      driverArray.reduce((sum, d) => sum + d.driverScore, 0) / driverArray.length;
    const lowestScore =
      driverArray.length > 0
        ? Math.min(...driverArray.map((d) => d.driverScore))
        : 0;

    return Math.round(meanScore * 0.7 + lowestScore * 0.3);
  };

  // Show selected team or all teams
  const targetTeams = selectedTeamId
    ? teams.filter((t) => t.id === selectedTeamId)
    : teams;

  // Add team score to each team
  const teamsWithScores = targetTeams.map((team) => {
    const teamDrivers = drivers.filter((d) => d.team === team.name);
    const teamScore = calculateTeamScore(teamDrivers);
    return {
      ...team,
      teamDrivers,
      teamScore,
    };
  });

  // Sort by team score (highest first)
  teamsWithScores.sort((a, b) => b.teamScore - a.teamScore);

  const handleSelectTeam = (id: string | null) => {
    dispatch({ type: "SELECT_TEAM", id });
  };

  return (
    <div className="rounded-lg border border-border bg-popover p-6 shadow-sm">
      <div className="py-4 flex flex-col space-y-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Team Ranking & Performance
        </h3>

        {/* Team Score Explanation */}
        <div className="bg-secondary/30 rounded-lg border border-border p-3">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Team Score = 70% × Mean Driver Score + 30% × Lowest Driver Score
          </h4>
          <p className="text-sm text-muted-foreground">
            This rewards collective performance while ensuring no team can fully mask weak performance through one exceptional driver.
          </p>
        </div>

        {/* Team Ranking Table */}
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full table-auto text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider">Rank</th>
                <th className="px-4 py-2 text-left text-xs uppercase tracking-wider">Team</th>
                <th className="px-4 py-2 text-right text-xs uppercase tracking-wider">Drivers</th>
                <th className="px-4 py-2 text-right text-xs uppercase tracking-wider">Mean Score</th>
                <th className="px-4 py-2 text-right text-xs uppercase tracking-wider">Lowest Score</th>
                <th className="px-4 py-2 text-right text-xs uppercase tracking-wider">Team Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-popover">
              {teamsWithScores.map((team, index) => {
                const driversInTeam = drivers.filter((d) => d.team === team.name);
                const meanScore =
                  driversInTeam.length > 0
                    ? driversInTeam.reduce((s, d) => s + d.driverScore, 0) / driversInTeam.length
                    : 0;

                return (
                  <tr
                    key={team.id}
                    className={cn(
                      "align-middle hover:bg-secondary/30 transition-colors cursor-pointer",
                      selectedTeamId === team.id && "bg-accent/10",
                    )}
                    onClick={() => handleSelectTeam(team.id)}
                  >
                    <td className="px-4 py-2 font-medium text-foreground">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {team.name}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-right">
                      {driversInTeam.length}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {meanScore.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground">
                      {Math.min(
                        ...driversInTeam.map((d) => d.driverScore || 0)
                      ).toFixed(1)}
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground text-right">
                      {team.teamScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Team Radar Visualization */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Team Performance Radar (Selected Team)
          </h4>

          <div className="bg-secondary/30 rounded-lg border border-border p-4">
            {teamsWithScores.length > 0 ? (
              <div className="text-center">
                {teamsWithScores.map((team) => {
                  const driversInTeam = drivers.filter((d) => d.team === team.name);
                  const metrics = [
                    {
                      name: "Fuel",
                      value:
                        driversInTeam.length > 0
                          ? driversInTeam.reduce((s, d) => s + d.fuelPerformance, 0) /
                            driversInTeam.length
                          : 0,
                    },
                    {
                      name: "Idle",
                      value:
                        driversInTeam.length > 0
                          ? 100 -
                            driversInTeam.reduce((s, d) => s + d.idlePercentage, 0) /
                              driversInTeam.length
                          : 0,
                    },
                    {
                      name: "Over-Rev",
                      value:
                        driversInTeam.length > 0
                          ? 100 -
                            driversInTeam.reduce((s, d) => s + d.overRevPercentage, 0) /
                              driversInTeam.length
                          : 0,
                    },
                    {
                      name: "Braking",
                      value:
                        driversInTeam.length > 0
                          ? 100 -
                            driversInTeam.reduce((s, d) => s + d.brakingEventsPerKm * 300, 0) /
                              driversInTeam.length
                          : 0,
                    },
                    {
                      name: "Harsh Accel",
                      value:
                        driversInTeam.length > 0
                          ? 100 -
                            driversInTeam.reduce((s, d) => s + d.harshAccelerationEventsPerKm * 300, 0) /
                              driversInTeam.length
                          : 0,
                    },
                  ];

                  return (
                    <div key={team.id} className="mb-4 p-3 bg-secondary/30 rounded-md border border-border">
                      <h5 className="font-semibold text-foreground mb-2">{team.name}</h5>
                      <div className="flex flex-col gap-2">
                        {metrics.map((m) => (
                          <div key={m.name} className="flex items-center gap-x-3">
                            <span className="text-sm font-medium w-20 text-left">{m.name}</span>
                            <div className="flex-1 bg-secondary/50 rounded-full h-3">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(m.value, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{Math.round(m.value)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                Select a team to view performance details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
