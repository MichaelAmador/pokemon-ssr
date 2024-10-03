import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { Location } from '@angular/common';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about"', async () => {
    await router.navigate(['/about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "/pokemons/page/1"', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should navigate to "/about" when page is invalid or unknown', async () => {
    await router.navigate(['/unknown-page']);
    expect(location.path()).toBe('/about');
  });

  it('should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutComponent = (await aboutRoute.loadComponent!()) as any;

    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(pokemonPageRoute).toBeDefined();

    const pokemonPageComponent = (await pokemonPageRoute.loadComponent!()) as any;

    expect(pokemonPageComponent.default.name).toBe('PokemonPageComponent');
  });
});
