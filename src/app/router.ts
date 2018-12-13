import {Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductAndServiceComponent} from './product-and-service/product-and-service.component';
import {AccommodationComponent} from './accommodation/accommodation.component';
import {BooksAndStationeryComponent} from './books-and-stationery/books-and-stationery.component';
import {SkillsAndTalentComponent} from './skills-and-talent/skills-and-talent.component';
import {TransportationComponent} from './transportation/transportation.component';
import {AddAccommodationComponent} from './add-accommodation/add-accommodation.component';
import {AddBooksAndStationeryComponent} from './add-books-and-stationery/add-books-and-stationery.component';
import {AddProductAndSalesComponent} from './Service advertisement/add-product-and-sales.component';
import {AddSalesComponent} from './add-sales/add-sales.component';
import {AddSkillsAndTalentComponent} from './add-skills-and-talent/add-skills-and-talent.component';
import {AddTransportComponent} from './add-transport/add-transport.component';
import {SalesComponent} from './sales/sales.component';
import {AuthGuard} from './Auth/auth.guard.service';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotificationComponent} from './notification/notification.component';
import {ChartsComponent} from './charts/charts.component';

export const appRoutes : Routes =[
{path: 'homepage', component : HomepageComponent , canActivate:[AuthGuard] },
{path : 'login', component : LoginComponent},
{path: 'register', component : RegisterComponent},
{path: 'profile', component : ProfileComponent, canActivate:[AuthGuard]},
{path: 'product-and-service', component : ProductAndServiceComponent,canActivate:[AuthGuard]},
{path: 'accommodation', component : AccommodationComponent,canActivate:[AuthGuard]},
{path: 'books-and-stationery',component : BooksAndStationeryComponent,canActivate:[AuthGuard]},
{path: 'skills-and-talent',component : SkillsAndTalentComponent,canActivate:[AuthGuard]},
{path: 'transportation', component : TransportationComponent, canActivate:[AuthGuard]},
{path: 'sales', component : SalesComponent, canActivate:[AuthGuard]},
{path: 'add-accommodation', component : AddAccommodationComponent, canActivate:[AuthGuard]},
{path: 'add-books-and-stationery', component : AddBooksAndStationeryComponent, canActivate:[AuthGuard]},
{path: 'add-product-and-sales', component : AddProductAndSalesComponent, canActivate:[AuthGuard]},
{path: 'add-sales', component : AddSalesComponent, canActivate:[AuthGuard]},
{path: 'add-skills-and-talent', component : AddSkillsAndTalentComponent,  canActivate:[AuthGuard]},
{path: 'feedback', component : FeedbackComponent, canActivate:[AuthGuard]},
{path: 'notification', component : NotificationComponent, canActivate:[AuthGuard]},
{path: 'chart', component : ChartsComponent, canActivate:[AuthGuard]},
{path: 'add-transport', component : AddTransportComponent, canActivate:[AuthGuard]},
{path: '',redirectTo: '/login', pathMatch : 'full'}
];;
