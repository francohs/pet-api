import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointments.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(
    petId: string,
    ownerId: string,
    date: Date,
    reason: string,
    notes: string,
  ): Promise<AppointmentDocument> {
    const appointment = new this.appointmentModel({
      petId,
      ownerId,
      date,
      reason,
      notes,
    });
    return appointment.save();
  }

  async findAllByOwner(ownerId: string): Promise<AppointmentDocument[]> {
    return this.appointmentModel
      .find({ ownerId })
      .populate('petId', 'name species')
      .sort({ date: -1 });
  }

  async findAllByPet(
    petId: string,
    ownerId: string,
  ): Promise<AppointmentDocument[]> {
    return this.appointmentModel.find({ petId, ownerId }).sort({ date: -1 });
  }

  async update(
    id: string,
    ownerId: string,
    attrs: Partial<Appointment>,
  ): Promise<AppointmentDocument> {
    const appointment = await this.appointmentModel.findOneAndUpdate(
      { _id: id, ownerId },
      attrs,
      { returnDocument: 'after' },
    );
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const result = await this.appointmentModel.findOneAndDelete({
      _id: id,
      ownerId,
    });
    if (!result) {
      throw new NotFoundException('Appointment not found');
    }
  }
}
