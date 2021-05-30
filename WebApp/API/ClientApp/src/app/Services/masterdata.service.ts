import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MasterData {
    data;

    constructor(private httpServie: HttpClient) {
    }

    // public getQuoteMasterData(insurerId: Number = 1) {
    //     return this.httpServie.get(`api/MasterData/GetQuoteMasterData?insurerId=${insurerId}`);
    // }
}
