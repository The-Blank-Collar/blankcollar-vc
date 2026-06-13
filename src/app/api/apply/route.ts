import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 30;

const APPLY_TO = process.env.APPLY_TO_EMAIL || "hey@theblankcollar.com";
const APPLY_FROM = process.env.APPLY_FROM_EMAIL || "blankcollar.ventures <onboarding@resend.dev>";

type Field = string | undefined;
type Lang = "en" | "de";

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

// Founder confirmation copy, in both languages
const founderEmailCopy: Record<Lang, {
  subject: (companyName: string) => string;
  greeting: (firstName: string) => string;
  intro: (companyName: string) => string;
  receivedHeading: string;
  timeline: { n: string; label: string; body: string }[];
  whileYouWait: string;
  links: { label: string; href: string }[];
  closing: string;
  signoff: string;
  footerMotto: string;
}> = {
  en: {
    subject: (c) => `We've got your application — ${c}`,
    greeting: (n) => `Hi ${n || "there"},`,
    intro: (c) =>
      `Thanks for applying to blankcollar.ventures on behalf of <strong>${c || "your company"}</strong>. Your application is in our inbox and we'll read it carefully.`,
    receivedHeading: "What happens next",
    timeline: [
      { n: "Day 1–3", label: "Read", body: "We read every application. No deck templates, no bots scoring you." },
      { n: "Day 3–10", label: "Conversation", body: "If there's signal, we'll book a 30-min call. Camera optional." },
      { n: "Day 14", label: "Decision", body: "Yes, no, or honest reason why. If yes, we start the next morning." },
    ],
    whileYouWait: "While you wait",
    links: [
      { label: "theblankcollar.com — see the knowledge layer", href: "https://www.theblankcollar.com" },
      { label: "blankcollar.university — the courses we'll point you to", href: "https://www.blankcollar.university" },
      { label: "blankcollar.ai — the agentic OS we'd set up for you", href: "https://www.blankcollar.ai" },
    ],
    closing:
      "If anything urgent comes up, just reply to this email. It comes from a real human inbox.",
    signoff: "— blankcollar.ventures",
    footerMotto: "Work is for bots. Life is for humans.",
  },
  de: {
    subject: (c) => `Wir haben deine Bewerbung — ${c}`,
    greeting: (n) => `Hi ${n || "Gründer"},`,
    intro: (c) =>
      `Danke für deine Bewerbung bei blankcollar.ventures für <strong>${c || "dein Unternehmen"}</strong>. Sie ist in unserem Posteingang und wir lesen sie sorgfältig.`,
    receivedHeading: "Was als Nächstes passiert",
    timeline: [
      { n: "Tag 1–3", label: "Lesen", body: "Wir lesen jede Bewerbung. Keine Deck-Vorlagen, keine Bots, die dich bewerten." },
      { n: "Tag 3–10", label: "Gespräch", body: "Wenn es Signal gibt, buchen wir einen 30-Minuten-Call. Kamera optional." },
      { n: "Tag 14", label: "Entscheidung", body: "Ja, nein, oder ein ehrlicher Grund. Wenn ja, starten wir am nächsten Morgen." },
    ],
    whileYouWait: "Solange du wartest",
    links: [
      { label: "theblankcollar.com — sieh die Wissens-Ebene in Aktion", href: "https://www.theblankcollar.com" },
      { label: "blankcollar.university — die Kurse, auf die wir dich hinweisen", href: "https://www.blankcollar.university" },
      { label: "blankcollar.ai — das agentische OS, das wir für dich einrichten", href: "https://www.blankcollar.ai" },
    ],
    closing:
      "Wenn etwas Dringendes auftaucht, antworte einfach auf diese Mail. Sie kommt aus einem echten Posteingang.",
    signoff: "— blankcollar.ventures",
    footerMotto: "Arbeit ist für Bots. Leben ist für Menschen.",
  },
};

