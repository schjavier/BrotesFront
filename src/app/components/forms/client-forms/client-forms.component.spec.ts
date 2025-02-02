import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormsComponent } from './client-forms.component';

describe('ClientFormsComponent', () => {
  let component: ClientFormsComponent;
  let fixture: ComponentFixture<ClientFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
