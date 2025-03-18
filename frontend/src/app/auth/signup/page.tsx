import {SignupForm} from "@/widgets/auth"
import {ExcludeLayout} from "@/shared/utils";

export default function Page() {
  return (
    <ExcludeLayout className="flex w-full items-center justify-center px-4">
      <SignupForm />
    </ExcludeLayout>
  )
}
