"""taste-skill variant: generates the English (/) and Swedish (/sv/) pages from one template.

Usage: python3 build-taste.py <outdir> [base-url]
"""
import json, sys, html
from pathlib import Path

OUT = Path(sys.argv[1])
SITE = (sys.argv[2] if len(sys.argv) > 2 else "https://thobey.se").rstrip("/")
LINKEDIN = "https://www.linkedin.com/in/thomas-ytterstr%C3%B6m-4547a453/"
EMAIL = "info@thobey.se"
PHONE_HREF = "+46769430231"
PHONE = "+46 76 943 02 31"

C = {
 "en": {
  "path": "/", "other": "sv", "other_path": "sv/", "root": "", "other_label": "Svenska",
  "title": "Thobey Solutions · Thomas Ytterström, system architect and tech lead",
  "desc": "Thomas Ytterström is a system architect, tech lead and developer in Habo, Sweden. Thobey Solutions helps organizations build software that holds up and adopt AI in development.",
  "skip": "Skip to content",
  "nav": ["Services", "Work", "About", "Contact"],
  "hero_role": "Thomas Ytterström, system architect, tech lead and developer in Habo, Sweden.",
  "hero_lead": "I help organizations build software that holds up, and get real value from AI in how they build it.",
  "cta": "Email me",
  "services_h": "What I do",
  "services_note": "Building software since 2003. Senior enough to lead, technical enough to go deep. Bring me in for one of these, or both.",
  "services": [
   ("Architecture and technical leadership",
    "I design the overall solution, including structure, integrations, services and data, and then lead the team that builds it. I'm usually on the Microsoft/.NET and Azure stack, with React and Node where they fit.",
    ["Solution architecture and technical direction",
     "Tech lead and team lead for development teams",
     "Hands-on development in C#/.NET, TypeScript and React",
     "Workshops, requirements and turning manual processes digital"]),
   ("AI in software development",
    "I help teams adopt AI-assisted development in a way that improves quality and speed rather than adding risk. Today I'm part of a company-wide AI super user group, where I drive best practices for the developers.",
    ["Getting started with tools like Claude Code and GitHub Copilot",
     "Guidelines, workflows and good practice for teams",
     "Connecting AI to your own systems (MCP, integrations)",
     "Training and hands-on coaching"]),
  ],
  "work_h": "Selected work",
  "work_note": "Three platforms I've built or led, measured by the people who use them.",
  "work": [
   ("45,000+", "dealers worldwide", "Husqvarna Service Hub", "A global service tool for Husqvarna's dealer network. I've built it since 2019 and lead its six-person development team."),
   ("1,500+", "portal users", "Footly", "A self-service customer portal that automated payments and sales, replacing several full-time roles of manual work."),
   ("4,000+", "healthcare learners", "Medster", "E-commerce and e-learning in one platform, from purchase to certificate and invoice."),
  ],
  "clients_h": "Organizations I've worked with",
  "clients": ["Husqvarna", "Swedish National Courts Administration", "Government Offices of Sweden", "Volvo", "SAAB", "Chalmers", "Volkswagen Finans", "Swedish Board of Agriculture"],
  "about_h": "About me",
  "about_text": [
   "I've worked in IT since 2003, across manufacturing, the public sector, real estate, retail and more. I studied informatics, so I tend to see technology as a way to move the business forward, not an end in itself.",
   "People who work with me usually describe me as curious and solution-focused. As a lead, my job is to bring out the best in the people around me.",
  ],
  "facts": [
   ("Based in", "Habo, near Jönköping. On-site or remote across Sweden."),
   ("In IT since", "2003"),
   ("Education", "MSc Informatics, Jönköping International Business School"),
   ("Certified", "Software Architect, Microsoft Platform"),
   ("Off duty", "Volleyball referee at the highest national level, indoor and beach"),
  ],
  "contact_h": "Let's talk",
  "contact_lead": "Need an architect, a tech lead or help getting started with AI? Send me a few lines about what you're working on.",
  "topic_hint": "Pick what it's about and your email opens with it as the subject.",
  "topic_label": "What is it about?",
  "topics": ["Architecture", "Tech lead", "AI in development"],
  "subject_default": "Enquiry via thobey.se",
  "subject_prefix": "Enquiry: ",
  "and": " and ",
  "place": "Habo, Sweden",
  "photo_alt": "Portrait of Thomas Ytterström",
  "orgnr": "Org. nr 559197-7367",
  "job": "System architect and tech lead",
  "footer_cols": ["Thobey Solutions", "Contact", "Elsewhere"],
 },
 "sv": {
  "path": "/sv/", "other": "en", "other_path": "../", "root": "../", "other_label": "English",
  "title": "Thobey Solutions · Thomas Ytterström, systemarkitekt och tech lead",
  "desc": "Thomas Ytterström är systemarkitekt, tech lead och utvecklare i Habo. Thobey Solutions hjälper organisationer att bygga mjukvara som håller och att använda AI i utvecklingen.",
  "skip": "Hoppa till innehållet",
  "nav": ["Tjänster", "Uppdrag", "Om mig", "Kontakt"],
  "hero_role": "Thomas Ytterström, systemarkitekt, tech lead och utvecklare i Habo.",
  "hero_lead": "Jag hjälper organisationer att bygga mjukvara som håller, och att få verklig nytta av AI i utvecklingsarbetet.",
  "cta": "Mejla mig",
  "services_h": "Det här gör jag",
  "services_note": "Bygger mjukvara sedan 2003. Senior nog att leda, teknisk nog att gå på djupet. Välj det ena, eller kombinera båda.",
  "services": [
   ("Arkitektur och tekniskt ledarskap",
    "Jag designar helheten, med struktur, integrationer, tjänster och data, och leder sedan teamet som bygger den. Oftast på Microsoft/.NET och Azure, med React och Node där de passar.",
    ["Lösningsarkitektur och teknisk riktning",
     "Tech lead och teamledare för utvecklingsteam",
     "Egen utveckling i C#/.NET, TypeScript och React",
     "Workshops, kravarbete och digitalisering av manuella processer"]),
   ("AI i mjukvaruutveckling",
    "Jag hjälper team att börja använda AI-assisterad utveckling på ett sätt som höjer kvalitet och tempo i stället för att öka riskerna. Just nu ingår jag i en företagsövergripande grupp AI-superanvändare, där jag driver god praxis för utvecklarna.",
    ["Kom igång med verktyg som Claude Code och GitHub Copilot",
     "Riktlinjer, arbetssätt och god praxis för team",
     "Koppla AI till era egna system (MCP, integrationer)",
     "Utbildning och coachning i det dagliga arbetet"]),
  ],
  "work_h": "Utvalda uppdrag",
  "work_note": "Tre plattformar jag har byggt eller lett, mätt i de människor som använder dem.",
  "work": [
   ("45&#8239;000+", "återförsäljare världen över", "Husqvarna Service Hub", "Ett globalt serviceverktyg för Husqvarnas återförsäljarnätverk. Jag har byggt det sedan 2019 och leder i dag dess utvecklingsteam på sex personer."),
   ("1&#8239;500+", "portalanvändare", "Footly", "En självserviceportal som automatiserade betalningar och försäljning och ersatte flera heltidstjänster av manuellt arbete."),
   ("4&#8239;000+", "vårdstuderande", "Medster", "E-handel och e-lärande i en och samma plattform, hela vägen från köp till certifikat och faktura."),
  ],
  "clients_h": "Organisationer jag har arbetat med",
  "clients": ["Husqvarna", "Domstolsverket", "Regeringskansliet", "Volvo", "SAAB", "Chalmers", "Volkswagen Finans", "Jordbruksverket"],
  "about_h": "Om mig",
  "about_text": [
   "Jag har arbetat i IT-branschen sedan 2003, bland annat inom tillverkningsindustri, offentlig sektor, fastigheter och handel. Jag läste informatik och ser därför tekniken som ett sätt att föra verksamheten framåt, inte som ett mål i sig.",
   "De som arbetar med mig beskriver mig oftast som nyfiken och lösningsorienterad. Som ledare ser jag det som mitt jobb att få fram det bästa i människorna runt mig.",
  ],
  "facts": [
   ("Bas", "Habo, nära Jönköping. På plats eller på distans i hela Sverige."),
   ("I IT-branschen sedan", "2003"),
   ("Utbildning", "Magisterexamen i informatik, Internationella handelshögskolan i Jönköping"),
   ("Certifiering", "Software Architect, Microsoft Platform"),
   ("På fritiden", "Volleybolldomare på högsta nationella nivå, inomhus och beach"),
  ],
  "contact_h": "Hör av dig",
  "contact_lead": "Behöver du en arkitekt, en tech lead eller hjälp att komma igång med AI? Skriv några rader om vad du arbetar med.",
  "topic_hint": "Välj vad det gäller så får mejlet det som ämnesrad.",
  "topic_label": "Vad gäller det?",
  "topics": ["Arkitektur", "Tech lead", "AI i utvecklingen"],
  "subject_default": "Förfrågan via thobey.se",
  "subject_prefix": "Förfrågan: ",
  "and": " och ",
  "place": "Habo",
  "photo_alt": "Porträtt av Thomas Ytterström",
  "orgnr": "Org.nr 559197-7367",
  "job": "Systemarkitekt och tech lead",
  "footer_cols": ["Thobey Solutions", "Kontakt", "På andra ställen"],
 },
}

