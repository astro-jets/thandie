import { getSingleClaim } from "@/app/actions/claims";
import SingleClaim from "@/app/components/claims/singleClaim";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type claimProps = {
    _id: string;
    title: string;
    status: string;
    description: string;
    path: string;
    service: {
        name: string; description: string;
    },
    user: {
        name: string; email: string;
    }
}

type paramProps = {
    params: Params
}

const FetchSingleClaim = async ({ params }: paramProps) => {
    const id = params.id;
    const res = await getSingleClaim(id);
    const claim: claimProps = await res.claimsData[0];
    return (
        <SingleClaim claim={claim} />
    );
}

export default FetchSingleClaim;