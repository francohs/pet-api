import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Owner, OwnerDocument } from './owners.schema';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async create(name: string, email: string, password: string): Promise<Owner> {
    const existing = await this.ownerModel.findOne({ email });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = new this.ownerModel({
      name,
      email,
      password: hashedPassword,
    });

    return owner.save();
  }

  async findByEmail(email: string): Promise<OwnerDocument | null> {
    return this.ownerModel.findOne({ email });
  }

  async findById(id: string): Promise<OwnerDocument | null> {
    return this.ownerModel.findById(id);
  }
}
