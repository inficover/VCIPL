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
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
// import { AutoCompleteModule } from 'primeng/autocomplete';



const modules = [
  TreeTableModule,
  ContextMenuModule,
  TableModule,
  DynamicDialogModule,
  RadioButtonModule,
  SelectButtonModule,
  AccordionModule,
  ConfirmDialogModule,
  DropdownModule,
  DialogModule,
  PaginatorModule,
  MultiSelectModule,
  // AutoCompleteModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [DialogService, ConfirmationService],
})
export class PrimeNgWrapperModule { }
