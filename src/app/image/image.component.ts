import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  randomImageUrl$: Observable<any>;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getRandomImage();
  }

  /**
   *  This method is used for to get the random Image
   */
  getRandomImage(): void {
    this.randomImageUrl$ = this.sharedService.getRandomImage().pipe(
      catchError(err => of(err))
    );
  }

}
