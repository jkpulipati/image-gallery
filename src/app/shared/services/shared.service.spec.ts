import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { API_CONFIG, API_CONFIG_TOKEN } from '../config/api.config';
import { ImageInfoModel } from '../config/models';

describe('SharedService', () => {
  let service: SharedService;
  const imageInfo: ImageInfoModel = {
    download_url: 'https://picsum.photos/id/0/5616/3744',
    author: 'Alejandro Escamilla',
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    id: 12,
    width: 100,
    height: 200
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG}
      ]
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getGalleryImages with 1 and 5 as arguments', () => {
    service.getGalleryImages(1, 5);
    expect(service).toBeTruthy();
  });

  it('should call getRandomImage', () => {
    service.getRandomImage();
    expect(service).toBeTruthy();
  });

  it('should call downloadImage', () => {
    service.downloadImage(imageInfo.download_url);
    expect(service).toBeTruthy();
  });
});
