import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechproxComponent } from './fechprox.component';

describe('FechproxComponent', () => {
  let component: FechproxComponent;
  let fixture: ComponentFixture<FechproxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechproxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechproxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
