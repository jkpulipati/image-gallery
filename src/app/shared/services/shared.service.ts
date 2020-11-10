import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { API_CONFIG_TOKEN, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, @Inject(API_CONFIG_TOKEN) private apiConfig) { }

  getRandomImage(): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.RANDOM_IMAGE}`;
    return this.http.get<any>(url);
  }
  
  getGalleryImages(pageNumber: number, imagesPerPage: number) {
    const url = `${this.baseUrl}${this.apiConfig.GALLERY}${this.apiConfig.GALLERY_PAGE_COUNT}${pageNumber}${this.apiConfig.GALLERY_LIMIT_COUNT}${imagesPerPage}`;
    return this.http.get<any>(url);
  }
}
