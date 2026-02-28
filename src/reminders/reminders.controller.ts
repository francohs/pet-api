import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RemindersService } from './reminders.service';
import { ReminderType } from './reminders.schema';

class CreateReminderDto {
  petId: string;
  type: ReminderType;
  dueDate: Date;
  description: string;
}

class UpdateReminderDto {
  type?: ReminderType;
  dueDate?: Date;
  description?: string;
  done?: boolean;
}

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() body: CreateReminderDto,
  ) {
    return this.remindersService.create(
      body.petId,
      req.user.userId,
      body.type,
      body.dueDate,
      body.description,
    );
  }

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.remindersService.findAllByOwner(req.user.userId);
  }

  @Get('pet/:petId')
  findByPet(
    @Request() req: { user: { userId: string } },
    @Param('petId') petId: string,
  ) {
    return this.remindersService.findAllByPet(petId, req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() body: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.remindersService.remove(id, req.user.userId);
  }
}
