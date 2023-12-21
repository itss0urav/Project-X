"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React,{useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReviewSchema } from "@/lib/validations"
 


function createReviews() {

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      user: "",
      reviewDescription:""
      
    },
    
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ReviewSchema>) {
    
    await fetch("http://localhost:3000/api/reviews",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(values)
    })
    console.log(values)
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5 m-5">
        <FormField
          control={form.control}
          
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel> User name</FormLabel>
              <FormControl>
                <Input placeholder="Enter User name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          
          name="reviewDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Review Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter review description" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
    
           
        
      </form>
    </Form>
  )
}

export default createReviews