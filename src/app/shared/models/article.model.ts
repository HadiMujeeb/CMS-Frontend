export interface IArticle {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName:string
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequestCreateArticle {
title: string;
content: string;
authorId: string;
authorName:string
isPublished?: boolean;
}



export interface IRequestEditArticle {
  _id?: string;
  title: string;
  content: string;
  author: string;
  isPublished?: boolean;
}

export interface IReponse {
    message:string
}

export interface IGetArticleResponce {
    articles:IArticle[];
    message:string;
}

export interface IgetEditArticleReponse {
  article:IArticle;
  message:string;
}

