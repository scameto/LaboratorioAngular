import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsumoComponent } from './create-insumo.component';

describe('CreateInsumoComponent', () => {
  let component: CreateInsumoComponent;
  let fixture: ComponentFixture<CreateInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsumoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
