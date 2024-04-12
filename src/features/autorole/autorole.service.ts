import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class AutoroleService {

    constructor(private readonly prismaService: PrismaService) {}

    async exists(guildId: string): Promise<boolean> {
        const count = await this.prismaService.featureAutoRole.count({
            where: {
                guildId: guildId
            }
        });
        return count > 0;
    }

    async getRoles(guildId: string): Promise<string[]> {
        const feature = await this.prismaService.featureAutoRole.findUnique({
            where: {
                guildId: guildId
            }
        });
        return feature ? feature.roleIds : [];
    }

    async addRole(guildId: string, roleId: string) {
        if (await this.exists(guildId)) {
            return this.prismaService.featureAutoRole.update({
                where: {
                    guildId: guildId
                },
                data: {
                    roleIds: {
                        push: roleId
                    }
                }
            });
        } else {
            return this.prismaService.featureAutoRole.create({
                data: {
                    guildId: guildId,
                    roleIds: [roleId]
                }
            });
        }
    }

    async removeRole(guildId: string, roleId: string) {
        const roles = await this.getRoles(guildId);

        if(roles.includes(roleId)) {
            return this.prismaService.featureAutoRole.update({
                where: {
                    guildId: guildId
                },
                data: {
                    roleIds: {
                        set: roles.filter(id => id !== roleId)
                    }
                }
            });
        }

    }

}
