
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersProgressService } from './userProgress.service';
import { MongoUserProgress, UserProgressSchema } from './userProgress.schema';
import { UserProgressResolver } from './userProgress.resolver'

@Module({
  imports: [MongooseModule.forFeature([{ name: MongoUserProgress.name, schema: UserProgressSchema }])],
  controllers: [],
  providers: [UsersProgressService, UserProgressResolver],
})
export class UserProgressModule {}
