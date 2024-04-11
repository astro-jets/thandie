"use client"

import { useState } from "react";

const FileUploadComponent = () => {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) { return }

        try {
            const data = new FormData();
            data.set('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
                next: {
                    revalidate: 0
                }
            })
            if (!res.ok) { throw new Error(await res.text()) }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <main className="py-20">
            <h1 className="mt-20">Upload files</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="file"
                    name="file"
                    id="image"
                    onChange={(e) => { setFile(e.target.files?.[0]) }}
                />
                <button type="submit">Submit</button>
            </form>
        </main>

    );
}

export default FileUploadComponent;