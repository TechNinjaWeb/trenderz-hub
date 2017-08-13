import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowseStoresComponent } from './browse-stores/browse-stores.component';
import { OpenStoreComponent } from './open-store/open-store.component';
import { MallPolicyComponent } from './mall-policy/mall-policy.component';

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
    imports: [
      RouterModule.forRoot( appRoutes, { enableTracing: true } )
    ],
    exports: [RouterModule]
  })

  export class AppRouter {}