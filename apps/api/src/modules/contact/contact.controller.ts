import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Public } from '../auth/public.decorator';
import { ContactService } from './contact.service';

@Public()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() data: { name: string; email: string; message: string }) {
    return this.contactService.create(data);
  }

  @Get()
  async liste() {
    return this.contactService.liste();
  }

  @Get(':id')
  async filterById(@Param('id') id: number) {
    return this.contactService.filterById(id);
  }
}
