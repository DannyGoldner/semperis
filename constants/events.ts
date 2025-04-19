export const EVENT_NAMES = {
  MOVIES: {
    FILTER: 'filter',
    RESET: 'reset',
  },
  MOVIE_THUMBNAIL: {
    SELECT: 'select',
  },
  MOVIE_DETAILS: {
    CLOSE: 'close',
  },
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];
