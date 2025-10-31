import { EntityContainer } from "@/components/entity-component";
import { BillingHeader } from "../components/billing-header";
import { Pricing } from "../components/pricing";

export async function BillingView() {
    return (
        <EntityContainer
            header={<BillingHeader />}
        >
            <Pricing />
        </EntityContainer>
    );
}