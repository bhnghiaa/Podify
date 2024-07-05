import { getAudioGeneratedPlaylist, getFollowersProfile, getFollowersProfilePublic, getFollowingsProfile, getIsFollowing, getPlaylistAudios, getPrivatePlaylistAudios, getPublicPlaylist, getPublicProfile, getPublicUploads, getRecommendByProfile, getUploads, updateFollower } from "#/controllers/profile";
import { isAuth, mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post('/update-follower/:profileId', mustAuth, updateFollower);
router.get('/uploads', mustAuth, getUploads);
router.get('/uploads/:profileId', mustAuth, getPublicUploads);
router.get('/info/:profileId', mustAuth, getPublicProfile);
router.get('/playlist/:profileId', mustAuth, getPublicPlaylist);
router.get("/recommended", isAuth, getRecommendByProfile)
router.get("/auto-generated-playlist", mustAuth, getAudioGeneratedPlaylist)
router.get("/followers", mustAuth, getFollowersProfile)
router.get("/followers/:profileId", mustAuth, getFollowersProfilePublic)
router.get("/followings", mustAuth, getFollowingsProfile)
router.get("/playlist-audios/:playlistId", getPlaylistAudios)
router.get("/private-playlist-audios/:playlistId", mustAuth, getPrivatePlaylistAudios)
router.get("/is-following/:profileId", mustAuth, getIsFollowing)

export default router;