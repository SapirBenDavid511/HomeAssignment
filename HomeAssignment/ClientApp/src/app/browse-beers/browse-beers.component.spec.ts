import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBeersComponent } from './browse-beers.component';

describe('BrowseBeersComponent', () => {
  let component: BrowseBeersComponent;
  let fixture: ComponentFixture<BrowseBeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseBeersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
