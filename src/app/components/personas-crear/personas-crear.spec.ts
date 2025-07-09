import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCrear } from './personas-crear';

describe('PersonasCrear', () => {
  let component: PersonasCrear;
  let fixture: ComponentFixture<PersonasCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasCrear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
