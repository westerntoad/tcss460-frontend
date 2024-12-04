export interface IRatings {
  average: number;
  count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}

export interface IUrlIcon {
  large: string;
  small: string;
}

export interface IBook {
  isbn13: number;
  authors: string;
  publication: number;
  original_title: string;
  title: string;
  ratings: IRatings;
  icons: IUrlIcon;
}

export interface BadIBook {
  id: number;
  isbn13: string;
  authors: string;
  publication_year: number;
  original_title: string;
  title: string;
  rating_avg: number;
  rating_count: number;
  rating_1_start: number;
  rating_2_start: number;
  rating_3_start: number;
  rating_4_start: number;
  rating_5_start: number;
  image_url: string;
  image_small_url: string;
}
