import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './pets.schema';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async create(
    name: string,
    species: string,
    breed: string,
    birthDate: Date,
    ownerId: string,
  ): Promise<PetDocument> {
    const pet = new this.petModel({ name, species, breed, birthDate, ownerId });
    return pet.save();
  }

  async findAllByOwner(ownerId: string): Promise<PetDocument[]> {
    return this.petModel.find({ ownerId });
  }

  async findOne(id: string, ownerId: string): Promise<PetDocument> {
    const pet = await this.petModel.findOne({ _id: id, ownerId });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async update(
    id: string,
    ownerId: string,
    attrs: Partial<Pet>,
  ): Promise<PetDocument> {
    const pet = await this.petModel.findOneAndUpdate(
      { _id: id, ownerId },
      attrs,
      { new: true },
    );
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const result = await this.petModel.findOneAndDelete({ _id: id, ownerId });
    if (!result) {
      throw new NotFoundException('Pet not found');
    }
  }
}
