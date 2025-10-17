import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifHistoryPage } from './gif-history-page';

describe('GifHistoryPage', () => {
  let component: GifHistoryPage;
  let fixture: ComponentFixture<GifHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifHistoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
