import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Beer } from '../Model/beer';
import { AppService } from '../Service/app.service';

@Component({
  selector: 'app-browse-beers',
  templateUrl: './browse-beers.component.html',
  styleUrls: ['./browse-beers.component.css']
})
export class BrowseBeersComponent implements OnInit {
  public beers: Beer[] = [];
  public page: number = 1;
  form = new FormGroup({
    searchText: new FormControl('', [Validators.required])
  });
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    if (this.beers.length===0) {
      this.appService.fetch("PaginationBeers", "1").subscribe(response => {
        this.updateFavoriteInBeers(response);
        console.log(this.beers);
      }, error => {
        console.log(error);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status === 'VALID') {
      this.page = 1;
      this.appService.fetch("FilteredBeers", this.page.toString(), this.form.value.searchText).subscribe(response => {
        this.updateFavoriteInBeers(response);
        console.log(this.beers);
      }, error => {
        console.log(error);
      });
      console.log(this.form.value);
    }
  }

  handlePageChange(event:any) {
    this.page = event;
    if (this.form.value.searchText !== "") {
      this.appService.fetch("FilteredBeers", this.page.toString(), this.form.value.searchText).subscribe(response => {
        this.updateFavoriteInBeers(response);
        console.log(this.beers);
      }, error => {
        console.log(error);
      });
    } else {
      this.appService.fetch("PaginationBeers", this.page.toString()).subscribe(response => {
        this.updateFavoriteInBeers(response);
        console.log(this.beers);
      }, error => {
        console.log(error);
      });
    }
  }

  private updateFavoriteInBeers(response: any) {
    this.beers = response;
    this.appService.getFavoriteBeers().forEach(item => {
      let index = this.beers.findIndex(beer => beer.id === item.id);
      if (index !== -1) {
        this.beers[index].is_favorite = item.is_favorite;
      }
    });
  }

}