IDS = ["services", "work", "about"]

# The dot ring from the logo (x, y, outer?), in the logo's own coordinates; its centre is about (86, 69).
RING = [(88.9, 9.1, 1), (118.1, 14.3, 1), (60.5, 17.7, 1), (90.0, 23.7, 0), (112.4, 29.0, 0), (141.5, 32.1, 1), (70.7, 31.5, 0), (39.6, 38.2, 1), (129.5, 42.3, 0), (55.6, 46.6, 0), (30.7, 65.8, 1), (48.2, 65.9, 0), (52.7, 87.4, 0), (36.1, 94.2, 1), (125.9, 101.0, 0), (66.5, 104.6, 0), (136.5, 112.2, 1), (106.8, 111.2, 0), (85.4, 112.5, 0), (54.4, 117.0, 1), (111.1, 127.1, 1), (81.5, 128.9, 1)]


LOGO = (Path(__file__).parent / "logo" / "logo-light.svg").read_text()


def logo(cls):
    """The light logo inline, with each dot numbered so the ring can draw itself in."""
    import math, re
    svg = LOGO.strip()
    def order(m):
        x, y = float(m.group(1)), float(m.group(2))
        return (math.atan2(y - 69, x - 86) + math.pi / 2) % (2 * math.pi)
    dots = sorted(re.finditer(r'<circle cx="([\d.]+)" cy="([\d.]+)"[^>]*/>', svg), key=order)
    for i, m in enumerate(dots):
        svg = svg.replace(m.group(0), m.group(0).replace("<circle ", f'<circle style="--i:{i}" '), 1)
    svg = svg.replace('<svg ', f'<svg class="{cls}" ', 1).replace(' role="img" aria-label="Thobey Solutions"><title>Thobey Solutions</title>', ' aria-hidden="true" focusable="false">', 1)
    return svg


