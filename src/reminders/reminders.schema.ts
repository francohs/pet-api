import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReminderDocument = HydratedDocument<Reminder>;

export enum ReminderType {
  VACCINE = 'vaccine',
  MEDICATION = 'medication',
}

@Schema({ timestamps: true })
export class Reminder {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Owner', required: true })
  ownerId: Types.ObjectId;

  @Prop({ enum: ReminderType, required: true })
  type: ReminderType;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  done: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
