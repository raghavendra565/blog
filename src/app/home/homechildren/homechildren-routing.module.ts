import { PrevieweditComponent } from './previewedit/previewedit.component';
import { PreviewComponent } from './preview/preview.component';
import { HomechildrenComponent } from './homechildren.component';
import { BlogComponent } from './blog/blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloglistComponent } from './bloglist/bloglist.component';
import { EditblogComponent } from './editblog/editblog.component';

const routes: Routes = [
  // {path:'', component: HomechildrenComponent},
  {path:'', redirectTo:'blog', pathMatch: "full"},
  {path:'blog', component: BlogComponent},
  {path: 'preview', component: PreviewComponent},
  {path: 'showblogs', component: BloglistComponent},
  {path: 'editblog', component: EditblogComponent},
  {path: 'previewedit', component: PrevieweditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomechildrenRoutingModule { }
