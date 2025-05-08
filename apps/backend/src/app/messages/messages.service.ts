import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from '../../entities/user-message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(UserMessage)
    private userMessagesRepository: Repository<UserMessage>,
  ) {}

  async create(content: string): Promise<UserMessage> {
    const message = this.userMessagesRepository.create({ content });
    return await this.userMessagesRepository.save(message);
  }

  async findAll(page: number = 1): Promise<{ messages: UserMessage[]; total: number }> {
    const take = 3; // Messages per page
    const skip = (page - 1) * take;

    const [messages, total] = await this.userMessagesRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
    });

    return {
      messages,
      total,
    };
  }
} 