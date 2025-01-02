"use client";

import { Poem } from "@prisma/client";
import { useState } from "react";

import { api } from "~/trpc/react";

export function GuessTitle({ poemsList }: { poemsList: Poem[] }) {

  const utils = api.useUtils();

  // Get user from session
  const userid = 1;

  const createGuess = api.guessTitle.create.useMutation({
    onSuccess: async () => {
      await utils.guessTitle.invalidate();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    // Qui puoi gestire l'invio del form
    console.log('Form submitted:', Object.fromEntries(formData));

    const values: Poem[] = [];
    poemsList.map(poem => {
      var _poem: Poem = {
        id: 0,
        name: formData.get(poem.name) as string,
        title: formData.get(`value`) as string,
        createdAt: new Date(),
        volumeId: 1,
      }
      values.push(_poem);
    });

    createGuess.mutate({
      poemid: parseInt(formData.get('poemId') as string),
      title: formData.get('title') as string,
      userid: userid,
    })

  };


  return (
    <div className="w-full max-w-xs">
      {poemsList.map((poem) => (
        <form
          key={poem.id}
          action={handleSubmit}
          className="flex gap-2 p-2 items-center"
        >
          <span>{poem.name}</span>
          <input
            type="text"
            name={'title'}
            placeholder="Titolo"
            className="w-full rounded-full px-4 py-2 text-black"
          />
          <input type="hidden" name="poemId" value={poem.id.toString()} />

          <button
            type="submit"
            className="rounded-full bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20"
            disabled={createGuess.isPending}
          >
            {createGuess.isPending ? "Submitting..." : "Invia"}
          </button>
        </form>
      ))}
    </div >
  );
}
