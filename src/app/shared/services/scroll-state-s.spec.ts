import { TestBed } from '@angular/core/testing';

import { ScrollStateS } from './scroll-state-s';

describe('ScrollStateS', () => {
  let service: ScrollStateS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollStateS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
