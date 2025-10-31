import { EntityHeader } from "@/components/entity-component";
import Link from "next/link";


export function BillingHeader() {
    return (
        <EntityHeader
            path={<strong>Billing</strong>}
            tabs={
                <div className="flex gap-x-4">
                    <Link href="/billing/pricing" className="border-b-2 pb-0.5 text-primary border-primary ">Pricing</Link>
                    <Link href="/billing/my-billing" >My Billing</Link>
                </div>
            }
        />
    );
}