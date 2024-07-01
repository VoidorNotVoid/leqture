import BillingForm from "@/components/BillingForm"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const Page = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan()

    return <div className="h-[98vh] bg-background"><BillingForm subscriptionPlan={subscriptionPlan} /> </div>
}

export default Page