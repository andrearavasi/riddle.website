"use client";

import type { Poem } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";

export function GuessTitle({ poem }: { poem: Poem }) {
  const [spanState, setSpanState] = useState<null | boolean>(null);
  // const [guessedTitle, setGuessedTitle] = useState<string>("");
  const utils = api.useUtils();

  // Get user from session
  const userid = 1;

  const createGuess = api.guessTitle.create.useMutation({
    onSuccess: async (data) => {
      await utils.guessTitle.invalidate();
      compareTitleMutation.mutate({ text: data.title, poemid: poem.id });
    },
  });

  const compareTitleMutation = api.poem.getCheck.useMutation({
    onSuccess: (data) => setSpanState(data.isCorrect),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string

    createGuess.mutate({
      poemid: parseInt(formData.get('poemId') as string),
      title: title,
      userid: userid,
    });

  };

  return (
    <form
      key={poem.id}
      onSubmit={handleSubmit}
      className="flex w-full gap-2 p-2 items-center"
    >
      <span>{poem.name}</span>
      <input
        type="text"
        name="title"
        required
        placeholder="Titolo"
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input type="hidden" className="w-full" name="poemId" value={poem.id.toString()} />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20"
        disabled={createGuess.isPending}
      >
        {createGuess.isPending ? "Invio.." : "Invia"}
      </button>
      {spanState !== null && (
        <p>{spanState ? "Corretto!" : "Sbagliato, riprova!"}</p>
      )}
    </form>
  );
}
