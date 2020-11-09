import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';

import { API_CONFIG, API_CONFIG_TOKEN } from '../app/shared/config/api.config';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GalleryComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: API_CONFIG_TOKEN, useValue: API_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
