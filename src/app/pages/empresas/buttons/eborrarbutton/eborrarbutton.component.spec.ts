import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EborrarbuttonComponent } from './eborrarbutton.component';

describe('EborrarbuttonComponent', () => {
  let component: EborrarbuttonComponent;
  let fixture: ComponentFixture<EborrarbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EborrarbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EborrarbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
