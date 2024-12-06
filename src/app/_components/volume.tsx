"use client";

import Link from "next/link";
import { useState } from "react";

import { api } from "~/trpc/react";

export function VolumesList() {
    const [allVolumes] = api.volume.getAll.useSuspenseQuery();

    console.log(allVolumes);

    const utils = api.useUtils();
    const [name, setName] = useState("");
    const createVolume = api.volume.create.useMutation({
        onSuccess: async () => {
            await utils.volume.invalidate();
            setName("");
        },
    });

    return (
        <div className="w-full max-w-xs">
            <ul>
                {allVolumes ? allVolumes.map((volume) => (
                    <li key={volume.id}>
                        <Link href={volume.path} className="flex gap-10">
                            <p >{volume.name}</p>
                            <p>{volume.description}</p>
                        </Link>
                    </li>
                )) : (
                    <p>Nessun volume</p>
                )}
                {/* <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createPost.mutate({ name });
                    }}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-full px-4 py-2 text-black"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                        disabled={createPost.isPending}
                    >
                        {createPost.isPending ? "Submitting..." : "Submit"}
                    </button>
                </form> */}
            </ul>
        </div>
    );
}