def ring():
    import math
    # deal the dots in order round the ring so they can arrive one after another
    dots = sorted(RING, key=lambda d: (math.atan2(d[1] - 69, d[0] - 86) + math.pi / 2) % (2 * math.pi))
    return "".join(
        f'<circle class="{"outer" if o else "inner"}" style="--i:{i}" cx="{x}" cy="{y}" r="{5 if o else 3.7}"/>'
        for i, (x, y, o) in enumerate(dots))


def page(lang):
    c = C[lang]
    url = SITE + c["path"]
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person", "@id": SITE + "/#thomas",
                "name": "Thomas Ytterström", "jobTitle": c["job"],
                "url": url, "image": SITE + "/thomas-ytterstrom-600.jpg",
                "email": "mailto:" + EMAIL, "telephone": PHONE_HREF,
                "address": {"@type": "PostalAddress", "addressLocality": "Habo", "addressCountry": "SE"},
                "alumniOf": {"@type": "CollegeOrUniversity", "name": "Jönköping International Business School"},
                "knowsAbout": ["Solution architecture", "Technical leadership", ".NET", "Azure", "AI-assisted software development"],
                "worksFor": {"@id": SITE + "/#company"},
                "sameAs": [LINKEDIN],
            },
            {
                "@type": "ProfessionalService", "@id": SITE + "/#company",
                "name": "Thobey Solutions", "url": SITE + "/",
                "email": EMAIL, "telephone": PHONE_HREF,
                "image": SITE + "/og.jpg",
                "address": {"@type": "PostalAddress", "addressLocality": "Habo", "addressCountry": "SE"},
                "areaServed": "SE", "founder": {"@id": SITE + "/#thomas"},
                "identifier": {"@type": "PropertyValue", "propertyID": "Organisationsnummer", "value": "559197-7367"},
            },
        ],
    }
    e = html.escape
    r = c["root"]
    nav = "".join(f'<li class="optional"><a href="#{i}">{n}</a></li>' for i, n in zip(IDS, c["nav"]))
    services = "".join(
        f'<div class="offer" data-reveal><h3>{h}</h3><p>{p}</p><ul>' + "".join(f"<li>{x}</li>" for x in items) + "</ul></div>"
        for h, p, items in c["services"])
    work = "".join(
        f'<li data-reveal><p class="figure">{n}</p><p class="unit">{u}</p><h3>{h}</h3><p>{p}</p></li>'
        for n, u, h, p in c["work"])
    clients = ", ".join(f'<span>{x}</span>' for x in c["clients"])
    about = "".join(f"<p>{p}</p>" for p in c["about_text"])
    facts = "".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in c["facts"])
    topics = "".join(f'<button type="button" class="topic" aria-pressed="false">{t}</button>' for t in c["topics"])
    mail_cfg = json.dumps({"to": EMAIL, "def": c["subject_default"], "pre": c["subject_prefix"], "and": c["and"]}, ensure_ascii=False)
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(c['title'])}</title>
<meta name="description" content="{e(c['desc'])}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en" href="{SITE}/">
<link rel="alternate" hreflang="sv" href="{SITE}/sv/">
<link rel="alternate" hreflang="x-default" href="{SITE}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="{e(c['title'])}">
<meta property="og:description" content="{e(c['desc'])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="{'en_GB' if lang == 'en' else 'sv_SE'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#262936">
<link rel="icon" href="{r}favicon.svg" type="image/svg+xml">
<link rel="preload" href="{r}fonts/big-shoulders.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{r}fonts/public-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{r}styles.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<a class="skip" href="#main">{c['skip']}</a>
<main id="main" class="page">
<div class="opening">
<header class="hero">
  <div class="bar">
    <a class="brand" href="./" aria-label="Thobey Solutions">{logo("logo")}</a>
    <nav class="site-nav" aria-label="{'Huvudmeny' if lang == 'sv' else 'Main'}">
      <ul>{nav}<li class="lang"><a href="{c['other_path']}" hreflang="{c['other']}" lang="{c['other']}">{c['other_label']}</a></li><li><a class="button" href="mailto:{EMAIL}">{c['cta']}</a></li></ul>
    </nav>
  </div>
  <h1 class="monument"><span>Thobey</span> <span>Solutions</span></h1>
  <div class="hero-body">
    <div class="hero-text">
      <p class="hero-role">{c['hero_role']}</p>
      <p class="hero-lead">{c['hero_lead']}</p>
    </div>
    <figure class="portrait">
      <picture>
        <source type="image/webp" srcset="{r}thomas-ytterstrom-320.webp 320w, {r}thomas-ytterstrom-600.webp 600w" sizes="(max-width: 47.5em) 60vw, 28vw">
        <img src="{r}thomas-ytterstrom-600.jpg" srcset="{r}thomas-ytterstrom-320.jpg 320w, {r}thomas-ytterstrom-600.jpg 600w" sizes="(max-width: 47.5em) 60vw, 28vw" width="600" height="600" alt="{c['photo_alt']}" fetchpriority="high">
      </picture>
    </figure>
  </div>
</header>

  <section class="section services" id="services" aria-labelledby="services-h">
    <div class="intro" data-reveal>
      <h2 id="services-h">{c['services_h']}</h2>
      <p>{c['services_note']}</p>
    </div>
    <div class="offers">{services}</div>
  </section>
</div>

  <section class="section work" id="work" aria-labelledby="work-h">
    <div class="intro" data-reveal>
      <h2 id="work-h">{c['work_h']}</h2>
      <p>{c['work_note']}</p>
    </div>
    <ul class="facts">{work}</ul>
    <p class="clients" data-reveal><strong id="clients-h">{c['clients_h']}:</strong> {clients}.</p>
  </section>

  <section class="section about" id="about" aria-labelledby="about-h">
    <h2 id="about-h" data-reveal>{c['about_h']}</h2>
    <dl class="side-facts" data-reveal>{facts}</dl>
    <div class="about-text" data-reveal>{about}</div>
  </section>

  <section class="section contact" id="contact" aria-labelledby="contact-h">
    <div class="contact-top" data-reveal>
      <h2 id="contact-h">{c['contact_h']}</h2>
      <p>{c['contact_lead']} <span class="topic-hint" hidden>{c['topic_hint']}</span></p>
      <div class="topics" role="group" aria-label="{c['topic_label']}" hidden>
        {topics}
      </div>
    </div>
    <a class="email" href="mailto:{EMAIL}" data-mail='{e(mail_cfg)}'><span>info@</span><span>thobey.se</span></a>
    <ul class="contact-list">
      <li><a href="tel:{PHONE_HREF}">{PHONE}</a></li>
      <li>{c['place']}</li>
      <li><a href="{LINKEDIN}">LinkedIn</a></li>
    </ul>
  </section>
</main>

<footer class="site-footer">
  <div class="cols">
    <div><p class="first">{c['footer_cols'][0]}</p><p>{c['orgnr']}</p><p>{c['place']}</p></div>
    <div><p class="first">{c['footer_cols'][1]}</p><p><a href="mailto:{EMAIL}">{EMAIL}</a></p><p><a href="tel:{PHONE_HREF}">{PHONE}</a></p></div>
    <div><p class="first">{c['footer_cols'][2]}</p><p><a href="{LINKEDIN}">LinkedIn</a></p><p><a href="{c['other_path']}" hreflang="{c['other']}" lang="{c['other']}">{c['other_label']}</a></p></div>
  </div>
  <div class="wordmark" data-reveal role="img" aria-label="Thobey Solutions">{logo("logo")}</div>
  <p class="legal">© 2026 Thobey Solutions · thobey.se</p>
</footer>
<script src="{r}site.js" defer></script>
</body>
</html>
"""


(OUT / "index.html").write_text(page("en"))
(OUT / "sv").mkdir(exist_ok=True)
(OUT / "sv" / "index.html").write_text(page("sv"))
(OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
(OUT / "sitemap.xml").write_text(f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>{SITE}/</loc><xhtml:link rel="alternate" hreflang="sv" href="{SITE}/sv/"/><xhtml:link rel="alternate" hreflang="en" href="{SITE}/"/></url>
  <url><loc>{SITE}/sv/</loc><xhtml:link rel="alternate" hreflang="sv" href="{SITE}/sv/"/><xhtml:link rel="alternate" hreflang="en" href="{SITE}/"/></url>
</urlset>
""")
cname = OUT / "CNAME"
if SITE == "https://thobey.se":
    cname.write_text("thobey.se\n")
elif cname.exists():
    cname.unlink()
