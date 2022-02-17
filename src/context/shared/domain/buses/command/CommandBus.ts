import { Command } from 'krisemm/context/shared/domain/buses/command/Command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
