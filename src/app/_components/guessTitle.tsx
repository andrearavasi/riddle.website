"use client";

import { Poem } from "@prisma/client";
import { api } from "~/trpc/react";

export function GuessTitle({ poem }: { poem: Poem }) {

  const utils = api.useUtils();

  // Get user from session
  const userid = 1;
  var guessedTitle = '';

  const createGuess = api.guessTitle.create.useMutation({
    onSuccess: async () => {
      await utils.guessTitle.invalidate();
      const checkGuess = api.poem.getCheck.useQuery({
        text: guessedTitle
      });

    },
  });

  const handleSubmit = async (formData: FormData) => {
    guessedTitle = formData.get('title') as string

    createGuess.mutate({
      poemid: parseInt(formData.get('poemId') as string),
      title: guessedTitle,
      userid: userid,
    })


  };

  return (
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
      <span key={poem.id}>corretto</span>
    </form>
  );
}
