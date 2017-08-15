import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrowseStoresComponent } from './pages/browse-stores/browse-stores.component';
import { OpenStoreComponent } from './pages/open-store/open-store.component';
import { BetaLaunchComponent } from './pages/beta-launch/beta-launch.component';
import { MallPolicyComponent } from './pages/mall-policy/mall-policy.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LoginComponent } from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SiteLinksComponent } from './components/site-links/site-links.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: null },
    { path: '404', component: PageNotFoundComponent, data: null },
    { path: 'about-us', component: AboutComponent, data: null },
    { path: 'contact', component: ContactComponent, data: null },
    { path: 'browse-stores', component: BrowseStoresComponent, data: null },
    { path: 'open-a-store', component: OpenStoreComponent, data: null },
    { path: 'beta-launch', component: BetaLaunchComponent, data: null },
    { path: 'mall-policy', component: MallPolicyComponent, data: null },
    { path: 'privacy-policy', component: PrivacyPolicyComponent, data: null },
    { path: 'login', component: LoginComponent, data: null },
    { path: 'checkout', component: CheckoutComponent, data: null },
    { path: 'thank-you', component: ThankyouComponent, data: null },
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
      PageNotFoundComponent,
      AboutComponent,
      PrivacyPolicyComponent,
      ContactComponent,
      CheckoutComponent,
      ThankyouComponent,
      NavigationComponent,
      FooterComponent,
      SiteLinksComponent,
      SlideshowComponent,
      ShoppingCartComponent,
      WishlistComponent,

    ],
    imports: [
      RouterModule.forRoot( appRoutes, { enableTracing: false } ),
      Ng2SimplePageScrollModule.forRoot(),
    ],
    providers: [

    ],
    entryComponents: [
      HomeComponent,
      LoginComponent,
      BetaLaunchComponent,
      BrowseStoresComponent,
      OpenStoreComponent,
      MallPolicyComponent,
      PageNotFoundComponent,
      AboutComponent,
      PrivacyPolicyComponent,
      ContactComponent,
      CheckoutComponent,
      ThankyouComponent,
      NavigationComponent,
      FooterComponent,
      SiteLinksComponent,
      SlideshowComponent,
      ShoppingCartComponent,
      WishlistComponent,

    ],
    exports: [RouterModule]
  })

  export class AppRouter {}