export type User = {
  id: number,
  name: string,
};


export type FilmsReviewData = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type UsersReviewData = {
  id: number,
  comment: string,
  rating: number,
};
