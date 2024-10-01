import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from '../PokemonCard/PokemonCard.component';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './PokemonList.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
