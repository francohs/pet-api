import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from './reminders.schema';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name)
    private reminderModel: Model<ReminderDocument>,
  ) {}

  async create(
    petId: string,
    ownerId: string,
    type: string,
    dueDate: Date,
    description: string,
  ): Promise<ReminderDocument> {
    const reminder = new this.reminderModel({
      petId,
      ownerId,
      type,
      dueDate,
      description,
    });
    return reminder.save();
  }

  async findAllByOwner(ownerId: string): Promise<ReminderDocument[]> {
    return this.reminderModel
      .find({ ownerId })
      .populate('petId', 'name species')
      .sort({ dueDate: 1 });
  }

  async findAllByPet(
    petId: string,
    ownerId: string,
  ): Promise<ReminderDocument[]> {
    return this.reminderModel.find({ petId, ownerId }).sort({ dueDate: 1 });
  }

  async update(
    id: string,
    ownerId: string,
    attrs: Partial<Reminder>,
  ): Promise<ReminderDocument> {
    const reminder = await this.reminderModel.findOneAndUpdate(
      { _id: id, ownerId },
      attrs,
      { returnDocument: 'after' },
    );
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return reminder;
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const result = await this.reminderModel.findOneAndDelete({
      _id: id,
      ownerId,
    });
    if (!result) {
      throw new NotFoundException('Reminder not found');
    }
  }
}
