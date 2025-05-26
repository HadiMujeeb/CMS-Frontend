import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ArticleListComponent } from '../articles/article-list/article-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,ArticleListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
