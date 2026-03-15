import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { TEAM_TYPES } from "../constants";

const socialsSchema = new Schema(
  {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { _id: false },
);

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    roleTitle: { type: String, required: true, trim: true },
    type: { type: String, enum: Object.values(TEAM_TYPES), required: true, index: true },
    bio: { type: String, default: "", trim: true },
    photoUrl: { type: String, default: "" },
    portfolioUrl: { type: String, default: "", trim: true },
    socials: { type: socialsSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

teamMemberSchema.index({ type: 1, order: 1, createdAt: -1 });

export type TeamMemberDocument = InferSchemaType<typeof teamMemberSchema>;
export const TeamMemberModel: Model<TeamMemberDocument> =
  (models.TeamMember as Model<TeamMemberDocument>) || model<TeamMemberDocument>("TeamMember", teamMemberSchema);
