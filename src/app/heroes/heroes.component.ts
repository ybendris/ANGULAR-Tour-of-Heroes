import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'sw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //selectedHero ?: Hero;

  heroes ?: Hero[];


  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroesFromService();
  }

  /*onSelect(hero : Hero): void{
    console.log(hero.name);
    this.selectedHero = hero;
  }*/

  getHeroesFromService(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes = this.heroes ? [...this.heroes, hero] : [hero];
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes?.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
