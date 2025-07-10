import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasStore } from './personas-store';

describe('PersonasStore', () => {
  let component: PersonasStore;
  let fixture: ComponentFixture<PersonasStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
