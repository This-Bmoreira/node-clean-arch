import { type SearchProps, type SortDirection } from '../../../../adapter/gateways/repository.interface'

const defaultValue = 15
export class SearchParams <Filter = string> {
  protected _page: number
  protected _perPage = defaultValue
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: Filter | null

  constructor (props: SearchProps<Filter> = {}) {
    this.page = props.page
    this.perPage = props.perPage
    this.sort = props.sort
    this.sortDir = props.sortDir
    this.filter = props.filter
  }

  get page (): number {
    return this._page
  }

  private set page (value: number) {
    let _page = +value
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1
    }
    this._page = _page
  }

  get perPage (): number {
    return this._perPage
  }

  private set perPage (value: number) {
    let _perPage = value === (true as any) ? this._perPage : +value
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage
    }
    this._perPage = _perPage
  }

  get sort (): string {
    return this._sort
  }

  private set sort (value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir (): string {
    return this._sortDir
  }

  private set sortDir (value: string | null) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.sort === null) {
      this._sortDir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir
  }

  get filter (): Filter | null {
    return this._filter
  }

  private set filter (value: Filter | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : (`${value}` as any)
  }
}
