import { getHeroDB } from "./DBs";

export const getHeroNames = () => {    
    const matches: string[] = Array.from(getHeroDB().match(/(?<=,|^)hero_[^,"]*/g) ?? []);
    return matches;
}