import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const isPublished = false;
  const isLoading = false;
  return (
    <Card>
      <CardHeader className={"flex flex-row justify-between"}>
        <div>
          <CardTitle>Basic Course Info</CardTitle>
          <CardDescription>Make Change In your Course</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant={"outline"}>
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5  ">
          <div>
           
             <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label className={"mb-2"}>Sub Title</Label>
            <Input
              type="text"
              name="Subtitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="SubTitle apna"
              
             
            />
          </div>
          <div>
            <Label className={"mb-2"}>Description</Label>
            <Textarea
              placeholder="Type your Description here."
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center gap-5 ">
            <div>
              <Label className={"mb-2"}>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={"mb-2"}>Course Lavel</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course level</SelectLabel>
                    <SelectItem value="easy">easy</SelectItem>
                    <SelectItem value="med">med</SelectItem>
                    <SelectItem value="adv">adv</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={"mb-2"}>Price </Label>
              <Input
                type="number"
                name="price"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="0"
                className="w-fit"
              ></Input>
            </div>
          </div>
          <div>
            <Label className={"mb-2"}>Category</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            ></Input>
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="thumbnail"
              />
            )}
          </div>
          <div>
            <Button
              onClick={() => navigate("/admin/course")}
              variant={"outline"}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} className="">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait......
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
