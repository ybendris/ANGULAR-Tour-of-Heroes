import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroesFromService();
  }

  getHeroesFromService(): void{
    this.heroService.getHeroes().subscribe(heroes =>
      this.heroes = heroes.slice(1, 5)
    );
  }
}
