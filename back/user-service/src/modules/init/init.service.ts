import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';

@Injectable()
export class InitService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.roleRepository.count();
    if (count === 0) {
      await this.roleRepository.save([
        {
          name: 'admin',
          permissions: ['create', 'read', 'update', 'delete'],
        },
        {
          name: 'user',
          permissions: ['read'],
        },
      ]);
      console.log('✅ Roles seeded');
    } else {
      console.log('ℹ️ Roles already exist');
    }
  }
}
