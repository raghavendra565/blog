import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevieweditComponent } from './previewedit.component';

describe('PrevieweditComponent', () => {
  let component: PrevieweditComponent;
  let fixture: ComponentFixture<PrevieweditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevieweditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevieweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
