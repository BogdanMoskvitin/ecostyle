import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'services', component: Services },
    { path: 'gallery', component: Gallery },
    { path: '**', redirectTo: '' }
];
