import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasIndex } from './personas-index';

describe('PersonasIndex', () => {
  let component: PersonasIndex;
  let fixture: ComponentFixture<PersonasIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
