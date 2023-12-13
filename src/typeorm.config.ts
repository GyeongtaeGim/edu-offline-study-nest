import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

import UserEntity from 'entity/user.entity';
import PostEntity from 'entity/post.entity';

config();

const configService = new ConfigService();

console.log(configService.get('DB_DATABASE'));

export default new DataSource({
  type: 'better-sqlite3',
  database: configService.get('DB_DATABASE'),
  entities: [UserEntity, PostEntity],
  synchronize: configService.get('DB_SYNC') === 'true',
  logging: configService.get('DB_LOGGING') === 'true',
  migrations: ['src/migrations/*.js'],
  migrationsRun: false,
});
