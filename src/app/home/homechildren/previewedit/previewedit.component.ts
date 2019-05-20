import { PizzaPartyComponent } from './../preview/preview.component';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-previewedit',
//   templateUrl: './previewedit.component.html',
//   styleUrls: ['./previewedit.component.scss']
// })
// export class PrevieweditComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { environment } from './../../../../environments/environment';
import { PopupComponent } from './../popup/popup.component';
import { HighlightService } from './../../highlight.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-previewedit',
  templateUrl: './previewedit.component.html',
  styleUrls: ['./previewedit.component.scss']
})
export class PrevieweditComponent implements OnInit {

  durationInSeconds = 2;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  filteredLanguages: Observable<string[]>;
  selected_languages: string[] = [];

  @ViewChild('languageInput') languageInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public route: ActivatedRoute, public post_details_builder: FormBuilder, private snackBar: MatSnackBar,
    public highlightService: HighlightService, public dialog: MatDialog, public http: HttpClient, public router: Router) {
    

    this.post_details = post_details_builder.group({
      'author': [null, Validators.required],
      'language': [null, Validators.required],
      'post_date': [null, Validators.required],
      'reading_time': [null, Validators.required],
      'post_type': [null, Validators.required],
    })
    this.getData();

    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.select_languages.slice()));
  }
  select_language: Array<string> = ['css', 'javascript', 'java', 'markup', 'typescript', 'sass', 'python', 'dart', 'docker', 'go',
    'c', 'julia', 'scala', 'sql', 'r', 'yaml', 'json', 'protobuf', 'nginx', 'bash', 'powershell'];

  writers: Array<any> = [
    { 'name': 'Naren Allam', 'linkedin_profile': 'https://www.linkedin.com/in/narendra-allam/' },
    { 'name': 'Srikar Govindarajula', 'linkedin_profile':'https://www.linkedin.com/in/srikarg/' },
    { 'name': 'Venkatesh Mondi', 'linkedin_profile':'' },
    { 'name': 'Sirisha Devineni', 'linkedin_profile':'' },
    { 'name': 'Vijay Sastry KVV', 'linkedin_profile':'' },
    { 'name': 'Anonymous', 'linkedin_profile': '' }
  // { 'name': 'Sai Charan A', 'linkedin_profile': 'https://www.linkedin.com/in/sai-charan-allam-08a75a17b/' },
  // { 'name': 'Chaitanya TVSK', 'linkedin_profile': 'www.linkedin.com/in/chaitu750' },
  // { 'name': 'Naresh N', 'linkedin_profile': 'https://www.linkedin.com/in/naresh-n-1997a3111/' },
  // { 'name': 'Vasu V', 'linkedin_profile': 'https://www.linkedin.com/in/vasudeva-vintha-3715451a/' },
  // { 'name': 'Raghav K', 'linkedin_profile': 'https://www.linkedin.com/in/raghavendra-naidu-karrothu-027a1b125/' },
  // { 'name': 'Nazeeruddin Md', 'linkedin_profile': 'https://www.linkedin.com/in/nazeeruddin-mohammad-4a4a20172/' },
  // { 'name': 'Sarvani N', 'linkedin_profile': 'https://www.linkedin.com/in/sarvani-nimmagadda-142105141/' },
  // { 'name': 'Pratyusha K', 'linkedin_profile': 'https://www.linkedin.com/in/riya-roy-656a63186/' },
  ];

  select_languages: Array<string> = ['abap', 'actionscript', 'ada', 'apacheconf', 'apl', 'applescript', 'arduino', 'arff', 'asciidoc', 'asm6502', 'aspnet', 'autohotkey', 'autoit', 'bash', 'basic', 'batch', 'bison', 'brainfuck', 'bro', 'c', 'clike', 'clojure', 'coffeescript', 'cpp', 'crystal', 'csharp', 'csp', 'css', 'css-extras', 'd', 'dart', 'diff', 'django', 'docker', 'eiffel', 'elixir', 'elm', 'erb', 'erlang', 'flow', 'fortran', 'fsharp', 'gedcom', 'gherkin', 'git', 'glsl', 'gml', 'go', 'graphql', 'groovy', 'haml', 'handlebars', 'haskell', 'haxe', 'hpkp', 'hsts', 'http', 'ichigojam', 'icon', 'inform7', 'ini', 'io', 'j', 'java', 'javascript', 'jolie', 'json', 'jsx', 'julia', 'keyman', 'kotlin', 'latex', 'less', 'liquid', 'lisp', 'livescript', 'lolcode', 'lua', 'makefile', 'markdown', 'markup', 'markup-templating', 'matlab', 'mel', 'mizar', 'monkey', 'n4js', 'nasm', 'nginx', 'nim', 'nix', 'nsis', 'objectivec', 'ocaml', 'opencl', 'oz', 'parigp', 'parser', 'pascal', 'perl', 'php', 'php-extras', 'plsql', 'powershell', 'processing', 'prolog', 'properties', 'protobuf', 'pug', 'puppet', 'pure', 'python', 'q', 'qore', 'r', 'reason', 'renpy', 'rest', 'rip', 'roboconf', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'smalltalk', 'smarty', 'soy', 'sql', 'stylus', 'swift', 'tap', 'tcl', 'textile', 'tsx', 'tt2', 'twig', 'typescript', 'vbnet', 'velocity', 'verilog', 'vhdl', 'vim', 'visual-basic', 'wasm', 'wiki', 'xeora', 'xojo', 'xquery', 'yaml']

  post_details: FormGroup;
  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 5;
  data: Array<any> = [];
  full_blog:any;

  ngOnInit() {
    this.generatePosts();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selected_languages.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.languageCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.selected_languages.indexOf(fruit);

    if (index >= 0) {
      this.selected_languages.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selected_languages.push(event.option.viewValue);
    console.log(this.selected_languages);
    this.languageInput.nativeElement.value = '';
    this.languageCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.select_languages.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  getData() {
    this.full_blog = JSON.parse(localStorage.getItem('edit_blog_data'));
    console.log(this.full_blog);
    this.data = this.full_blog['blog_data'];
    console.log(this.data);
    this.post_details.setValue({"author":this.full_blog['author'], 
      "language":this.full_blog['language'], "post_date":this.full_blog['post_date'], 
      "reading_time":this.full_blog['reading_time'], "post_type":this.full_blog['post_type']});
    this.post_details.value.language = this.full_blog['language'];
    this.post_details.value.post_date = this.full_blog['post_date'];
    this.post_details.value.reading_time = this.full_blog['reading_time'];
    this.post_details.value.post_type = this.full_blog['post_type'];
    console.log(this.post_details.value);
  }

  generatePosts() {
    for (let i = 0; i < this.no_of_posts; i++) {
      this.posts.push(i);
    }
    for (let i = 0; i < this.no_of_topics; i++) {
      this.topics.push(i)
    }
  }

  submit_post_details() {
    if (this.post_details.valid) {
      console.log(this.post_details.value);
      console.log(this.data);
      var post_data = this.post_details.value;
      post_data['blog_data'] = this.data;
      post_data['tags'] = this.selected_languages;
      // post_data['comments'] = [];
      post_data['created_at'] = this.full_blog['created_at'];
      post_data['last_modified'] = new Date();
      // post_data['clicks'] = 0;
      post_data['uid'] = this.full_blog['uid']
      // for (let i=0;i<post_data['blog_data'].length; i++){
      //   if (post_data['blog_data'][i]['name'] == 'image') {
      //     let format_data = post_data['blog_data'][i]['data'];
      //     format_data = format_data.split(";")
      //     let data_type = format_data[0];
      //     format_data = format_data[1].split(",")[1];
      //     console.log(format_data);
      //     post_data['blog_data'][i]['data'] = format_data;
      //   }
      // }
      console.log(post_data);
      var url = environment.server_url + 'update/blog';
      let headers = new HttpHeaders();
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
      // let headers = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      let body = JSON.stringify(post_data)
      // body = JSON.stringify({"hi":'hi'})
      // console.log(body)
      this.http.post(url, body, httpOptions).subscribe(
        data => {
          console.log(data);
          this.openDialog('success');
          this.reset_blog();
        }, error => {
          console.log(error);
          this.openDialog('error');
        }
      );
    }
  }

  selectLanguage(event: any) {
    let val = event.value;
  }

  selectPostType(event: any) {
    let val = event;
    console.log(val);
  }

  openDialog(type: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      // width: '500px',
      // height:'500px'
      data: {"type": type}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
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

  backPage() {
    this.router.navigate(['home/editblog'])
  }

  reset_blog(){
    localStorage.clear();
    this.router.navigate(['home/showblogs']);
    // window.location.reload();
  }

}

