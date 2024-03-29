import { searchService } from "@/app/actions/action";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type paramProps = {
    params: Params
}
const SearchResult = async ({ params }: paramProps) => {
    const id: string = params.id;
    const results = await searchService(id);
    console.log(results);
    return (
        <h1>Hi</h1>
    );
}

export default SearchResult;