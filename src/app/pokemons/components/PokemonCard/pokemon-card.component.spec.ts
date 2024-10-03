import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input value', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    expect(compiled.querySelector('h2')).toBeTruthy();
    expect(compiled.querySelector('h2')?.innerText).toBe(mockPokemon.name);
    expect(compiled.querySelector('img')).toBeTruthy();
  });

  it('should have the proper ng-reflect-router-link', () => {
    const diveElement = compiled.querySelector('div');
    expect(diveElement?.getAttribute('ng-reflect-router-link')).toBe(
      `/pokemons,${mockPokemon.name}`
    );
  });
});
