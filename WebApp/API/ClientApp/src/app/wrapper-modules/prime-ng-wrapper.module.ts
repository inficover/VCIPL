import { NgModule } from "@angular/core";
import { TreeTableModule } from "primeng/treetable";
import { ContextMenuModule } from "primeng/contextmenu";
import { TableModule } from "primeng/table";
import { DynamicDialogModule, DialogService } from "primeng/dynamicdialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { AccordionModule } from "primeng/accordion";

const modules = [
  TreeTableModule,
  ContextMenuModule,
  TableModule,
  DynamicDialogModule,
  RadioButtonModule,
  SelectButtonModule,
  AccordionModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [DialogService],
})
export class PrimeNgWrapperModule {}
