"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { SearchValidation } from "@/lib/validations/search";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function Search({ type }: { type: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const form = useForm({
    resolver: zodResolver(SearchValidation),
    defaultValues: {
      query: initialQuery,
    },
  });

  const formValue = form.watch("query");

  useEffect(() => {
    const handler = setTimeout(() => {
      const encodedQuery = encodeURIComponent(formValue.trim());

      if (type === "User") {
        router.replace(`/search?query=${encodedQuery}`);
      } else {
        router.replace(`/communities?query=${encodedQuery}`);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [formValue, router]);

  return (
    <div>
      <Form {...form}>
        <form className="mt-10 flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    placeholder="Search..."
                    {...field}
                    className="no-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default Search;
