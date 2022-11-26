import { Injectable } from "@angular/core"

import { HttpService, Status, Tools } from "src/app/shared"

@Injectable({ providedIn: "root" })
export class HomeService extends Tools {
  constructor(private http: HttpService) {
    super()
  }
}
