import { getSingleClaim } from "@/app/actions/claims";
import ClaimSummary from "@/app/components/claims/claimSummaryAdmin";
import SingleClaim from "@/app/components/claims/singleClaim";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type claimProps = {
    _id: string;
    title: string;
    status: string;
    description: string;
    date: string,
    location: string,
    witnessName: string,
    witnessEmail: string,
    witnessPhone: string,
    path: string;
    service: {
        _id: string; price: string; name: string; description: string;
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
        <ClaimSummary claimData={claim} />
    );
}

export default FetchSingleClaim;