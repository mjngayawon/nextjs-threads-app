import * as z from "zod";

export const SearchUserValidation = z.object({
  query: z.string().nonempty(),
});
