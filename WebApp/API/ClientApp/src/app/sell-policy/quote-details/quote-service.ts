import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class QuoteService {
    data;
    masterData;
    constructor(private httpServie: HttpClient) {
    }

    public getQuoteMasterData(insurerId: Number) {
        if (this.masterData) {
            return of(this.masterData);
        }
        return this.httpServie.get(`api/MasterData/GetQuoteMasterData?insurerId=${insurerId}`).pipe(tap((response) => {
            this.masterData = response;
        }));
    }
    public getQuote(quoteModel) {
        return this.httpServie.post(`api/Quote/GetQuote`, quoteModel);
    }
}
