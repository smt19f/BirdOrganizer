import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoTabComponent } from './io-tab.component';

describe('IoTabComponent', () => {
  let component: IoTabComponent;
  let fixture: ComponentFixture<IoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
