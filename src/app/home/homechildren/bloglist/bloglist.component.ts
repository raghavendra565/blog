import { Router } from '@angular/router';
import { PizzaPartyComponent } from './../preview/preview.component';
import { HighlightService } from './../../highlight.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {

  durationInSeconds = 2;
  commenter_name: String = null;
  commenter_email: String = null;
  comment: String = null;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'title', 'edit'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public highlightService: HighlightService, public http: HttpClient, 
    private snackBar: MatSnackBar, public router: Router) { }
  data: Array<any> = [];
  list_blogs: Array<any> = [];

  ngOnInit() {
    this.getBlogs();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  getBlogs() {
    var url = environment.server_url + 'get/blogs';
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    // headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    // headers.append('Content-Type', 'multipart/form-data'); //charset=utf-8
    this.http.get(url).subscribe(data => {
      for (let j in data) {
        for (let i = 0; i < data[j]['blog_data'].length; i++) {
          if (data[j]['blog_data'][i]['name'] == 'image') {
            let format_data = data[j]['blog_data'][i]['data'];
            // format_data = format_data.split(";")
            // let data_type = format_data[0];
            // format_data = format_data[1].split(",")[1];
            // console.log(format_data);
            data[j]['blog_data'][i]['data'] = 'data:image/' + data[j]['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
          }
        }
        this.list_blogs.push(data[j]);
      }
      let count = 0;
      for (let i in data) {
        console.log(data[i]['blog_data']);
        for (let j = 0; j < data[i]['blog_data'].length; j++) {
          if (data[i]['blog_data'][j]['name'] == 'image') {
            data[i]['preview_image'] = data[i]['blog_data'][j]['data'];
            count = count + 1;
            break;
          }
        }
        console.log(i);
      }
      this.dataSource = new MatTableDataSource(this.list_blogs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.list_blogs);
    },
      error => {
        console.log(error);
      })
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  postComment(data: any, j: number) {
    console.log(j);
    console.log(data);
    if (this.comment != null) {
      if (this.commenter_name != null) {
        this.list_blogs[j]['comments'].push({ 'comment': this.comment, 'name': this.commenter_name, 'email': this.commenter_email });
      }
      else {
        this.list_blogs[j]['comments'].push({ 'comment': this.comment, 'name': 'Anonymous', 'email': this.commenter_email });
      }
      var url = environment.server_url + 'update/comment';
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
      var body = JSON.stringify({'uid':this.list_blogs[j]['uid'], 'comment':this.list_blogs[j]['comments'][this.list_blogs[j]['comments'].length - 1]});
      console.log(body);
      this.http.post(url, body, httpOptions).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
    }
  }

  editBlog(data: any){
    localStorage.setItem('edit_blog_data', JSON.stringify(data));
    this.router.navigate(['home/editblog'])
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
