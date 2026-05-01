import { LangProvider } from "@/lib/lang";
import { Site } from "@/components/Site";

export default function DePage() {
  return (
    <LangProvider lang="de">
      <Site />
    </LangProvider>
  );
}
