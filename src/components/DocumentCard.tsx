import Link from "next/link";
import SettingsButton from "./settings-button";

export default function DocumentCard({ document }: { document: any }) {
  return (
    <div className="col-span-1 w-full max-w-sm relative m-2 flex h-32 flex-col overflow-hidden rounded-lg  shadow shadow-secondary border border-border border-[#eaeaea] dark:border-[#333] dark:bg-neutral-950  dark:shadow-none">
      <div className="flex h-3 items-center justify-center bg-dot-black/[0.2] dark:bg-dot-white/[0.2] font-bold">
        <div className="m-5 rounded-t-md h-full w-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </div>
      <div className="flex grow flex-col space-y-4 px-4 py-4 sm:px-6">
        <div className="flex h-full flex-row justify-between">
          <Link
            className=""
            href={`/dashboard/${document.id}`}
          >
            <div className="flex flex-col justify-between gap-4">
              <div className="flex w-64 flex-col gap-2">
                <div className="flex flex-row pr-2">
                  <p className="text-2xl font-semibold block truncate pointer-events-none">
                    {document.name}
                  </p>
                </div>
                {/* <div className="flex flex-row gap-2">
                  <Badge>Free</Badge>
                </div> */}
                <div>
                  <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                    Created on: {new Date(document.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="z-10 flex flex-col gap-4 pt-2">
            <SettingsButton lecture={document} />
          </div>
        </div>
      </div>
    </div>
  );
}
