import { z } from "zod";

const Difficulty = z.enum(["Easy", "Medium", "Hard"], { message: "Required" });

export { Difficulty };
