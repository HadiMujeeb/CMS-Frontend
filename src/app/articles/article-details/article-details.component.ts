import { Component } from '@angular/core';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent  {
// article: Article | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private articleService: ArticleService
//   ) {}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.article = this.articleService.getArticleById(id);
  // }
}
