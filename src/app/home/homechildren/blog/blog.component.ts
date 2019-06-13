import { environment } from './../../../../environments/environment';
import { HighlightService } from './../../highlight.service';
import * as Prism from 'prismjs';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import hljs from 'highlight.js';
declare var $: any;
// declare var Prism;

function readBase64(file): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);
    // reader.readAsArrayBuffer(file);
    // reader.readAsBinaryString(file);
    reader.readAsDataURL(file);
    // reader.readAsText(file);
  });
  return future;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(public highlightService: HighlightService, public router: Router, public http: HttpClient) { }
  add_flag: boolean = true;
  list_flag: boolean = false;
  show_preview: boolean = false;
  state: Array<boolean> = [false, false, false, false, false, false];
  // { "name": 'text', "position": 1, "file": "", "data": "", "placing": "", "language": "" }
  data: Array<any> = [{ "name": 'title', "position": 0, "file": "", "data": "", "placing": "", "language": "" }];
  select_language: Array<string> = ['css', 'javascript', 'java', 'markup', 'typescript', 'sass', 'python', 'dart', 'docker', 'go',
    'c', 'julia', 'scala', 'sql', 'r', 'yaml', 'json', 'protobuf', 'nginx', 'bash', 'powershell']

    select_languages: Array<string> =['abap', 'actionscript', 'ada', 'apacheconf', 'apl', 'applescript', 'arduino', 'arff', 'asciidoc', 'asm6502', 'aspnet', 'autohotkey', 'autoit', 'bash', 'basic', 'batch', 'bison', 'brainfuck', 'bro', 'c', 'clike', 'clojure', 'coffeescript', 'cpp', 'crystal', 'csharp', 'csp', 'css', 'css-extras', 'd', 'dart', 'diff', 'django', 'docker', 'eiffel', 'elixir', 'elm', 'erb', 'erlang', 'flow', 'fortran', 'fsharp', 'gedcom', 'gherkin', 'git', 'glsl', 'gml', 'go', 'graphql', 'groovy', 'haml', 'handlebars', 'haskell', 'haxe', 'hpkp', 'hsts', 'http', 'ichigojam', 'icon', 'inform7', 'ini', 'io', 'j', 'java', 'javascript', 'jolie', 'json', 'jsx', 'julia', 'keyman', 'kotlin', 'latex', 'less', 'liquid', 'lisp', 'livescript', 'lolcode', 'lua', 'makefile', 'markdown', 'markup', 'markup-templating', 'matlab', 'mel', 'mizar', 'monkey', 'n4js', 'nasm', 'nginx', 'nim', 'nix', 'nsis', 'objectivec', 'ocaml', 'opencl', 'oz', 'parigp', 'parser', 'pascal', 'perl', 'php', 'php-extras', 'plsql', 'powershell', 'processing', 'prolog', 'properties', 'protobuf', 'pug', 'puppet', 'pure', 'python', 'q', 'qore', 'r', 'reason', 'renpy', 'rest', 'rip', 'roboconf', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'smalltalk', 'smarty', 'soy', 'sql', 'stylus', 'swift', 'tap', 'tcl', 'textile', 'tsx', 'tt2', 'twig', 'typescript', 'vbnet', 'velocity', 'verilog', 'vhdl', 'vim', 'visual-basic', 'wasm', 'wiki', 'xeora', 'xojo', 'xquery', 'yaml']
  
  ngOnInit() {
    try {
      var data = JSON.parse(localStorage.getItem('data'));
      if( data == null){
        this.data = [{ "name": 'title', "position": 0, "file": "", "data": "", "placing": "", "language": "" }];
      }else{
        this.data = data;
      }
    }
    catch {
      this.data = [{ "name": 'title', "position": 0, "file": "", "data": "", "placing": "", "language": "" }];
    }
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  add() {
    if (this.add_flag) {
      this.add_flag = false;
    }
    else {
      this.add_flag = true;
    }
  }

  remove(pos: number) {
    this.data.splice(pos, 1);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['position'] = i
    }
    localStorage.setItem('data', JSON.stringify(this.data))
  }

  addElement(event: any, pos: number) {
    try {
      this.data.splice(pos + 1, 0, { "name": event, "position": pos + 1, "file": "", "data": "", "placing": "", "language": "", "class": "" });

      for (let i = 0; i < this.data.length; i++) {
        this.data[i]['position'] = i
      }
    }
    catch {
      this.data.splice(pos, 0, { "name": "title", "position": 0, "file": "", "data": "", "placing": "", "language": "" });
    }
    this.add_flag = true;
  }

  selectFile(pos: number, event: any) {
    this.data[pos]["file"] = event.target.files[0];
    this.readURL(pos, event.target);
  }

  selectLanguage(pos: any, event: any) {
    let val = event.value
    this.data[pos]["language"] = val;
    this.data[pos]["class"] = "language-" + val;
  }

  showPreview() {
    if (this.show_preview) {
      this.show_preview = false;
    } else {
      this.show_preview = true;
      localStorage.setItem('data', JSON.stringify(this.data))
      this.router.navigate(['home/preview'])
    }
  }

  inputValue(pos: number, event: any) {
    var value = event.target.value;
    this.data[pos]["data"] = value;
    localStorage.setItem('data', JSON.stringify(this.data))
  }

  readURL(pos: number, input) {
    if (input.files && input.files[0]) {
      readBase64(input.files[0]).then((data: any) => {
        this.data[pos]['data'] = data;
        data = data.split(";")
        let data_type = data[0];
        try{
          this.data[pos]['file_type'] = '.'+data_type.split('/')[1];
        }
        catch{
          this.data[pos]['file_type'] = '.'+data_type.split('/')[0];
        }
        data = data[1].split(",")[1];
      })
    }
  }

  reset_blog(){
    localStorage.clear();
    window.location.reload();
  }
}


