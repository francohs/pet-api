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
import { AppointmentsService } from './appointments.service';
import { AppointmentStatus } from './appointments.schema';

class CreateAppointmentDto {
  petId: string;
  date: Date;
  reason: string;
  notes: string;
}

class UpdateAppointmentDto {
  date?: Date;
  reason?: string;
  notes?: string;
  status?: AppointmentStatus;
}

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() body: CreateAppointmentDto,
  ) {
    return this.appointmentsService.create(
      body.petId,
      req.user.userId,
      body.date,
      body.reason,
      body.notes,
    );
  }

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.appointmentsService.findAllByOwner(req.user.userId);
  }

  @Get('pet/:petId')
  findByPet(
    @Request() req: { user: { userId: string } },
    @Param('petId') petId: string,
  ) {
    return this.appointmentsService.findAllByPet(petId, req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() body: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.appointmentsService.remove(id, req.user.userId);
  }
}
