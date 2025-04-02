import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://imgs.search.brave.com/-pFKlAvKwkO2ah_bPUqq9rdEOUc34-_FQHTLcrJyc-4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvZGhtM3dq/Y2twMDJkMS5qcGVn"
          className="w-full h-36 object-cover rounded-t-lg"
          alt="course"
        ></img>
      </div>
      <CardContent className='px-5 py-4 space-y-3'>
        <h1 className="hover:underline font-bold text-lg truncate">
          Java Notes
        </h1>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <Avatar className='h-6 w-6'>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="avatar"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">ANSH VERMA</h1>
        </div>
        <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
            Teacher
        </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
