import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class QuoteService {
    data;

    constructor(private httpServie: HttpClient) {
    }

    public getQuoteMasterData(insurerId: Number = 1) {
        return this.httpServie.get(`api/MasterData/GetQuoteMasterData?insurerId=${insurerId}`);
    }
    public getQuote(quoteModel) {
        return this.httpServie.post(`api/Quote/GetQuote`, quoteModel);
    }
}
