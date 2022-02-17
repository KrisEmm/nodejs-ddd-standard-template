import { Query } from 'krisemm/context/shared/domain/buses/query/Query';
import { QueryBus } from 'krisemm/context/shared/domain/buses/query/QueryBus';
import { QueryHandler } from 'krisemm/context/shared/domain/buses/query/QueryHandler';
import { QueryNotRegisteredError } from 'krisemm/context/shared/domain/buses/query/QueryNotRegisteredError';
import { QueryResponse } from 'krisemm/context/shared/domain/buses/query/QueryResponse';

export class InMemoryQueryBus implements QueryBus {
  private queryHandlersMapping: Map<Query, QueryHandler<Query, QueryResponse>>;

  constructor(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
    this.queryHandlersMapping = this.getQueryHandlersMapping(queryHandlers);
  }

  async ask<R extends QueryResponse>(query: Query): Promise<R> {
    const queryHandler = this.getQueryHandlerTo(query);
    return (await queryHandler.handle(query)) as Promise<R>;
  }

  private getQueryHandlersMapping(
    queryHandlers: Array<QueryHandler<Query, QueryResponse>>
  ): Map<Query, QueryHandler<Query, QueryResponse>> {
    const queryHandlersMap = new Map();
    queryHandlers.forEach(queryHandler => {
      queryHandlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });
    return queryHandlersMap;
  }

  private getQueryHandlerTo(query: Query): QueryHandler<Query, QueryResponse> {
    const queryHandler = this.queryHandlersMapping.get(query.constructor);
    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }
    return queryHandler;
  }
}
