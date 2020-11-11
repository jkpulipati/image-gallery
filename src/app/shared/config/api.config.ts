import { InjectionToken } from '@angular/core';

export const API_CONFIG = {
    RANDOM_IMAGE: '/200/300',
    GALLERY: '/v2/list',
    GALLERY_PAGE_COUNT: '?page=',
    GALLERY_LIMIT_COUNT: '&limit='
};


export const API_CONFIG_TOKEN = new InjectionToken<typeof API_CONFIG>('api.config');
