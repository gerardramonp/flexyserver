import express, { Request, Response } from "express";

const router = express.Router();

// Get all characters
router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send("not implemented");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
