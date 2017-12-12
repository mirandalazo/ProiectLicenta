import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficeComponent } from './grafice.component';

describe('GraficeComponent', () => {
  let component: GraficeComponent;
  let fixture: ComponentFixture<GraficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
