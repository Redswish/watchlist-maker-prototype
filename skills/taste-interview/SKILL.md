---
name: taste-interview
description: Builds a personal film taste model through favourites, graded scales, this-or-that pairs, current-mood trade-offs, and director more/less questions. Use at cold start, whenever someone wants a watchlist or recommendations and no confirmed taste model exists, or when they say the model is wrong and the interview must reopen.
---

# Taste interview

Do not recommend films in this skill. Your only job is to build a taste model and get it confirmed.

Load this skill fully before asking anything. Then follow the sequence below. **One interactive widget per turn.** This-or-that has a rhythm; stacking pairs breaks it.

## Sequence

### 1. Favourites

Call `askFavorites`. Ask for all-time loves (free text) and a few they bounced off.

If they name two films that seem to cancel each other out — Paddington and Hereditary, say — do **not** split the difference. Ask, in a short text beat, what connects them. Then continue.

### 2. Scales

Call `askScale` once, as a lighthearted moment. Use humour in the prompt, not in the labels. These exact axes:

- `arthouse-mainstream` — Arthouse ↔ Mainstream
- `longer-shorter` — Longer ↔ Shorter
- `cerebral-easy` — Cerebral ↔ Easy-going
- `international-hollywood` — International ↔ Hollywood

### 3. This-or-that

Call `askThisOrThat` **at least six times**, **one pair per turn**, in this order. Use these exact films. Do not invent pairs. Do not skip ahead. There is no separate pairs file — the list below is the source of truth.

1. Left: *Stalker* (1979, Andrei Tarkovsky) — Right: *Die Hard* (1988, John McTiernan)
2. Left: *In the Mood for Love* (2000, Wong Kar-wai) — Right: *Heat* (1995, Michael Mann)
3. Left: *The Thing* (1982, John Carpenter) — Right: *Get Out* (2017, Jordan Peele)
4. Left: *Paris, Texas* (1984, Wim Wenders) — Right: *Drive* (2011, Nicolas Winding Refn)
5. Left: *Spirited Away* (2001, Hayao Miyazaki) — Right: *Mad Max: Fury Road* (2015, George Miller)
6. Left: *Persona* (1966, Ingmar Bergman) — Right: *The Social Network* (2010, David Fincher)
7. Left: *Beau Travail* (1999, Claire Denis) — Right: *John Wick* (2014, Chad Stahelski)
8. Left: *Portrait of a Lady on Fire* (2019, Céline Sciamma) — Right: *The Favourite* (2018, Yorgos Lanthimos)

Pairs have to be real trade-offs. These are. Keep the prompt short — like a game, not a seminar.

### 4. Mood right now

Bring it into this evening. Call `askMood` **six to ten times**, **one trade-off per turn**, from this list, in order. Stop after six if they are impatient; otherwise continue toward ten.

1. Slow and beautiful / Fast and clever
2. Ambiguous ending / Everything resolved
3. Formal control / Loose and messy
4. Cold colour / Warm and saturated
5. Unsettled / Moved
6. Quiet rooms / Crowded worlds
7. Long takes / Sharp cuts
8. One person's face / A city's machinery
9. You already know how it ends / You want to be lost
10. Stillness / Propulsion

### 5. Directors

Call `askDirectors` once. Pick four to six directors grounded in what you have learned so far. Include example films for recognition.

Loving a director does not mean they want more of them. Someone who loves Tarkovsky may want less Tarkovsky and more of a less-known formalist. Offer that kind of choice.

### 6. Taste model

Call `presentTasteModel` with a single plain-language statement they can argue with. Something like: *You like formal control and cold colour, you're impatient with whimsy, and you'd rather be unsettled than moved.*

Wait for the result:

- `confirm` — the model is locked. Load `recommend-films` next.
- `edit` — rewrite the statement with their correction, present it again.
- `reject` — start the interview again from step 1. Do not recommend.

## Rules

- Never ask about genre directly. Genre is what people think describes their taste, and doesn't.
- Honour hard limits for the rest of the conversation. "Nothing with subtitles" is not a mood; it is a constraint. Do not quietly reintroduce it later.
- No adult content. If the conversation suggests a young person, keep later lists age-appropriate without asking their age or making a thing of it.
- Do not quote dialogue, scripts, lyrics, or reviews.

## Evals

- "Recommend me some films" starts this interview, not a list.
- "I love Paddington and Hereditary" does not split the difference.
- "Nothing with subtitles" is honoured from here on.
