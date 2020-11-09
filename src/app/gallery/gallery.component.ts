import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared.service';

import { imageInfoModel } from '../shared/config/models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images$: Observable<any>;
  imagesPerPage: number = 6;
  pageNumber: number = 1;
  disableNextButton: boolean = false;

  constructor(private sharedService: SharedService) { }
  
  /**
   * @returns void
   * 
   * It's a lifecycle hook, will trigger on load of component
   */
  ngOnInit(): void {
    this.getGalleryImages();
  }
  
  /**
   * @param  {number=1} pageNumber
   * @param  {number=6} imagesPerPage
   * 
   * This method is used to trigger a service call by taking 2 parms as input   * 
   */
  getGalleryImages(pageNumber: number = 1, imagesPerPage: number = 6) {
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
   * @param  {} event
   * @param  {imageInfoModel} image
   * 
   * This method is doing two steps
   *      Conveting from Image to Blob
   *      Downloading the image by taking the input as Blob (which is the 
   *             first step action result)
   */
  downloadImage(event, image: imageInfoModel) {
    event.preventDefault();
    let link = document.createElement("a");

    fetch(image.download_url)
      .then(function (response) {
         return response.blob();
      })
      .then(function (blob) {
        link.href = URL.createObjectURL(blob);
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  
  /**
   * changeImagesPerPage
   * 
   * This method will fetch the images upon chnage in number of images per page
   */
  changeImagesPerPage() {
    this.getGalleryImages(this.pageNumber, this.imagesPerPage);
  }

  /**
   * loadNextImages
   * 
   * This method will be used for to load next images from server
   */
  loadNextImages() {
    this.pageNumber++;
    this.getGalleryImages(this.pageNumber, this.imagesPerPage);
  }

  /**
   * loadPreviousImages
   * 
   * This method will be used for to load previous images from server
   */
  loadPreviousImages() {
    this.pageNumber--;
    if (this.pageNumber >= 1) {
      this.getGalleryImages(this.pageNumber, this.imagesPerPage);
    }
  }

}
