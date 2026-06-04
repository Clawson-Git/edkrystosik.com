/*
 * webmcp.js — WebMCP tool layer for edkrystosik.com (progressive enhancement).
 * ---------------------------------------------------------------------------
 * Exposes read/action tools to an in-browser AI agent via navigator.modelContext.
 * Loaded site-wide from <head>. Feature-detects, registers silently, and causes
 * ZERO visible change or console noise for human visitors. The only "action" tool
 * (contact_ed) opens Ed's real LinkedIn DM — it never fakes a confirmation.
 */
(function () {
  "use strict";

  var LINKEDIN_URL = "https://www.linkedin.com/in/ed-krystosik/";

  var VENTURES = [
    { id: "audity", name: "Audity", role: "Co-Founder",
      desc: "The operating system for boutique AI consulting firms (3-25 people) running multi-seat client work. $397/seat/mo.",
      url: "https://auditynow.com/audity-teams",
      forWho: "boutique ai consulting firms running client work as a team" },
    { id: "rac-ai", name: "RAC/AI", role: "CAIO",
      desc: "Hands-on AI transformation audits and advisory for established mid-market businesses. Diagnosis, roadmap, execution. $15K-$50K engagements.",
      url: "https://racprojects.ai/",
      forWho: "established mid-market businesses navigating ai transformation" },
    { id: "artana-bio", name: "Artana Bio", role: "Co-Founder",
      desc: "Early-stage biotechnology venture at the frontier of precision medicine.",
      url: "https://edkrystosik.com/#ventures",
      forWho: "biotech and precision medicine" },
    { id: "med13", name: "Med13 Foundation", role: "Finance Director",
      desc: "Nonprofit advancing medical research; Ed leads financial operations and strategy.",
      url: "https://edkrystosik.com/#ventures",
      forWho: "medical research nonprofit work" }
  ];

  var TOOLS = [
    {
      name: "get_overview",
      description: "Concise overview of who Ed Krystosik is and how to reach him.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      execute: function () {
        return { content: [{ type: "text", text:
          "Ed Krystosik — builder, founder, and hands-on operator at the intersection of AI, " +
          "biotech, and business strategy. CAIO at RAC/AI, co-founder of Audity, co-founder of " +
          "Artana Bio, and Finance Director at the Med13 Foundation. Based in Reno, NV. " +
          "Reach him on LinkedIn: " + LINKEDIN_URL }] };
      }
    },
    {
      name: "list_ventures",
      description: "List Ed's ventures with his role and a one-line description of each.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      execute: function () {
        var text = VENTURES.map(function (v) {
          return v.name + " (" + v.role + "): " + v.desc;
        }).join("\n");
        return { content: [{ type: "text", text: text }], ventures: VENTURES };
      }
    },
    {
      name: "recommend_venture",
      description: "Given a stated need or interest, recommend the best-matching venture and how to engage.",
      inputSchema: {
        type: "object",
        properties: { need: { type: "string", description: "what the visitor is trying to do or is interested in" } },
        required: ["need"],
        additionalProperties: false
      },
      execute: function (args) {
        args = args || {};
        var need = (args.need || "").toLowerCase();
        var pick = VENTURES[0];
        for (var i = 0; i < VENTURES.length; i++) {
          var v = VENTURES[i];
          var hay = (v.forWho + " " + v.name + " " + v.desc).toLowerCase();
          var terms = need.split(/\s+/).filter(Boolean);
          var hit = terms.some(function (t) { return t.length > 3 && hay.indexOf(t) !== -1; });
          if (hit) { pick = v; break; }
        }
        return { content: [{ type: "text", text:
          pick.name + " — " + pick.desc + " More: " + pick.url +
          ". To reach Ed directly, use contact_ed." }], venture: pick.id };
      }
    },
    {
      name: "contact_ed",
      description:
        "Open Ed's LinkedIn profile so the visitor can send a DM — the primary way to start a " +
        "conversation. In an interactive browser this opens the profile in a new tab; otherwise " +
        "it returns the URL. It does not send any message on the visitor's behalf.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      execute: function () {
        var opened = false;
        try {
          if (typeof window !== "undefined" && window.open) {
            window.open(LINKEDIN_URL, "_blank", "noopener"); opened = true;
          }
        } catch (e) { /* non-interactive context: just return the URL */ }
        return {
          content: [{ type: "text", text:
            "Opened Ed's LinkedIn profile. Send him a DM to start a conversation: " + LINKEDIN_URL }],
          contactUrl: LINKEDIN_URL,
          opened: opened
        };
      }
    }
  ];

  function register(ctx) {
    if (!ctx) return;
    try {
      if (typeof ctx.registerTool === "function") {
        TOOLS.forEach(function (t) { ctx.registerTool(t); });
        return;
      }
      if (typeof ctx.provideContext === "function") {
        ctx.provideContext({ tools: TOOLS });
        return;
      }
    } catch (e) { /* never throw into the page */ }
  }

  function init() {
    try {
      var nav = (typeof navigator !== "undefined") ? navigator : null;
      var doc = (typeof document !== "undefined") ? document : null;

      if (nav && nav.modelContext) register(nav.modelContext);
      if (doc && doc.modelContext && doc.modelContext !== (nav && nav.modelContext)) register(doc.modelContext);

      if (nav && !nav.modelContext) {
        var queue = [];
        nav.modelContext = {
          registerTool: function (t) { queue.push(t); },
          provideContext: function (c) { if (c && c.tools) queue.push.apply(queue, c.tools); },
          _tools: queue
        };
        register(nav.modelContext);
      }
    } catch (e) { /* fail closed: do nothing visible */ }
  }

  if (typeof document !== "undefined" && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
