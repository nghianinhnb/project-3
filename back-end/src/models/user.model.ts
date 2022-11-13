import mongoose from 'mongoose';
import { password } from '../utils';


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            default: false,
            required: true
        },
        refreshToken: {
            type: String,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);


userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});


export const User = mongoose.model('User', userSchema);
