
export enum CommandType {
    None = 0,
    Event,
    Control,
}

export interface ICommand {
    execute()
}

export class Command {

    public type: CommandType;

}
