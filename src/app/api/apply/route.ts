import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 30;

const APPLY_TO = process.env.APPLY_TO_EMAIL || "hey@theblankcollar.com";
const APPLY_FROM = process.env.APPLY_FROM_EMAIL || "blankcollar.vc <onboarding@resend.dev>";

type Field = string | undefined;

function escape(str: Field) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: Field) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #eee;font-family:ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666;width:200px;vertical-align:top;">${escape(label)}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #eee;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#0E1320;">${escape(value).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const get = (k: string): Field => {
      const v = formData.get(k);
      return typeof v === "string" ? v.trim() || undefined : undefined;
    };

    const founderName = get("founderName");
    const founderEmail = get("founderEmail");
    const companyName = get("companyName");

    if (!founderName || !founderEmail || !companyName) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tierMap: Record<string, string> = {
      "os-pass": "The OS Pass",
      "full-stack": "The Full Stack",
      cheque: "The Cheque",
    };
    const tierRaw = get("tier") || "full-stack";
    const tier = tierMap[tierRaw] || tierRaw;

    const fields: Record<string, Field> = {
      "Tier (hint)": tier,
      "Founder name": founderName,
      "Email": founderEmail,
      "Role": get("founderRole"),
      "Location": get("founderLocation"),
      "LinkedIn": get("founderLinkedin"),
      "Superpower": get("superpowers"),
      "Team": get("teamDescription"),
      "Worked together": get("workedTogether"),
      "Company": companyName,
      "Website": get("companyWebsite"),
      "Stage": get("companyStage"),
      "Sector": get("sector"),
      "One-liner": get("oneLiner"),
      "Problem": get("problem"),
      "Customer": get("customer"),
      "Solution": get("solution"),
      "Differentiator": get("differentiator"),
      "Why now": get("whyNow"),
      "Customer interviews": get("interviewRange"),
      "Traction": get("traction"),
      "Biggest risk": get("biggestRisk"),
      "Raising": get("raisingAmount"),
      "Use of funds": get("useOfFunds"),
      "Help fit (founder's read)": get("helpFit"),
      "Why blankcollar": get("whyUs"),
      "Pitch deck link": get("pitchDeckLink"),
      "Product link": get("productLink"),
      "Anything else": get("somethingElse"),
    };

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#F4F1EA;padding:32px;">
        <div style="max-width:640px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #eee;">
          <div style="padding:28px 32px;background:#0E1320;color:#F4F1EA;">
            <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;">New application · ${escape(tier)}</div>
            <div style="font-size:28px;font-weight:500;margin-top:6px;">${escape(companyName)}</div>
            <div style="font-size:14px;opacity:0.7;margin-top:4px;">${escape(founderName)} · ${escape(founderEmail)}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${Object.entries(fields).map(([k, v]) => row(k, v)).join("")}
          </table>
          <div style="padding:20px 32px;background:#FAFAF7;font-family:ui-monospace,monospace;font-size:11px;color:#666;letter-spacing:0.06em;">
            Sent via blankcollar.vc/apply · ${new Date().toISOString()}
          </div>
        </div>
      </div>
    `;

    const text = Object.entries(fields)
      .filter(([, v]) => !!v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n\n");

    const pitchDeck = formData.get("pitchDeck");
    const attachments: { filename: string; content: Buffer }[] = [];
    if (pitchDeck instanceof File && pitchDeck.size > 0) {
      if (pitchDeck.size > 25 * 1024 * 1024) {
        return Response.json(
          { ok: false, error: "Pitch deck must be under 25 MB" },
          { status: 400 }
        );
      }
      const buf = Buffer.from(await pitchDeck.arrayBuffer());
      attachments.push({ filename: pitchDeck.name, content: buf });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[apply] RESEND_API_KEY not set — running in mock mode");
      console.log("[apply] would send:", { to: APPLY_TO, subject: `Application — ${companyName}`, attachments: attachments.map(a => a.filename) });
      return Response.json({ ok: true, mock: true });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: APPLY_FROM,
      to: APPLY_TO,
      replyTo: founderEmail,
      subject: `Application — ${companyName} · ${tier}`,
      html,
      text,
      attachments,
    });

    if (error) {
      console.error("[apply] resend error:", error);
      return Response.json(
        { ok: false, error: "Email service rejected the request" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[apply] unexpected:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
