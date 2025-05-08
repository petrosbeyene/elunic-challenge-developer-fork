import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UserMessage } from '../../entities/user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {} 