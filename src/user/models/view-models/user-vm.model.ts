import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseModelVm } from "src/shared/base.model";
import { EnumToArray } from "src/shared/utilities/enum-to-array";
import { UserRole } from "../user-role.enum";

export class UserVm extends BaseModelVm {
    @ApiProperty()
    username: string;

    @ApiPropertyOptional()
    firstName?: string;

    @ApiPropertyOptional()
    lastname?: string;

    @ApiPropertyOptional()
    fullName?: string;

    @ApiPropertyOptional({ enum: EnumToArray(UserRole) })
    role?: UserRole;

}