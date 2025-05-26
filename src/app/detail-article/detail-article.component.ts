import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../articles/article.service';
import { IArticle } from '../shared/models/article.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.css'
})
export class DetailArticleComponent implements OnInit {
article: IArticle | null = null;
articleService = inject(ArticleService);

  ngOnInit(): void {
    this.articleService.selectedArticle$.subscribe({
      next:(response) =>{
        this.article = response
      }
    })
  }

  calculateReadTime(content: string | undefined): number {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}
