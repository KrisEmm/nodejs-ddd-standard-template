import { Command } from 'krisemm/context/shared/domain/buses/command/Command';

export interface CommandHandler<T extends Command> {
  subscribedTo(): Command;

  handle(command: T): Promise<void>;
}
