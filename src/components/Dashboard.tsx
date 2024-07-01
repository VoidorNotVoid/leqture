"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import DocumentCard from "./DocumentCard";
import LectureButton from "./UploadButton";

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="p-5 bg-background h-[95vh] space-y-4">
      {" "}
      <div className="flex grow">
        <div className="mx-auto flex max-w-7xl grow flex-col py-10">
          <div className="flex grow flex-col">
            <div className="flex w-full flex-col items-center justify-between gap-4 px-6 md:flex-row">
              <div className="text-3xl font-semibold">Your Documents</div>
              <LectureButton isSubscribed={subscriptionPlan.isSubscribed} />
            </div>
            {files && files?.length !== 0 ? (
              <div className="flex w-full flex-col items-center justify-center gap-2 overflow-y-auto p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-3">
                {files
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
              </div>
            ) : (
              <div className="flex w-full items-center justify-center text-muted-foreground p-6">
                No Lectures Yet
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
