import { Query } from 'krisemm/context/shared/domain/buses/query/Query';
import { QueryResponse } from 'krisemm/context/shared/domain/buses/query/QueryResponse';

export interface QueryHandler<Q extends Query, R extends QueryResponse> {
  subscribedTo(): Query;

  handle(query: Q): Promise<R>;
}
