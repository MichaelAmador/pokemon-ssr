import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'Bulbasaur' },
  { id: '2', name: 'Ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list correctly', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      mockPokemons.length
    );
  });

  it('should render "There is no Pokemons!" if the list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')).toBeTruthy();
    expect(compiled.querySelector('div')?.innerText).toBe(
      'There is no Pokemons!'
    );
  });
});
