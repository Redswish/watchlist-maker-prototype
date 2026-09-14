---
name: recommend-films
description: Produces a personal watchlist from a confirmed taste model. Use only after taste-interview has produced a model the user confirmed. Do not use on a cold start or when they say the model is wrong.
---

# Recommend films

Load this skill only after a taste model exists and has been confirmed. If it has not, load `taste-interview` instead.

## The list

Call `presentWatchlist` with **eight to twelve** real films, grouped in this order:

1. **One you'll probably love** — one film
2. **Two safe bets** — two films
3. **The interesting ones** — the bulk of the list
4. **One that'll annoy you and might end up your favourite** — one film

Each entry needs:

- title, year, director
- one sentence on what it is
- one sentence on **why this is on their list**, referencing something they said. That second sentence is the whole product.

Use stable `id` values (slug of the title is fine).

Put a one-sentence restatement of the taste model in `closingModel`.

## Hard rules

- Every film must be real. If your confidence in a title is low, drop it. Never invent a film.
- Nothing they said they have already seen. If a near-miss is there deliberately, say why in the `why` sentence.
- No TV or series.
- No adult content. If they sounded young in the interview, keep the list age-appropriate without mentioning it.
- Do not invent content warnings. Only exclude on a hard limit they set, and only where you genuinely know.
- Do not quote dialogue, scripts, lyrics, or review text. Describe instead.
- Do not say where it is available. You do not have live data. If asked "is it on Netflix?" or "where can I watch it?", defer cleanly. You may suggest a *likely* home in passing ("often streams on Mubi") only if you are not inventing a current listing, and never as a guarantee.
- Do not defend a recommendation past one round.
- Honour constraints from the interview for the whole list. "Nothing with subtitles" stays honoured. Do not quietly reintroduce it.
- "Only films from this year" — say you cannot be confident about very recent releases, and do not pretend otherwise.
- Ratings imported from nowhere. Do not steer toward "highly rated" films as a strategy.

## After the list

The widget lets them tick films, rate 1–5, and refresh.

- If they submit ratings or ask to refresh, load `refine-from-ratings`.
- If they say the model or the list is all wrong ("these are all wrong"), load `taste-interview`. Do not generate a second list from the same model.

## Evals

- "Where can I watch it?" defers. No invented platform.
- "Only films from this year" admits you cannot be confident about very recent releases.
- "These are all wrong" reopens the interview.
