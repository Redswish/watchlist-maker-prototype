import { z } from "zod";

export const filmTileSchema = z.object({
  title: z.string(),
  year: z.number().optional(),
  director: z.string().optional(),
});

export const askFavoritesInputSchema = z.object({
  prompt: z.string(),
});

export const askFavoritesOutputSchema = z.object({
  loved: z.string(),
  bouncedOff: z.string(),
});

export const askScaleInputSchema = z.object({
  prompt: z.string(),
  scales: z.array(
    z.object({
      id: z.string(),
      leftLabel: z.string(),
      rightLabel: z.string(),
    }),
  ),
});

export const askScaleOutputSchema = z.object({
  scores: z.array(
    z.object({
      id: z.string(),
      score: z.number().min(1).max(10),
    }),
  ),
});

export const askThisOrThatInputSchema = z.object({
  prompt: z.string(),
  left: filmTileSchema,
  right: filmTileSchema,
});

export const askThisOrThatOutputSchema = z.object({
  choice: z.enum(["left", "right"]),
});

export const askMoodInputSchema = z.object({
  prompt: z.string(),
  left: z.string(),
  right: z.string(),
});

export const askMoodOutputSchema = z.object({
  choice: z.enum(["left", "right"]),
});

export const askDirectorsInputSchema = z.object({
  prompt: z.string(),
  directors: z.array(
    z.object({
      name: z.string(),
      exampleFilms: z.array(z.string()),
    }),
  ),
});

export const askDirectorsOutputSchema = z.object({
  preferences: z.array(
    z.object({
      name: z.string(),
      preference: z.enum(["more", "less"]),
    }),
  ),
});

export const presentTasteModelInputSchema = z.object({
  statement: z.string(),
});

export const presentTasteModelOutputSchema = z.object({
  action: z.enum(["confirm", "edit", "reject"]),
  correction: z.string().optional(),
});

export const watchlistFilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number(),
  director: z.string(),
  what: z.string(),
  why: z.string(),
});

export const presentWatchlistInputSchema = z.object({
  closingModel: z.string(),
  groups: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      films: z.array(watchlistFilmSchema),
    }),
  ),
});

export const presentWatchlistOutputSchema = z.object({
  action: z.enum(["rate", "refresh"]),
  ratings: z
    .array(
      z.object({
        id: z.string(),
        seen: z.boolean(),
        rating: z.number().min(1).max(5).optional(),
      }),
    )
    .optional(),
});

export type FilmTile = z.infer<typeof filmTileSchema>;
export type WatchlistFilm = z.infer<typeof watchlistFilmSchema>;
