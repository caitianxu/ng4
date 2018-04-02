import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';


declare let wangEditor: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public service: AppService) { }

  ngOnInit() {
   
  }
  ngAfterViewInit(){
    
    var editor = new wangEditor('#editor');
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    editor.txt.clear();
    editor.txt.html('<p>用 JS 设置的内容</p>');
    editor.txt.append('<p>追加的内容</p>');
    console.log(editor.txt.html())
    console.log(editor.txt.text())
  }

}
