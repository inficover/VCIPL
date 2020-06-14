import { NgModule } from "@angular/core";
import { TreeTableModule } from "primeng/treetable";
import { ContextMenuModule } from "primeng/contextmenu";
import { TableModule } from "primeng/table";
import { DynamicDialogModule, DialogService } from "primeng/dynamicdialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { AccordionModule } from "primeng/accordion";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



const modules = [
  TreeTableModule,
  ContextMenuModule,
  TableModule,
  DynamicDialogModule,
  RadioButtonModule,
  SelectButtonModule,
  AccordionModule,
  ConfirmDialogModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [DialogService, ConfirmationService],
})
export class PrimeNgWrapperModule {}
