export interface Animal {
  name: string;
  species: string;
}

export interface Human {
  name: string;
}

export interface DjungleBook {

  title: string;
  _embedded: AnimalsRelation & HumansRelation;
  _links: LinksRelation;
}

export interface AnimalsRelation {
  animals: Animal[];
}

export interface HumansRelation {
  humans: Human[];
}

export interface Link {
  href: string;
  templated?: boolean;
}

export interface LinksRelation {
  self: Link;
  [key: string]: Link;
}
