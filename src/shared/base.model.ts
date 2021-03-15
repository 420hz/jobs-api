import { ApiPropertyOptional } from '@nestjs/swagger';
import { Document, SchemaOptions } from 'mongoose';
import { Typegoose, prop } from 'typegoose';

export class BaseModel extends Typegoose {
    @prop({ default: Date.now() })
    createAt?: Date;

    @prop({ default: Date.now() })
    updateAt?: Date; 

    id?: string;
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
    }
}