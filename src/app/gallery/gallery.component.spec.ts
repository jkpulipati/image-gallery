import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GalleryComponent } from './gallery.component';
import { SharedService } from '../shared/services/shared.service';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { ImageInfoModel } from '../shared/config/models';
import { of, throwError } from 'rxjs';
import { global } from '@angular/compiler/src/util';
import { computeMsgId } from '@angular/compiler';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let SharedServiceMock: SharedService;
  const URL = {
    createObjectURL: () => 'something'
  };
  const imageInfo: ImageInfoModel = {
    download_url: 'https://picsum.photos/id/0/5616/3744',
    author: 'Alejandro Escamilla',
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    id: 12,
    width: 100,
    height: 200
  };
  const imagesList = [imageInfo,
    {...imageInfo, id: 2},
    {...imageInfo, id: 13}, {...imageInfo, id: 14},
    {...imageInfo, id: 15}, {...imageInfo, id: 16}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GalleryComponent ],
      providers: [
        SharedService,
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    SharedServiceMock = TestBed.inject(SharedService);
    spyOn(SharedServiceMock, 'getGalleryImages').and.returnValue(of(imagesList));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Func: downloadImage ', () => {
    it('downloadImage function test which yields success ', () => {
      global.URL.createObjectURL = jasmine.createSpy('createObjectURL', () => {});
      spyOn(global, 'fetch').and.returnValue(Promise.resolve({
        blob: () => Promise.resolve({})
      }));
      component.downloadImage(imageInfo);
    });
  });

  describe('Func: loadNextImages ', () => {
    it('should call loadNextImages and load images ', () => {
      component.pageNumber = 2;
      component.loadNextImages();
      expect(component.pageNumber).toEqual(3);
    });

    it('should not trigger service to load images ', () => {
      component.pageNumber = -2;
      component.loadNextImages();
      expect(component.pageNumber).toEqual(-1);
    });

  });

  describe('Func: loadPreviousImages ', () => {
    it('should call loadPreviousImages and load images ', () => {
      component.pageNumber = 3;
      component.loadPreviousImages();
      expect(component.pageNumber).toEqual(2);
    });

    it('should not trigger service to load images ', () => {
      component.pageNumber = -2;
      component.loadPreviousImages();
      expect(component.pageNumber).toEqual(-3);
    });
  });

  describe('Func: changeImagesPerPage ', () => {
    it('changeImagesPerPage function test ', () => {
      component.changeImagesPerPage();
      expect(component.images$).toBeDefined();
    });
  });
});
