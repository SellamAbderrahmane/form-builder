import { Injectable } from "@angular/core"

import { HomeState, SHome } from "./home.state"
import { HttpService, Status, Tools } from "src/app/shared"

@Injectable({ providedIn: "root" })
export class HomeService extends Tools {
  constructor(private http: HttpService) {
    super()
  }
}
