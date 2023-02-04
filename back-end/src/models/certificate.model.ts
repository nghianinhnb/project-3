import mongoose, { Types } from 'mongoose';


const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        userId: {
            type: Types.ObjectId,
            require: true,
            ref: 'User',
        },
        isPublished: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        },
        timestamps: true,
    }
);


export const Certificate = mongoose.model('Certificate', certificateSchema);
