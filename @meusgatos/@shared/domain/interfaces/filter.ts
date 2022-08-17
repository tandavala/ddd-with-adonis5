/* eslint-disable @typescript-eslint/naming-convention */
export interface IFilter {
  id: number
  search: string
  searchBy: string[]
  isDeleted: boolean
  orderBy: string
  typeOrderBy: "asc" | "desc"
}
