import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

import { ImageInfoModel } from '../shared/config/models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images$: Observable<any>;
  imagesPerPage = 6;
  pageNumber = 1;
  disableNextButton = false;

  constructor(private sharedService: SharedService) { }
  /**
   * It's a lifecycle hook, will trigger on load of component
   */
  ngOnInit(): void {
    this.getGalleryImages();
  }
  /**
   * This method is used to trigger a service call by taking 2 parms as input
   */
  getGalleryImages(pageNumber: number = 1, imagesPerPage: number = 6): void {
    this.images$ = this.sharedService.getGalleryImages(pageNumber, imagesPerPage).pipe(
      map(res => {
        if (res && res.length) {
          this.disableNextButton = imagesPerPage > res.length;
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
  /**
   * This method is doing two steps
   * Conveting from Image to Blob
   * Downloading the image by taking the input as Blob (which is the
   * first step action result)
   */
  downloadImage(event, image: ImageInfoModel): void {
    event.preventDefault();
    const link = document.createElement('a');

    fetch(image.download_url)
      .then((response) => {
         return response.blob();
      })
      .then((blob) => {
        link.href = URL.createObjectURL(blob);
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  /**
   * changeImagesPerPage
   * This method will fetch the images upon chnage in number of images per page
   */
  changeImagesPerPage(): void {
    this.getGalleryImages(this.pageNumber, this.imagesPerPage);
  }
  /**
   * loadNextImages
   * This method will be used for to load next images from server
   */
  loadNextImages(): void {
    this.pageNumber++;
    this.getGalleryImages(this.pageNumber, this.imagesPerPage);
  }
  /**
   * loadPreviousImages
   * This method will be used for to load previous images from server
   */
  loadPreviousImages(): void {
    this.pageNumber--;
    if (this.pageNumber >= 1) {
      this.getGalleryImages(this.pageNumber, this.imagesPerPage);
    }
  }
}
