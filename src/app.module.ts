import { Module } from '@nestjs/common';
import { join } from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config, config } from './config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserProgressModule } from './userProgress';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<Config>,
      ): MongooseModuleOptions => ({
        uri: configService.get('MONGODB_URI', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    UserProgressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