// console.log(this.data);
// var url = environment.server_url + 'test';
// let headers = new HttpHeaders();
// const httpOptions = {
//   headers: new HttpHeaders({
//     // 'content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   })
// }
// headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
// headers.append('Content-Type', 'multipart/form-data'); //charset=utf-8
// var form: FormData = new FormData();
// console.log(data);


// this.data[pos]['data'] = data
// console.log(data);
// form.append('data_type', data);
// form.append('sample', input.files[0]);
// form.append('blog_data', JSON.stringify(this.data));
// this.http.post(url, form, httpOptions).subscribe(data => {
//   console.log(data);
// }, error => {
//   console.log(error);
// })

// = function (e: any) {
//   console.log(e);
//   $('#imagetag').attr('src', e.target.result).width(300);
// };


// var future = new Promise((resolve, reject) => {
//   reader.addEventListener("load", function (e: any) {
//     resolve(reader.result);
//     console.log(e);
//     // $('#imagetag').attr('src', e.target.result).width(300);
//   }, false);
//   // this.data[pos]['file'] =  
//   reader.readAsDataURL(input.files[0]);
// });
// console.log(future);



// hooks = {
//   'before-sanity-check': (env) => { console.log(`before-sanity-check`, env); },
//   'before-highlight': (env) => { console.log(`before-highlight`, env); },
//   'after-highlight': (env) => { console.log(`after-highlight`, env); },
//   'complete': (env) => { console.log(`complete`, env); },
//   'before-insert': (env) => { console.log(`before-insert`, env); }
// };
// interpolate = {
//   language: 'language interpolated'
// };
// language = 'py';

// this.highlighted = true;
// }

// if (this.blogPost && !this.highlighted) {

// ht: string = `<div>hihi</div>`
// cod: string = `
// var code = "something" `
// content: string = `
// # Python Program - Example No.2

// print("Enter 'x' for exit.");
// val = input();
// if val == 'x':
//   exit();
// else:
//   print("Hello,",val,"Sir, You are at codescracker.com");
// `
