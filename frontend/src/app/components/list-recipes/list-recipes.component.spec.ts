import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipesComponent } from './list-recipes.component';

describe('ListRecipesComponent', () => {
  let component: ListRecipesComponent;
  let fixture: ComponentFixture<ListRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
