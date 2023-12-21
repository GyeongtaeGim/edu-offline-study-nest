import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import UserEntity from 'entity/user.entity';
import PostEntity from 'entity/post.entity';

const tpyeormConfig = (configService: ConfigService) =>
  new DataSource({
    type: 'better-sqlite3',
    database: configService.get('DB_DATABASE'),
    entities: [UserEntity, PostEntity],
    synchronize: configService.get('DB_SYNC') === 'true',
    logging: configService.get('DB_LOGGING') === 'true',
    migrations: ['src/migrations/*.js'],
    migrationsRun: false,
  });

export default tpyeormConfig;
