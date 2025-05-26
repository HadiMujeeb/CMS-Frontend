import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
 webName:string = "Boss";
 isModalOpen: boolean = false;
 userData:IUser|null = null;
 authService = inject(AuthService);
 router = inject(Router);
 
  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('Error getting user data', err);
      }
    });
  }


  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  draftArticle():void {
    this.router.navigate(['/story'])
  }

  signOut(){
    this.authService.logout().subscribe({
      next:(response) =>{
        this.authService.removeUserData();
        this.authService.removeToken();
      this.router.navigate(['/login'])
      },
      error:(error) =>{
      console.log("function logout :",error)
      }
    })
  }


}
