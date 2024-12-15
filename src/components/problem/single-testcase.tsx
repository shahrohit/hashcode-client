/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  titles: string[];
  testcase: string[];
};

const SingleTestcase = ({ titles, testcase }: Props) => {
  const defaultValues = {} as { [title: string]: string };
  testcase.forEach((val, index) => {
    const title = titles[index];
    defaultValues[title] = val;
  });

  const form = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4">
          {testcase.map((val, index) => {
            return (
              <FormField
                key={index}
                name={titles[index]}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter testcase"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}
        </form>
      </Form>
    </div>
  );
};

export default SingleTestcase;
