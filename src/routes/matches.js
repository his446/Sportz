import { Router } from "express";
import { createMatchSchema } from "../validation/matches.js";
import { db } from "../db/db.js";
import { matches } from "../db/schema.js";
import { getMatchStatus } from "../utils/match-status.js";

export const matchRouter = Router();

matchRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Matches List" });
});

matchRouter.post("/", async (req, res) => {
  const parsed = createMatchSchema.safeParse(req.body);
  const {
    data: { startTime, endTime },
  } = parsed;

  if (!parsed.sccess) {
    return res.status(400).json({
      error: "Invalid payload.",
      details: JSON.stringify(parsed.error),
    });
  }

  try {
    const [event] = await db.insert(matches).values({
      ...parsed.data,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      homeScore: homeScore ?? 0,
      awayScore: homeScore ?? 0,
      status: getMatchStatus(startTime, endTime)
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Failed to create match.", details: JSON.stringify(e) });
  }
});
