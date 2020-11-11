import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { API_CONFIG_TOKEN, API_CONFIG } from '../config/api.config';
import { ImageInfoModel } from '../config/models';

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
  /**
   * this method is used to get the stream of gallery images
   */
  getGalleryImages(pageNumber: number, imagesPerPage: number): Observable<ImageInfoModel[]> {
    const url = `${this.baseUrl}${this.apiConfig.GALLERY}${this.apiConfig.GALLERY_PAGE_COUNT}${pageNumber}${this.apiConfig.GALLERY_LIMIT_COUNT}${imagesPerPage}`;
    return this.http.get<any>(url);
  }
  /**
   * This method is doing two steps
   * Conveting from Image to Blob
   * Downloading the image by taking the input as Blob (which is the
   * first step action result)
   */
  downloadImage(url: string): void {
    this.http.get(url, {responseType: 'blob'}).subscribe(res => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(res);
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  /**
   * getPageNumbers method is used for to show the per page select
   */
  getPageNumbers(): Array<number> {
    return [6, 8, 10, 12];
  }
}
