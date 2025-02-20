import { fetchPlayersByGroup } from "./fetchPlayersByGroup";

export const playersGetByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storage = await fetchPlayersByGroup(group);

    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
};
