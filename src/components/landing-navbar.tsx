import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Feather } from "lucide-react";
// import { checkAuth, getUserAuth } from "@/lib/auth/utils";
// import UserButton from "./UserButtion";

const LandingNavbar = async () => {
  // const { session } = await getUserAuth();
  // const user = session?.user;

  return (
    <nav className="sticky h-[4rem] flex items-center inset-x-0 top-0 z-30 w-full bg-transparent backdrop-blur-lg transition-all">
      <div className="container">
        <div className="flex h-14 items-center justify-between ">
          <Link
            href="/"
            className=" left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight"
          >
            <Feather className="mr-2 h-6 w-6" />
            <span>Lecture</span>
          </Link>

          {/* <MobileNav isAuth={!!user} /> */}

          <div className="hidden items-center space-x-4 sm:flex">
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    variant: "geist",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
