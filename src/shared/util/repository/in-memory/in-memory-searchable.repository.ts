import { type SearchableRepositoryInterface } from '../../../../adapter/gateways/repository.interface'
import { type Entity } from '../../../../domain/entity/entity'
import { type SearchParams } from '../search-params/search-params'
import { SearchResult } from '../search-params/search-result'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any> {
  sortableFields: string[] = []
  async search (props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage
    )
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter
    })
  }
  protected abstract applyFilter (
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort (
    items: E[],
    sort: string | null,
    sortDir: string | null
  ): Promise<E[]> {
    if (sort === null || !this.sortableFields.includes(sort)) {
      return items
    }
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === 'asc' ? -1 : 1
      }
      if (a.props[sort] > b.props[sort]) {
        return sortDir === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  protected async applyPaginate (
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage']
  ): Promise<E[]> {
    const start = (page - 1) * perPage
    const limit = start + perPage
    return items.slice(start, limit)
  }
}
