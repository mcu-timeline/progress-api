
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UpsertActiveTimelineInput {
    activeTimelineId: string;
}

export interface UpdateCurrentMovieInput {
    activeTimelineId: string;
    currentMovieId: string;
}

export interface IQuery {
    getUserProgress(): Nullable<UserProgress> | Promise<Nullable<UserProgress>>;
}

export interface IMutation {
    upsertActiveTimeline(upsertActiveTimelineInput?: Nullable<UpsertActiveTimelineInput>): Nullable<UserProgress> | Promise<Nullable<UserProgress>>;
    updateCurrentMovie(updateCurrentMovieInput?: Nullable<UpdateCurrentMovieInput>): Nullable<UserProgress> | Promise<Nullable<UserProgress>>;
    deleteUserProgress(): string | Promise<string>;
}

export interface UserProgress {
    id: string;
    userId?: Nullable<string>;
    activeTimeline?: Nullable<string>;
    currentMovieId?: Nullable<string>;
}

type Nullable<T> = T | null;
