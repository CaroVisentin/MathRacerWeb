export interface UserInfo {
  id: number;
  name: string;
  coins: number;
  level: number;
  ranking: number;
}

export interface Battery {
  time: string;
  levels: ("full" | "empty")[];
}

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ActiveItems {
  car: Item;
  background: Item;
  profile: Item;
}

export interface HomeData { 
  activeItems: ActiveItems;
  battery: Battery;
  user: UserInfo;
}
