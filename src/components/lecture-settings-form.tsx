"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { resolve } from "path";
import { Delete, Trash } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  id: z.string().optional(),
});

export const LectureSettingsForm = ({ lecture }: { lecture: any }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: lecture.title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log({ title: values.title, id: lecture.id });
      const res = axios.patch("/api/lecture", {
        title: values.title,
        id: lecture.id,
      });
      toast.success("Lecture updated successfully");
      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error("Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name of your Lecture</FormLabel> */}
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name of your Lecture"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <Button
              className="w-full"
              variant={"geist"}
              disabled={!isValid || isSubmitting || loading}
              type="submit"
            >
              Update Lecture
            </Button>
            
          </div>
        </form>
      </Form>
    </div>
  );
};
