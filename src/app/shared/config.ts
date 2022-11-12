import { environment } from "src/environments/environment"
import { User } from "./models"
import { AxiosClientParams } from "./utils/axios.client"

export interface APPCONFIG {
  host?: string
  loading?: boolean
  accessToken?: string
  title?: string
  lang?: string
  logo?: string
  theme?: "dark" | "light"
  mode?: "dev" | "pro"
  dateFormat?: string
  axios?: AxiosClientParams
  drawer?: any
  currentUser?: User
  menus?: any[]
  subscriber?: PushSubscription
}

export const defaultConfig: APPCONFIG = {
  loading: true,
  mode: "dev",
  lang: "fr",
  theme: "light",
  title: "GED",
  logo: "assets/logo.svg",
  host: environment.baseUrl,
  accessToken: null,
  axios: {
    baseURL: environment.apiUrl,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // withCredentials: true,
  },
  dateFormat: "DD/MM/YYYY",
  drawer: {
    title: "Orass Suite",
    closable: true,
    width: "40%",
    placement: "left",
    visible: false,
    maskClosable: false,
  },
  menus: [],
}
