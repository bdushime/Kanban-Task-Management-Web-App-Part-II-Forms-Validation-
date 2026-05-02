import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { Board } from '../../../models/board.model';
@Component({
  selector: 'app-board-details',
  imports: [CommonModule],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.css',
})
export class BoardDetailsComponent implements OnInit {
 boardId: string | null = null;
 currentBoard: Board | undefined

 constructor(private route:ActivatedRoute,private boardService:BoardService){}

 ngOnInit(): void {
  this.route.paramMap.subscribe(params =>{
    this.boardId = params.get('id');

    if(this.boardId !== null){
      this.currentBoard = this.boardService.getBoardById(Number(this.boardId));
      console.log('Loaded Board Data:',this.currentBoard);
    }

    this.route.queryParamMap.subscribe(params => {
      console.log('Query Params:', params.get('view'));
    });

  });
 }



}
