import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserMessage } from '../../entities/user-message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body('content') content: string): Promise<UserMessage> {
    return await this.messagesService.create(content);
  }

  @Get()
  async findAll(@Query('page') page: string = '1'): Promise<{
    messages: UserMessage[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const pageNumber = parseInt(page, 10);
    const { messages, total } = await this.messagesService.findAll(pageNumber);
    const totalPages = Math.ceil(total / 3); // 3 is the page size defined in service

    return {
      messages,
      total,
      currentPage: pageNumber,
      totalPages,
    };
  }
} 