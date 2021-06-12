import { Component, OnInit } from '@angular/core';
import { Link } from '../Model/link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = true;
  public links: Link[] = [{ ID: 1, Active: true, Name: "Browse Beers", Route: "" },
    { ID: 2, Active: false, Name: "Favorite Beers", Route: "/favorites" }];
  private prevSelected: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  updateActive(id: number) {
    if (id === 0) {
      let index = this.links.findIndex(el => el.Active === true);
      this.links[index].Active = false;
      this.links[0].Active = true;
    }
    else {
      let index = this.links.findIndex(el => el.Active === true);
      this.links[index].Active = false;
      let i = this.links.findIndex(el => el.ID === id);
      this.links[i].Active = true;
    }
    this.prevSelected = id;
  }
}
