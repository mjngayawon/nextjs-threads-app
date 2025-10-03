"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { SearchUserValidation } from "@/lib/validations/search";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function SearchUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const form = useForm({
    resolver: zodResolver(SearchUserValidation),
    defaultValues: {
      query: initialQuery,
    },
  });

  const formValue = form.watch("query");

  useEffect(() => {
    const handler = setTimeout(() => {
      const encodedQuery = encodeURIComponent(formValue.trim());
      router.replace(`/search?query=${encodedQuery}`);
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

export default SearchUser;
