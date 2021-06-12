import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowseBeersComponent } from './browse-beers/browse-beers.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { FavoriteBeersComponent } from './favorite-beers/favorite-beers.component';

import { AppService } from './Service/app.service';



const routes: Routes = [{ path: '', component: BrowseBeersComponent }
  , { path: 'favorites', component: FavoriteBeersComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrowseBeersComponent,
    BeerCardComponent,
    FavoriteBeersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
