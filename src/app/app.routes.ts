import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';
import { AdminLogin } from './pages/admin/login/login';
import { AuthGuard } from './guards/auth';
import { AdminGeneral } from './pages/admin/general/general';
import { AdminServices } from './pages/admin/services/services';
import { AdminImages } from './pages/admin/images/images';
import { AdminFilters } from './pages/admin/filters/filters';
import { AdminReviews } from './pages/admin/reviews/reviews';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'services', component: Services },
    { path: 'gallery', component: Gallery },
    { path: 'admin/login', component: AdminLogin },
    { 
        path: 'admin', 
        canActivate: [AuthGuard],
        children: [
            { path: 'general', component: AdminGeneral },
            { path: 'services', component: AdminServices },
            { path: 'images', component: AdminImages },
            { path: 'filters', component: AdminFilters },
            { path: 'reviews', component: AdminReviews },
            { path: '', redirectTo: 'general', pathMatch: 'full' },
        ],
    },
    { path: '**', redirectTo: '' }
];
