export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export interface JSONDict { [key: string]: any }
export type JSONList = any[]
export type JSONObject = JSONDict | JSONList
export type JSONAny = JSONList | JSONDict | null

export const a = ""
