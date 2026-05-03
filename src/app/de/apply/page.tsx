import { LangProvider } from "@/lib/lang";
import { ApplyContent } from "@/components/ApplyContent";

export default function DeApplyPage() {
  return (
    <LangProvider lang="de">
      <div lang="de">
        <ApplyContent />
      </div>
    </LangProvider>
  );
}
