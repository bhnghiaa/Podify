import { Model, ObjectId, Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

interface EmailVerificationTokenDocument {
    owner: ObjectId;
    token: string;
    createdAt: Date;
}
interface Methods {
    compareToken: (token: string) => Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument, {}, Methods>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
}, {
    timestamps: true
});

emailVerificationTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        this.token = await hash(this.token, 10);
    }
    next();
})

emailVerificationTokenSchema.methods.compareToken = async function (token: string) {
    const result = await compare(token, this.token);
    return result;
}

export default model('EmailVerificationToken', emailVerificationTokenSchema) as Model<EmailVerificationTokenDocument, {}, Methods>;