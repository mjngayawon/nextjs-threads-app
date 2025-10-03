import * as z from "zod";

export const SearchValidation = z.object({
  query: z.string().nonempty(),
});
