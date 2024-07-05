import { AudioDocument } from "#/models/audio";
import { ObjectId } from "mongoose";
import { Request } from "express";

export type PopulateFavList = AudioDocument<{ _id: ObjectId, name: string }>;

export interface CreatePlaylistRequest extends Request {
    body: {
        title: string;
        visibility: "public" | "private";
        resId: string;
    };
}

export interface UpdatePlaylistRequest extends Request {
    body: {
        title: string;
        visibility: "public" | "private";
        resId: string;
        id: string;
        item: string;
    };
}