function renderFounderEmail(lang: Lang, founderName: string, companyName: string): string {
  const c = founderEmailCopy[lang];
  const firstName = founderName.split(" ")[0] || "";
  const timelineRows = c.timeline
    .map(
      (t) => `
    <tr>
      <td style="padding:14px 0;width:120px;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(244,241,234,0.45);vertical-align:top;">${t.n}</td>
      <td style="padding:14px 0;color:#F4F1EA;">
        <div style="font-size:18px;font-weight:500;letter-spacing:-0.01em;">${escape(t.label)}</div>
        <div style="margin-top:4px;font-size:14px;line-height:1.5;color:rgba(244,241,234,0.7);">${escape(t.body)}</div>
      </td>
    </tr>`
    )
    .join("");

  const linksList = c.links
    .map(
      (l) => `
        <li style="margin-bottom:8px;">
          <a href="${l.href}" style="color:#0E1320;text-decoration:underline;">${escape(l.label)}</a>
        </li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="${lang}">
<body style="margin:0;background:#F4F1EA;font-family:Helvetica,Arial,sans-serif;color:#0E1320;">
  <div style="max-width:640px;margin:0 auto;background:white;border:1px solid #eee;border-radius:16px;overflow:hidden;">
    <!-- Header band -->
    <div style="padding:32px;background:#0E1320;color:#F4F1EA;">
      <div style="display:inline-block;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(244,241,234,0.6);">
        ● blankcollar.ventures
      </div>
      <div style="margin-top:14px;font-size:24px;font-weight:500;letter-spacing:-0.02em;">${escape(c.greeting(firstName))}</div>
      <p style="margin-top:16px;font-size:15px;line-height:1.55;color:rgba(244,241,234,0.85);">
        ${c.intro(escape(companyName))}
      </p>
    </div>

    <!-- Timeline (dark) -->
    <div style="padding:24px 32px 8px 32px;background:#0E1320;color:#F4F1EA;border-top:1px solid rgba(244,241,234,0.08);">
      <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(244,241,234,0.45);margin-bottom:8px;">
        ${escape(c.receivedHeading)}
      </div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${timelineRows}
      </table>
    </div>

    <!-- While you wait (light) -->
    <div style="padding:28px 32px;">
      <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#666;margin-bottom:10px;">
        ${escape(c.whileYouWait)}
      </div>
      <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.55;color:#0E1320;">
        ${linksList}
      </ul>
    </div>

    <!-- Closing note -->
    <div style="padding:0 32px 28px 32px;font-size:13px;line-height:1.55;color:#666;">
      ${escape(c.closing)}<br><br>
      ${escape(c.signoff)}
    </div>

    <!-- Footer strip -->
    <div style="padding:18px 32px;background:#FAFAF7;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.06em;color:#888;display:flex;justify-content:space-between;">
      <span>blankcollar.ventures</span>
      <span>${escape(c.footerMotto)}</span>
    </div>
  </div>
</body>
</html>`;
}

// VC / fund intake — a fund brings us a portfolio (or pipeline) AI company.
// Lighter than the founder application: just the fund, the company, and why.
async function handleVcSubmission(
  get: (k: string) => Field,
  lang: Lang
): Promise<Response> {
  const fundName = get("fundName");
  const yourName = get("yourName");
  const email = get("email");
  const company = get("company");

  if (!fundName || !yourName || !email || !company) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const fields: Record<string, Field> = {
    Submission: "VC / fund — bring a company",
    Lang: lang,
    Fund: fundName,
    Contact: yourName,
    Email: email,
    Relationship: get("relationship"),
    Company: company,
    Founder: get("founder"),
    "Why this one": get("why"),
  };

  const internalHtml = `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#F4F1EA;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #eee;">
        <div style="padding:28px 32px;background:#0E1320;color:#F4F1EA;">
          <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;">VC intro · ${escape(lang)}</div>
          <div style="font-size:28px;font-weight:500;margin-top:6px;">${escape(company)}</div>
          <div style="font-size:14px;opacity:0.7;margin-top:4px;">${escape(fundName)} · ${escape(yourName)} · ${escape(email)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(fields).map(([k, v]) => row(k, v)).join("")}
        </table>
        <div style="padding:20px 32px;background:#FAFAF7;font-family:ui-monospace,monospace;font-size:11px;color:#666;letter-spacing:0.06em;">
          Sent via blankcollar.ventures/apply?kind=vc · ${new Date().toISOString()}
        </div>
      </div>
    </div>`;

  const internalText = Object.entries(fields)
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[apply:vc] RESEND_API_KEY not set — running in mock mode");
    console.log("[apply:vc] would send INTERNAL:", { to: APPLY_TO, fund: fundName, company });
    return Response.json({ ok: true, mock: true });
  }

  const resend = new Resend(apiKey);
  const sent = await resend.emails.send({
    from: APPLY_FROM,
    to: APPLY_TO,
    replyTo: email,
    subject: `VC intro — ${company} (via ${fundName})`,
    html: internalHtml,
    text: internalText,
  });
  if (sent.error) {
    console.error("[apply:vc] resend error:", sent.error);
    return Response.json({ ok: false, error: "Email service rejected the request" }, { status: 502 });
  }
  return Response.json({ ok: true });
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
    const langRaw = get("lang");
    const lang: Lang = langRaw === "de" ? "de" : "en";

    // Funds use the lighter VC intake (kind=vc).
    if (get("kind") === "vc") {
      return await handleVcSubmission(get, lang);
    }

    if (!founderName || !founderEmail || !companyName) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tierMap: Record<string, string> = {
      access: "The Essentials",
      "os-pass": "The Essentials",
      "full-stack": "The Full Stack",
    };
    const tierRaw = get("tier") || "full-stack";
    const tier = tierMap[tierRaw] || tierRaw;

    const fields: Record<string, Field> = {
      "Tier (hint)": tier,
      "Lang": lang,
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

    const internalHtml = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#F4F1EA;padding:32px;">
        <div style="max-width:640px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #eee;">
          <div style="padding:28px 32px;background:#0E1320;color:#F4F1EA;">
            <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;">New application · ${escape(tier)} · ${escape(lang)}</div>
            <div style="font-size:28px;font-weight:500;margin-top:6px;">${escape(companyName)}</div>
            <div style="font-size:14px;opacity:0.7;margin-top:4px;">${escape(founderName)} · ${escape(founderEmail)}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${Object.entries(fields).map(([k, v]) => row(k, v)).join("")}
          </table>
          <div style="padding:20px 32px;background:#FAFAF7;font-family:ui-monospace,monospace;font-size:11px;color:#666;letter-spacing:0.06em;">
            Sent via blankcollar.ventures/apply · ${new Date().toISOString()}
          </div>
        </div>
      </div>
    `;

    const internalText = Object.entries(fields)
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
      console.log("[apply] would send INTERNAL:", { to: APPLY_TO, subject: `Application — ${companyName}`, attachments: attachments.map((a) => a.filename) });
      console.log("[apply] would send FOUNDER:", { to: founderEmail, subject: founderEmailCopy[lang].subject(companyName), lang });
      return Response.json({ ok: true, mock: true });
    }

    const resend = new Resend(apiKey);

    // 1) Internal email — application content + pitch deck attachment
    const internalRes = await resend.emails.send({
      from: APPLY_FROM,
      to: APPLY_TO,
      replyTo: founderEmail,
      subject: `Application — ${companyName} · ${tier}`,
      html: internalHtml,
      text: internalText,
      attachments,
    });

    if (internalRes.error) {
      console.error("[apply] internal resend error:", internalRes.error);
      return Response.json(
        { ok: false, error: "Email service rejected the request" },
        { status: 502 }
      );
    }

    // 2) Founder confirmation email — fire and forget, don't fail the whole
    //    submission if it bounces (rare email-sending issue shouldn't block
    //    the application from being received).
    try {
      const copy = founderEmailCopy[lang];
      const founderHtml = renderFounderEmail(lang, founderName, companyName);
      await resend.emails.send({
        from: APPLY_FROM,
        to: founderEmail,
        replyTo: APPLY_TO,
        subject: copy.subject(companyName),
        html: founderHtml,
      });
    } catch (e) {
      console.warn("[apply] founder confirmation failed (non-fatal):", e);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[apply] unexpected:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
