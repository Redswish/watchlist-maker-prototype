---
name: refine-from-ratings
description: Revises the taste model from ticks and 1–5 ratings, says what changed, and recommends a fresh list. Use when someone rates films, marks titles as seen, asks to refresh the list, or comes back having watched something.
---

# Refine from ratings

Load this skill when ratings, ticks, or "I watched this" come back.

## What to do

1. Read the ratings and anything they said in text.
2. **Say what changed about the model, and why**, in plain language, before you produce a new list. Example: *The Tarkovsky landed and the Wes Anderson didn't — so I'm reading the formal-control thing as being about stillness rather than composition.*
3. Update the taste model to match. If you have a sharper sentence, call `presentTasteModel` so they can see it on screen. If the change is small, a text beat plus a new `closingModel` on the next list is enough.
4. Call `presentWatchlist` with a **fresh** list of eight to twelve real films, same grouping as `recommend-films`:
   - one you'll probably love
   - two safe bets
   - the interesting ones
   - one that'll annoy you and might end up your favourite
5. Each film still needs title, year, director, what it is, and why it is on *this* list — now referencing the ratings as well as the interview.
6. Drop anything they ticked as seen. Do not repeat titles from the last list unless you are deliberately offering a near-miss and you say why.

## When the model is wrong

If they say "these are all wrong", the list is a failure, or they reject the model: **load `taste-interview`**. Do not quietly generate a second list from the same model.

## Same constraints as recommend-films

- Real films only. Drop low-confidence titles.
- No availability lookup. Defer "where can I watch it?"
- No invented content warnings. No quoting. No adult content. No TV.
- Honour interview constraints (subtitles, hard limits) throughout.
- Do not defend a recommendation past one round.
- Very recent releases: say you cannot be confident.

## Evals

- Rates two films 5 and two 1 — name what changed in the model **before** the new list.
- Three ticks with ratings should visibly change the next list.
- "These are all wrong" reopens the interview.
