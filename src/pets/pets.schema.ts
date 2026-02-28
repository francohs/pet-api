import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  species: string;

  @Prop()
  breed: string;

  @Prop()
  birthDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Owner', required: true })
  ownerId: Types.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
