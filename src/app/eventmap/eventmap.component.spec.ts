import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmapComponent } from './eventmap.component';

describe('EventmapComponent', () => {
  let component: EventmapComponent;
  let fixture: ComponentFixture<EventmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
