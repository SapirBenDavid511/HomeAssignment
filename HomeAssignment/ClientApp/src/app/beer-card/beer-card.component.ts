import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Beer } from '../Model/beer';
import { Field } from '../Model/more-info-beers';
import { AppService } from '../Service/app.service';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.css']
})
export class BeerCardComponent implements OnInit {
  @Input() beer!: Beer;
  @Input() needRank!: boolean;
  public numbers: Array<number> = new Array(5);
  public fields: Field[] = [];
  private closeModal: any;

  constructor(private modalService: NgbModal, private appService: AppService, private toastr: ToastrService) {
    for (var i = 0; i < 5; i++)
    {
      this.numbers[i] = i + 1;
    }
  }

  ngOnInit(): void {
    this.fields = [{ Name: "Description", Value: this.beer.description },
    { Name: "First Brewed", Value: this.beer.first_brewed },
    { Name: "Tagline", Value: this.beer.tagline },
    { Name: "PH", Value: this.beer.ph }]
  }

  updateFavorite() {
    this.beer.is_favorite = !this.beer.is_favorite;
    if (this.beer.is_favorite) {
      this.appService.addBeerToFavorite(this.beer);
      this.toastr.success("The beer was added to the Favorites successfully!", this.beer.name);
    }
    else {
      this.appService.removeBeerFromFavorite(this.beer);
      this.toastr.success("The beer was removed from the Favorites successfully!", this.beer.name);
    }
  }

  public openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res: any) => {
      this.closeModal = 'Closed with: ${res}';
    }, (res: any) => {
      this.closeModal = 'Dismissed ${this.getDismissReason(res)}';
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: ${reason}';
    }
  }

  chooseRank(event: any) {
    this.appService.updateRank(this.beer, event.target.value);
  }
  isSelected(i: number): boolean {
    return i.toString() === this.beer.rank;
  }
}
