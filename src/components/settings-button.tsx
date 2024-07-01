"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MoreVertical, Settings, Trash } from "lucide-react";
import { useState } from "react";
import { LectureSettingsForm } from "./lecture-settings-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsButton({ lecture }: { lecture: any }) {
  const [Draweropen, setDrawerOpen] = useState(false);
  const [Dialogopen, setDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <div className="hidden md:block">
        <Dialog open={Dialogopen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <MoreVertical className="aspect-square h-4  cursor-pointer text-muted-foreground hover:text-foreground" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Lecture Settings</DialogTitle>
              <DialogDescription className="flex justify-between">
                <p>
                  Make changes to your lecture here. Click save when youre done.
                </p>
                <Button
                  size={"icon"}
                  className="aspect-square"
                  variant={"destructive"}
                  onClick={() => {
                    axios.delete("/api/lecture", { data: { id: lecture.id } });
                    toast.success("Lecture deleted successfully");
                    router.push("/dashboard");
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogDescription>
            </DialogHeader>
            <LectureSettingsForm lecture={lecture} />{" "}
          </DialogContent>
        </Dialog>
      </div>
      <div className="block md:hidden">
        <Drawer open={Draweropen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <MoreVertical className="aspect-square h-4  cursor-pointer text-muted-foreground hover:text-foreground" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Lecture Settings</DrawerTitle>
              <DrawerDescription className="flex justify-between">
                <p>
                  Make changes to your lecture here. Click save when youre done.
                </p>
                <Button
                  size={"icon"}
                  className="aspect-square"
                  variant={"destructive"}
                  onClick={() => {
                    axios.delete("/api/lecture", { data: { id: lecture.id } });
                    toast.success("Lecture deleted successfully");
                    router.push("/dashboard");
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </DrawerDescription>
            </DrawerHeader>
            <LectureSettingsForm lecture={lecture} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
