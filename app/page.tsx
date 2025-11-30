"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
    <Header>
    </Header>      
      <main className="p-8 flex flex-col gap-8">        
        <Authenticated>
          <Content />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p>Log in to see the numbers</p>
      <SignInButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}

function Content() {


  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">

      Create and look at creatures and player characters.
      <Link href="/creatures">Creatures</Link>
    </div>
  );
}
