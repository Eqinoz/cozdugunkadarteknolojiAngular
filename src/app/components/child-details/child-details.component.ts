import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildService} from '../../services/child.service';
import {Child} from '../../models/child';

@Component({
  selector: 'app-child-details',
  imports: [],
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.css'
})
export class ChildDetailsComponent implements OnInit {
  id: number;
  child: Child;

  constructor(private route:ActivatedRoute,private childService:ChildService) {
    route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }
    ngOnInit(): void {
        this.getChildDetails(this.id)

    }

    getChildDetails(id:number){
        this.childService.getChildById(id).subscribe(response =>{
          this.child=response.data
          console.log(this.child)
        })
    }


}
