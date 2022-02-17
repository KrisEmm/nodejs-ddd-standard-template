import { Command } from 'krisemm/context/shared/domain/buses/command/Command';
import { CommandBus } from 'krisemm/context/shared/domain/buses/command/CommandBus';
import { CommandHandler } from 'krisemm/context/shared/domain/buses/command/CommandHandler';
import { CommandNotRegisteredError } from 'krisemm/context/shared/domain/buses/command/CommandNotRegisteredError';

export class InMemoryCommandBus implements CommandBus {
  private commandHandlersMapping: Map<Command, CommandHandler<Command>>;

  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    this.commandHandlersMapping = this.getCommandHandlersMapping(commandHandlers);
  }

  async dispatch(command: Command): Promise<void> {
    const commandHandler = this.getCommandHandlerTo(command);
    await commandHandler.handle(command);
  }

  private getCommandHandlersMapping(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<Command, CommandHandler<Command>> {
    const commandHandlersMap = new Map();
    commandHandlers.forEach(commandHandler => {
      commandHandlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });
    return commandHandlersMap;
  }

  private getCommandHandlerTo(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMapping.get(command.constructor);
    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }
    return commandHandler;
  }
}
