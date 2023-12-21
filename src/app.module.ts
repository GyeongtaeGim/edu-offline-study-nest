import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeormConfig from './typeorm.config';
import { AuthModule } from 'auth/auth.module';
import { PostModule } from 'post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return typeormConfig(configService).options;
      },
      dataSourceFactory: async (options) => {
        const dataSoruce = await new DataSource(options).initialize();
        return dataSoruce;
      },
    }),
    AuthModule,
    PostModule,
  ],
  providers: [],
  controllers: [],
})
export default class AppModule {}
