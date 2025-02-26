import express, { Request, Response } from "express";

const router = express.Router();

// Get all characters
router.post("/login", async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
