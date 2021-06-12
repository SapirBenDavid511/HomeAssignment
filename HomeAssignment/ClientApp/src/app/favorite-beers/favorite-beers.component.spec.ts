import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBeersComponent } from './favorite-beers.component';

describe('FavoriteBeersComponent', () => {
  let component: FavoriteBeersComponent;
  let fixture: ComponentFixture<FavoriteBeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteBeersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
