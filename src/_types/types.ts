export const MediaTypeArray = ["image, video, gif"] 
type MediaType = typeof MediaTypeArray[number];

export type FileData = {
    src: string,
    // String because Type Stats imports fs
    stats: string,
    mimeType: string,
    // Umbrella Type for sorting
    type: MediaType,
    width: number,
    height: number
}

// export const FilterSortingArray = ["ascending", "descending", "random"] as const;
// type FilterSorting = typeof FilterSortingArray[number]; // Equivalent of FilterSorting: "ascending" | "descending" | "random"

// If you're using signals this is nice. (npm install @preact/signals-react)
// Converts all Signal<Type> to just Type. So you can send them to the server
// export type SignalToPrimative<ObjectType extends object> =
//     { [Key in keyof ObjectType]: ObjectType[Key] extends Signal
//         ? ObjectType[Key]['value']
//         : ObjectType[Key] extends Object
//         ? SignalToPrimative<ObjectType[Key]>
//         : Key
//     };
