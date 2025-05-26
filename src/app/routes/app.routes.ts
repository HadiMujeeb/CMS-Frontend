import { Routes } from "@angular/router";
import { LoginComponent } from "../auth/login/login.component";
import { RegisterComponent } from "../auth/register/register.component";
import { OtpComponent } from "../auth/otp/otp.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ArticleListComponent } from "../articles/article-list/article-list.component";
import { authGuard } from "../auth/auth.guard";
import { guestGuard } from "../auth/guest.guard";
import { WriteArticleComponent } from "../write-article/write-article.component";
import { DetailArticleComponent } from "../detail-article/detail-article.component";

export const routes:Routes = [
    {path:'',redirectTo:'/login',pathMatch:"full"},
    {path:'login',component:LoginComponent,canActivate:[guestGuard]},
    {path:'register',component:RegisterComponent,canActivate:[guestGuard]},
    {path:'otp',component:OtpComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
    {path:"list",component:ArticleListComponent,canActivate:[authGuard]},
    {path:"article",component:DetailArticleComponent,canActivate:[authGuard]},
    {path:"story",component:WriteArticleComponent,canActivate:[authGuard]},
    
    {path:"**",redirectTo:''},

]