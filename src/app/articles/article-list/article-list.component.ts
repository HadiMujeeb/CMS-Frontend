import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IArticle } from '../../shared/models/article.model';
import { ArticleService } from '../article.service';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  filter: 'all' | 'my' = 'all';
  userData: IUser | null = null;

  private articleService = inject(ArticleService);
  private authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response) => {
        this.userData = response;
        this.fetchArticles();
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.fetchArticles(); // Continue fetching articles even if user fetch fails
      }
    });
  }

  fetchArticles(): void {
    this.articleService.getAllArticle().subscribe({
      next: (response) => {
        this.articleService.setAllArticle(response.articles);
        this.articles = response.articles.sort((a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      }
    });
  }

  setFilter(filter: 'all' | 'my'): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    let filtered: IArticle[] = [];

    if (this.filter === 'all') {
      filtered = this.articles;
    } else if (this.filter === 'my' && this.userData) {
      filtered = this.articles.filter(article => article.authorId === this.userData?._id);
    }

    // Sort filtered articles by createdAt descending
    this.filteredArticles = filtered.sort((a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return description;
  }

  goToDetail(article: IArticle): void {
    this.articleService.setSelectedArticle(article);
    this.router.navigate(['/article']);
  }

  editArticle(articleId: string): void {
    this.router.navigate(['/story'], { queryParams: { id: articleId } });
  }

  deleteArticle(articleId: string): void {
    // Optional: Uncomment to add confirmation dialog
    // const confirmDelete = confirm('Are you sure you want to delete this article?');
    // if (!confirmDelete) return;

    this.articleService.deleteArticle(articleId).subscribe({
      next: () => {
        this.articles = this.articles.filter(article => article._id !== articleId);
        this.applyFilter();
        // alert('Article deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting article:', error);
        // alert('Failed to delete article.');
      }
    });
  }
}