"use client";

import { Session } from "inspector/promises";
import { useState } from "react";

import { api } from "~/trpc/react";

export function GuessTitle() {

  const utils = api.useUtils();
  const [title, setTitle] = useState("");

  // To get from user session
  const userid = 1;

  const createGuess = api.guessTitle.create.useMutation({
    onSuccess: async () => {
      await utils.guessTitle.invalidate();
      setTitle("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createGuess.mutate({ title, userid });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.title)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createGuess.isPending}
        >
          {createGuess.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
