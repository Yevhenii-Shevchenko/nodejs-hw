import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    accessTokenValidUntil: {
        type: Date,
        required: true
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export const Session = model("Session", sessionSchema);


У файлі src/models/session.js створіть модель Session із такими властивостями:

userId — тип Schema.Types.ObjectId, обов’язкове, посилання на модель User;
accessToken — рядок, обов’язкове;
refreshToken — рядок, обов’язкове;
accessTokenValidUntil — тип Date, обов’язкове;
refreshTokenValidUntil — тип Date, обов’язкове.
Для автоматичного створення полів createdAt та updatedAt, використовуйте параметр timestamps: true при створенні моделі.
