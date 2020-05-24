import { NgModule } from "@angular/core";
import { TreeTableModule } from "primeng/treetable";
import { ContextMenuModule } from "primeng/contextmenu";
import { TableModule } from "primeng/table";
import { DynamicDialogModule, DialogService } from "primeng/dynamicdialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";

const modules = [
  TreeTableModule,
  ContextMenuModule,
  TableModule,
  DynamicDialogModule,
  RadioButtonModule,
  SelectButtonModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [DialogService],
})
export class PrimeNgWrapperModule {}
