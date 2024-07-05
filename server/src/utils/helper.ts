import { UserDocument } from "#/models/user";
import moment from "moment";
import History from "#/models/history";
import { Request } from "express";

export const generateToken = (length = 6) => {
    let otp = "";

    for (let i = 0; i < length; i++) {
        let digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
}

export const formatProfile = (user: UserDocument) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url,
        verified: user.verified,
        followers: user.followers,
        followings: user.followings,
    }
}

export const getUsersPreviousHistory = async (req: Request): Promise<string[]> => {
    const [ result ] = await History.aggregate([
        {
            $match: { owner: req.user.id }
        },
        { $unwind: "$all" },
        {
            $match: {
                "all.date": {
                    $gte: moment().subtract(30, "days").toDate()
                }
            }
        },
        { $group: { _id: "$all.audio" } },
        {
            $lookup: {
                from: "audios",
                localField: "_id",
                foreignField: "_id",
                as: "audioData"
            }
        },
        { $unwind: "$audioData" },
        {
            $group: { _id: null, category: { $addToSet: "$audioData.category" } }
        }
    ]);
    if (result) return result.category;
    return result;
} 