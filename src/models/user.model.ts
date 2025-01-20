import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    profilePicture: string | null;
    isActive: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
    currentWorkspace: mongoose.Types.ObjectId | null;
    comparePassword(value: string): Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">;
  }

  const userSchema = new Schema<UserDocument>(
    {
      name: {
        type: String,
        required: false,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: { type: String, select: true },
      profilePicture: {
        type: String,
        default: null,
      },
      currentWorkspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
      },
      isActive: { type: Boolean, default: true },
      lastLogin: { type: Date, default: null },
    },
    {
      timestamps: true,
    }
  );