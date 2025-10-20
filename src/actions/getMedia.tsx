'use server'

export const getMedia = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/Media`, { method: "GET" })
        const data = (await response.json())
        return data.medias
    } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error happened: ${JSON.stringify(error)}`)
    }
}

