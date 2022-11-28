
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { MongoUser, UserSchema } from './users.schema';
import { UsersResolver } from './users.resolver'

@Module({
  imports: [MongooseModule.forFeature([{ name: MongoUser.name, schema: UserSchema }])],
  controllers: [],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
