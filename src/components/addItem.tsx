"use client"

import { FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { cn } from "@/util/clientUtil";
import { getMedia } from "@/actions/getMedia";
import { insertMedia } from "@/actions/insertMedia";
import { Media } from "@/db/types";
import { deleteMedia } from "@/actions/deleteMedia";

export default function AddItem({ className, ...props }: { className?: string } & React.ComponentProps<"div">) {
    const [roots, setRoots] = useState<string[]>([])

    async function save(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let newRoots: string[] = roots.slice(0)
        let title = "";
        for (const pair of formData.entries()) {
            // console.log(pair[0], pair[1]);
            const st = pair[1].toString()
            if (pair[0].toString().includes("root") && st !== "") {
                newRoots.push(st)
                title = st;
            }
        }
        setRoots(newRoots);
        await insertMedia(title)
    }

    async function remove(i: number) {
        let r = roots.slice(0);
        let item = r[i]
        r.splice(i, 1);
        setRoots(r)
        await deleteMedia(item)
    }

    useEffect(() => {
        async function fun() {
            let res = await getMedia()
            let arr = []
            for (let r in res) {
                arr.push(res[r].title)
            }
            setRoots(arr)
        }
        fun();
    }, [])

    return (
        <div {...props}
            className={cn({ className }, "flex flex-col gap-3")}>
            <form onSubmit={save} className="flex flex-col gap-3">
                <input name="root" id="root" type="text" placeholder="Add Item..." className="bg-secondary-foreground rounded-md text-background p-1 px-3" />
                <Button type="submit">Add Item</Button>
            </form>

            {roots.map((r, i) => {
                return (
                    <div key={r + i} className="flex flex-row gap-2">
                        <p>{r}</p>
                        <div className="grow" />
                        <Button onClick={() => remove(i)}>Rm</Button>
                    </div>
                )
            })}
        </div>
    )
}
