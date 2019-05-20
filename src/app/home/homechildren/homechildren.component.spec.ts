import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomechildrenComponent } from './homechildren.component';

describe('HomechildrenComponent', () => {
  let component: HomechildrenComponent;
  let fixture: ComponentFixture<HomechildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomechildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomechildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
