import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Beer } from '../Model/beer';

@Injectable({
  providedIn: 'root'
})

export class AppService extends BehaviorSubject<any[]>{
  private favoriteBeers: Beer[] = [];
  constructor(public http: HttpClient, private toastr: ToastrService) {
    super([]);
  }

  private getBeersList(): Observable<Beer[]> {
    var result = this.http.get<Beer[]>('https://api.punkapi.com/v2/beers');
    return result;
  }

  private getFilteredBeersList(param: string, page:string): Observable<Beer[]> {
    var result = this.http.get<Beer[]>('https://api.punkapi.com/v2/beers?food=' + param + '&page=' + page + '&per_page=12');
    return result;
  }

  private getPaginationBeersList(page: string): Observable<Beer[]> {
    var result = this.http.get<Beer[]>('https://api.punkapi.com/v2/beers?page=' + page + '&per_page=12');
    return result;
  }

  public fetch(view: string, page: string = "1", searchText: string = ''): Observable<Beer[]> {
    switch (view) {
      case 'Beers':
        return this.getBeersList();
      case 'FilteredBeers':
        return this.getFilteredBeersList(searchText, page);
      case 'PaginationBeers':
        return this.getPaginationBeersList(page);
      default:
        break;
    }
    return this.getBeersList();
  }

  public addBeerToFavorite(beer: Beer) {
    this.favoriteBeers.push(beer);
  }

  public removeBeerFromFavorite(beer: Beer) {
    let tempFavoriteBeers: Beer[] = [];
    this.favoriteBeers.forEach(item => {
      if (item.id !== beer.id) {
        tempFavoriteBeers.push(item);
      }
    })
    this.favoriteBeers = tempFavoriteBeers;
  }

  public getFavoriteBeers(): Beer[] {
    return this.favoriteBeers;
  }

  public removeAllFromFavorite() {
    this.favoriteBeers = [];
    this.toastr.success("All beers from the favorites were removed successfully!", "Remove All");
  }

  public updateRank(beer: Beer, rank: string) {
    let index = this.favoriteBeers.findIndex(item => item.id === beer.id);
    this.favoriteBeers[index].rank = rank;
  }

}
