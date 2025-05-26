import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../shared/models/user.model';
import { IRequestCreateArticle, IRequestEditArticle } from '../shared/models/article.model';
import { ArticleService } from '../articles/article.service';

@Component({
  selector: 'app-write-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './write-article.component.html',
  styleUrl: './write-article.component.css'
})
export class WriteArticleComponent implements OnInit {
   form: FormGroup;
  userData: IUser | null = null;
  articleId: string | null = null;

  authService = inject(AuthService);
  articleService = inject(ArticleService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response) => {
        this.userData = response;
      }
    });

    // Check for ID in query param
    this.route.queryParams.subscribe(params => {
      this.articleId = params['id'];
      if (this.articleId) {
        // this.fetchArticle(this.articleId);
      this.articleService.getArticle(this.articleId).subscribe({
        next:(response) =>{
        if (response) {
        this.form.patchValue({
          title: response.article.title,
          content: response.article.content
        });
      }  
        }
      })
      }
    });
  }

  // fetchArticle(id: string): void {
  //   // Assuming you already have all articles in a service subject
  //   this.articleService.allArticle$.subscribe(allArticles => {
  //     const found = allArticles?.find(article => article._id === id);
  //     if (found) {
  //       this.form.patchValue({
  //         title: found.title,
  //         content: found.content
  //       });
  //     }
  //   });
  // }

  publish(): void {
    console.log(this.userData)
    if (this.form.invalid || !this.userData) return;

    if (this.articleId) {
      // Edit existing article
      const payload:IRequestEditArticle = {
        _id: this.articleId,
        title: this.form.value.title,
        content: this.form.value.content,
        author:this.userData.name,
        isPublished: true
      };

      this.articleService.editArticle(payload).subscribe({
        next: (res) => {
          console.log("Edited:", res.message);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error("Edit Error", err)
      });

    } else {
      // Create new article
      const article: IRequestCreateArticle = {
        title: this.form.value.title,
        content: this.form.value.content,
        authorId: this.userData._id,
        authorName: this.userData.name,
        isPublished: true
      };

      this.articleService.createArticle(article).subscribe({
        next: (res) => {
          console.log("Created:", res.message);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error("Create Error", err)
      });
    }
  }
}
