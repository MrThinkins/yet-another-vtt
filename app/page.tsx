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
          <UnauthenticatedHomePage />
        </Unauthenticated>
      </main>
    </>
  );
}

function UnauthenticatedHomePage() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p>
        ...Temp place holder text, to be replaced in the future
      </p>
      <h1>
        Open Source VTT
      </h1>
      <p>
        An Open Source VTT that is hosted here for you to use, or you can host it yourself and use it for personal use, make changes, and use it for non commercial stuff however you want, completely for free.
      </p>

      <h2>
        Easy to Host
      </h2>
      <p>
        A relatively simple project to self host, you can easily host it on your own machine, or on a cloud provider with just a little bit of work.
      </p>

      <h2>
        Real time built in the core.
      </h2>
      <p>
        Pretty much every part of the vtt is built on top of a real time database, so that every part of the VTT pretty much works in sync with no extra work.
      </p>

      <h2> 
        Sign in or up
      </h2>
      <p>
        Sign in or up to try it out right now.
      </p>
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
      <br></br>
      <Link href="/creatures">Creatures</Link>
      <br></br>
      <br></br>
      Virtual table top rooms and room creation
      <br></br>
      <Link href="/room">Room</Link>
    </div>
  );
}
