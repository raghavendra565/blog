import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomechildrenRoutingModule } from './homechildren-routing.module';
import { HomechildrenComponent } from './homechildren.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewComponent, PizzaPartyComponent } from './preview/preview.component';
import { PopupComponent } from './popup/popup.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { EditblogComponent } from './editblog/editblog.component';
import { PrevieweditComponent } from './previewedit/previewedit.component';
// import { PrismModule } from '@ngx-prism/core';

@NgModule({
  declarations: [HomechildrenComponent, BlogComponent, PreviewComponent, PopupComponent, BloglistComponent, PizzaPartyComponent, EditblogComponent, PrevieweditComponent],
  imports: [
    CommonModule,
    HomechildrenRoutingModule,
    SharedModule
    // PrismModule
  ],
  exports: [
    BlogComponent
  ],
  entryComponents: [
    PopupComponent,
    PizzaPartyComponent
  ]
})
export class HomechildrenModule { }
