import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HartaComponent } from './harta.component';

describe('HartaComponent', () => {
  let component: HartaComponent;
  let fixture: ComponentFixture<HartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
