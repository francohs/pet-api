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
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PetsService } from './pets.service';

class CreatePetDto {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
}

class UpdatePetDto {
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: Date;
}

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('pets')
  @CacheTTL(60000)
  findAll(@Request() req: { user: { userId: string } }) {
    return this.petsService.findAllByOwner(req.user.userId);
  }

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() body: CreatePetDto,
  ) {
    return this.petsService.create(
      body.name,
      body.species,
      body.breed,
      body.birthDate,
      req.user.userId,
    );
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.petsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() body: UpdatePetDto,
  ) {
    return this.petsService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.petsService.remove(id, req.user.userId);
  }
}
