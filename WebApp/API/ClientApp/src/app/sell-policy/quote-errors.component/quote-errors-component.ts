import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-quote-error-details',
    templateUrl: './quote-errors-component.html',
    styleUrls: ['./quote-errors-component.scss']
})
export class QuoteErrorDetailsComponent implements OnInit {
    @Input() quote;
    ngOnInit() {
    }
}