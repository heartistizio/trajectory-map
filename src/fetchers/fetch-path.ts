import { Stop } from "../types";

const assembleQueryUrl = (profile: string) =>
  `http://localhost:6969/v1/trajectories?profile=${profile}`;

export const fetchPath = async (profile: string): Promise<Stop[]> =>
  (await fetch(assembleQueryUrl(profile))).json();
