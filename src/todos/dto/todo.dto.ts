
export class TodoDTO {
    readonly title: string;
    readonly status: 'todo' | 'done' | 'in progress';
}