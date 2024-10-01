import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/PokemonList/PokemonList.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit, OnDestroy {
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log(isStable);
  // });
  ngOnInit(): void {
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 2500);
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
