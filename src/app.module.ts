import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import AppConfig from 'config/app.config';
import DatabaseConfig from 'config/Database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsModule } from './attachemnts/attachemnts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, DatabaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig.KEY, AppConfig.KEY],
      useFactory: (
        databaseConfig: ConfigType<typeof DatabaseConfig>,
        appConfig: ConfigType<typeof AppConfig>,
      ) => ({
        type: 'postgres',
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.name,
        entities: [__dirname + '/**/entities/*{.ts,.js}'],
        synchronize: appConfig.environment === 'development',
      }),
    }),
    AttachmentsModule,
  ],
  controllers: [],
})
export class AppModule {}
