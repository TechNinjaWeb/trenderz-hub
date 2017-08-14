import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowseStoresComponent } from './pages/browse-stores/browse-stores.component';
import { OpenStoreComponent } from './pages/open-store/open-store.component';
import { MallPolicyComponent } from './pages/mall-policy/mall-policy.component';
import { BetaLaunchComponent } from './pages/beta-launch/beta-launch.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: null },
    { path: '404', component: PageNotFoundComponent, data: null },
    { path: 'login', component: LoginComponent, data: null },
    { path: 'browse-stores', component: BrowseStoresComponent, data: null },
    { path: 'open-a-store', component: OpenStoreComponent, data: null },
    { path: 'mall-policy', component: MallPolicyComponent, data: null },
    // { path: '',
    //   redirectTo: '',
    //   pathMatch: 'full'
    // },
    { path: '**', redirectTo: '404' }
  ];
  
  @NgModule({
    declarations: [
      HomeComponent,
      LoginComponent,
      BetaLaunchComponent,
      BrowseStoresComponent,
      OpenStoreComponent,
      MallPolicyComponent,
      PageNotFoundComponent
    ],
    imports: [
      RouterModule.forRoot( appRoutes, { enableTracing: true } )
    ],
    entryComponents: [
      HomeComponent,
      LoginComponent,
      BetaLaunchComponent,
      BrowseStoresComponent,
      OpenStoreComponent,
      MallPolicyComponent,
      PageNotFoundComponent
    ],
    exports: [RouterModule]
  })

  export class AppRouter {}