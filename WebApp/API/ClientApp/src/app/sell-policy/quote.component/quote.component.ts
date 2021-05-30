import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-quote-error-details',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss']
})
export class QuoteErrorDetailsComponent implements OnInit {
    @Input() quote;
    @Input() insurerId;

    constructor(private router: Router) { }

    ngOnInit() {
    }
    onSubmit() {
        this.router.navigate(['/updateVehicleDetails', { quoteId: this.quote.data.quotE_ID, insurerId: 1 }])
    }
}