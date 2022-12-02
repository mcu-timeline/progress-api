/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UpsertUserProgressInput {
  userId: string;
  timelineId?: Nullable<string>;
  lastWatched?: Nullable<string>;
  activeTimeline?: Nullable<string>;
}

export interface IQuery {
  getUserProgress(
    userId?: Nullable<string>,
  ): Nullable<UserProgress> | Promise<Nullable<UserProgress>>;
}

export interface IMutation {
  upsertUserProgress(
    upsertUserProgressInput?: Nullable<UpsertUserProgressInput>,
  ): Nullable<UserProgress> | Promise<Nullable<UserProgress>>;
  deleteUserProgress(userId: string): string | Promise<string>;
}

export interface Progress {
  timelineId?: Nullable<string>;
  lastWatched?: Nullable<string>;
}

export interface UserProgress {
  id: string;
  userId: string;
  activeTimeline?: Nullable<string>;
  progress?: Nullable<Progress>;
}

type Nullable<T> = T | null;
