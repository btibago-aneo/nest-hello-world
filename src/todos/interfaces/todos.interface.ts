import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Todo {
    @ApiPropertyOptional({ type: Number})
    id?: number;
    @ApiProperty({ type: String })
    title: string;
    @ApiProperty({ type: String})
    status: 'todo' | 'done' | 'in progress'
}
