import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import {AudioData} from 'src/@types/audio';

interface Player {
  onGoingAudio: AudioData | null;
}

const initialState: Player = {
  onGoingAudio: null,
};

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateOnGoingAudio(
      playerState,
      {payload}: PayloadAction<AudioData | null>,
    ) {
      playerState.onGoingAudio = payload;
    },
  },
});

export const getPlayerState = createSelector(
  (state: RootState) => state.player,
  playerState => playerState,
);

export const {updateOnGoingAudio} = slice.actions;

export default slice.reducer;
