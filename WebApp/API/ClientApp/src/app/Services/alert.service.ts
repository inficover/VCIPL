import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  itemsLoading$ = new Subject<Number>();
  SuccesMessageAlert(Message: string, actionType?: any) {
    this.snackBar.open(Message, actionType, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center",
      // panelClass: ['red-snackbar'],
    });
  }

  FailureMessageAlert(Message: string, actionType: any) {
    this.snackBar.open(Message, actionType, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["red-snackbar"],
    });
  }
}
