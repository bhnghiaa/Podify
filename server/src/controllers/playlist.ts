import { CreatePlaylistRequest, PopulateFavList, UpdatePlaylistRequest } from "#/@types/audio";
import { RequestHandler } from "express";
import Audio from "#/models/audio";
import Playlist from "#/models/playlist";
import { ObjectId, Types, isValidObjectId } from "mongoose";

export const createPlaylist: RequestHandler = async (req: CreatePlaylistRequest, res) => {

    const { title, resId, visibility } = req.body;
    const ownerId = req.user.id;

    if (resId) {
        const audio = await Audio.findById(resId);
        if (!audio) {
            return res.status(404).send({ message: "Audio not found!" });
        }
    }
    const newPlaylist = new Playlist({
        title,
        owner: ownerId,
        visibility,
    });

    if (resId) {
        newPlaylist.items = [ resId as any ];
    }
    await newPlaylist.save();

    res.status(201).send(newPlaylist);

}

export const updatePlaylist: RequestHandler = async (req: UpdatePlaylistRequest, res) => {
    const { id, item, title, visibility } = req.body;

    const playlist = await Playlist.findOneAndUpdate({ _id: id, owner: req.user.id }, { title, visibility }, { new: true });

    if (!playlist) {
        return res.status(404).send({ message: "Playlist not found!" });
    }

    if (item) {
        const audio = await Audio.findById(item);
        if (!audio) {
            return res.status(404).send({ message: "Audio not found!" });
        }
        await Playlist.findByIdAndUpdate(playlist._id, { $addToSet: { items: item } })
    }
    res.json({
        playlist: {
            title: playlist.title,
            visibility: playlist.visibility,
            id: playlist._id,
        }
    });
}


export const removePlaylist: RequestHandler = async (req, res) => {
    const { playlistId, resId, all } = req.query;
    if (!isValidObjectId(playlistId)) {
        return res.status(400).send({ message: "Invalid id!" });
    }
    if (all === "yes") {
        const playlist = await Playlist.findOneAndDelete({
            _id: playlistId,
            owner: req.user.id,
        });
        if (!playlist) {
            return res.status(404).send({ message: "Playlist not found!" });
        }
    }
    if (resId) {
        if (!isValidObjectId(resId)) {
            return res.status(400).send({ message: "Invalid id!" });
        }
        const playlist = await Playlist.findOneAndUpdate(
            { _id: playlistId, owner: req.user.id },
            { $pull: { items: resId } });
        if (!playlist) {
            return res.status(404).send({ message: "Playlist not found!" });
        }
    }
    res.json({ message: "Playlist removed!" })
}

export const getPlaylistByProfile: RequestHandler = async (req, res) => {
    const { pageNo = "0", limit = "20" } = req.query as { pageNo: string, limit: string };
    const data = await Playlist.find({
        owner: req.user.id,
        visibility: { $ne: 'auto' }
    }).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit)).sort('-createdAt');
    const playlist = data.map((item) => {
        return {
            id: item._id,
            title: item.title,
            visibility: item.visibility,
            itemsCount: item.items.length
        }
    })
    res.json({ playlist });
}

export const getAudios: RequestHandler = async (req, res) => {
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        return res.status(400).send({ message: "Invalid id!" });
    }
    const playlist = await Playlist.findOne({
        _id: playlistId,
        owner: req.user.id
    }).populate<{ items: PopulateFavList[] }>({
        path: 'items',
        populate: {
            path: 'owner',
            select: 'name'
        }
    });
    if (!playlist) {
        return res.status(404).send({ message: "Playlist not found!" });
    }
    const audios = playlist.items.map((item) => {
        return {
            id: item._id,
            title: item.title,
            category: item.category,
            file: item.file.url,
            poster: item.poster?.url,
            owner: {
                id: item.owner._id,
                name: item.owner.name
            }
        }
    });
    res.json({
        list: {
            id: playlist._id,
            title: playlist.title,
            visibility: playlist.visibility,
            audios
        }
    })
}