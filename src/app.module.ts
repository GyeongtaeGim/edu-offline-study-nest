import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import typeormConfig from './typeorm.config';
import { AuthModule } from 'auth/auth.module';
import { PostModule } from 'post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AuthModule, PostModule],
      useFactory: () => {
        return typeormConfig.options;
      },
      dataSourceFactory: async (options) => {
        const dataSoruce = await new DataSource(options).initialize();
        return dataSoruce;
      },
    }),
  ],
  providers: [],
  controllers: [],
})
export default class AppModule {}
