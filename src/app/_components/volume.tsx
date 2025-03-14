"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export function VolumesList() {
    const { data: allVolumes } = api.volume.getAll.useQuery();

    return (
        <div className="w-full max-w-xs">
            <ul>
                {allVolumes ? allVolumes.map((volume: { path: string; description: string; name: string; id: number; }) => (
                    <li key={volume.id}>
                        <Link href={volume.path} className="flex gap-10">
                            <p >{volume.name}</p>
                            <p>{volume.description}</p>
                        </Link>
                    </li>
                )) : (
                    <p>Nessun volume</p>
                )}
            </ul>
        </div>
    );
}
