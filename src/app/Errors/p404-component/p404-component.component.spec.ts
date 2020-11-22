import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P404ComponentComponent } from './p404-component.component';

describe('P404ComponentComponent', () => {
  let component: P404ComponentComponent;
  let fixture: ComponentFixture<P404ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P404ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P404ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
