'use server'

export const deleteMedia = async (title: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/Media`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: "delete", title })
        })
        const data = (await response.json())
        return data
    } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error happened: ${JSON.stringify(error)}`)
    }
}

