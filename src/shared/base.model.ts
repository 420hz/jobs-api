import { ApiPropertyOptional } from '@nestjs/swagger';
import { Document, SchemaOptions } from 'mongoose';

export interface BaseModel extends Document {
    createAt?: Date,
    updateAt?: Date,
}

export class BaseModelVm {
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    createAt?: Date;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    updateAt?: Date;

    @ApiPropertyOptional() id?: string;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true
}