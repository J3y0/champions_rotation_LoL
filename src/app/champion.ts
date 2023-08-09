export interface ChampionIds {
    freeChampionIds: number[],
    freeChampionIdsForNewPlayers: number[],
    maxNewPlayerLevel: number,
}

export interface ChampionNames {
    id: number,
    name: string,
    alias: string,
    squarePortraitPath: string,
    roles: string[],
}

interface PlaystyleInfo {
    crowdControl: number,
    damage: number,
    durability: number,
    mobility: number,
    utility: number,
}

export interface ChampionInfos {
    id: number,
    name: string,
    title: string,
    shortBio: string,
    playstyleInfo: PlaystyleInfo,
    roles: string[],
}