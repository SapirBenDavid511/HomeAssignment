import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beer } from '../Model/beer';
import { AppService } from '../Service/app.service';

@Component({
  selector: 'app-favorite-beers',
  templateUrl: './favorite-beers.component.html',
  styleUrls: ['./favorite-beers.component.css']
})
export class FavoriteBeersComponent implements OnInit {
  private closeModal: any;

  constructor(public appService: AppService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  removeAll(modal:any) {
    this.appService.removeAllFromFavorite();
    modal.close('Save click');
  }

  public openModal(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = 'Closed with: ${res}';
    }, (res) => {
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

}
