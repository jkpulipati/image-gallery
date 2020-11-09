import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { API_CONFIG, API_CONFIG_TOKEN } from './shared/config/api.config';

describe('SharedService', () => {
  let service: SharedService;

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
});
