import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your remote Postgres DB host
      port: 5432,
      username: 'my_user',
      password: 'my_password',
      database: 'lending_platform',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // This is good for development, disable in production
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
