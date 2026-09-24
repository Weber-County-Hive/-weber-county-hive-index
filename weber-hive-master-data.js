// ===== WEBER COUNTY HIVE — MASTER INDEX DATA =====
// Two lists:
//   LATEST — the newest case files, shown in the strip at the top. Newest first.
//            Keep it to 4–6 entries; delete the oldest when you add a new one.
//   REPOS  — one entry per project. "group" puts it on a shelf:
//            money, legislature, land, oversight, life
// Nothing else on the page needs to change.

const LATEST = [
  { title:"Meta in Eagle Mountain, Part 2: The Plant Not in the Announcement", project:"Data-Centers", date:"Sep 23, 2026", url:"https://webercountyhive-coder.github.io/Data-Centers/meta-eagle-mountain-gas-plant.html", tags:["Meta","gas plant","PSC","SB 132"] },
  { title:"Meta in Eagle Mountain, Part 1: The Deal That Started Under Another Name", project:"Data-Centers", date:"Sep 23, 2026", url:"https://webercountyhive-coder.github.io/Data-Centers/weber-hive-dc-meta-eagle-mountain.html", tags:["Meta","tax breaks","water","Stadion"] },
  { title:"Case 22: Bitner vs. Last (HD-17) — Two Filings, Two Numbers", project:"Candidates 2026", date:"Sep 23, 2026", url:"https://weber-county-hive.github.io/candidates2026/hd17-bitner-last.html", tags:["HD-17","Bitner","CMV PAC"] },
  { title:"Case 21: Tran vs. Neal (SD-6) — The Deciding Vote", project:"Candidates 2026", date:"Sep 23, 2026", url:"https://weber-county-hive.github.io/candidates2026/sd6-tran-neal.html", tags:["SD-6","Tran","Meta PAC"] },
  { title:"36 Endorsed. 13 Paid Who Weren't. — The Doers Network", project:"PAC", date:"Sep 23, 2026", url:"https://weber-county-hive.github.io/pac/weber-hive-doers-network.html", tags:["Doers Network","All In For Utah"] },
];

const REPOS = [
  { title:"Transparency", desc:"Cross-official accountability and enforcement comparisons — how different cases and officials are (or aren't) held to the same standard.", url:"https://weber-county-hive.github.io/Transparency/", color:"#3a5f7d", group:"oversight" },
  { title:"Bill-Tracker", desc:"The legislative bill docket — case files tracking individual bills through the Utah Legislature.", url:"https://weber-county-hive.github.io/Bill-Tracker/", color:"#2e5f5a", group:"legislature" },
  { title:"PIDS-Utah", desc:"“PID's: What is the Real Cost?” — Public Infrastructure Districts and what they actually cost homeowners.", url:"https://weber-county-hive.github.io/PIDS-Utah/", color:"#1e2f4d", group:"land" },
  { title:"Committees", desc:"Legislative committee tracker — who sits where, and what that overlap means.", url:"https://weber-county-hive.github.io/committees/", color:"#1f4d2f", group:"legislature" },
  { title:"UIPA", desc:"Utah Inland Port Authority coverage — Little Mountain Service Area, the wetlands warning story, and a general UIPA explainer.", url:"https://webercountyhive-coder.github.io/UIPA/", color:"#7a4a1f", group:"land" },
  { title:"Data-Centers", desc:"Utah's data center boom — the Aug. 19, 2026 legislative hearing, the bills behind the industry, Stratos, and a two-part case file on Meta's Eagle Mountain campus and gas plant.", url:"https://webercountyhive-coder.github.io/Data-Centers/", color:"#142a2c", group:"land" },
  { title:"Surveillance", desc:"Flock cameras, license plate readers, phone and vehicle tracking technology — what's deployed and how it's used.", url:"https://weber-county-hive.github.io/Surveillance/", color:"#4a2540", group:"life" },
  { title:"Utah Senators", desc:"Profiles of Utah state senators — voting records, donor networks, and committee assignments.", url:"https://weber-county-hive.github.io/utah-senators/", color:"#5c3d1f", group:"legislature" },
  { title:"Politics for Beginners", desc:"Plain-language explainers of political terms and processes — what a lobbyist actually is, and more.", url:"https://weber-county-hive.github.io/politics-for-begginers/", color:"#c0572e", group:"life" },
  { title:"Taxation", desc:"Utah tax bills and policy — what's changing, and who it affects.", url:"https://weber-county-hive.github.io/Taxation/", color:"#8c6f1f", group:"legislature" },
  { title:"Candidates 2026", desc:"Case files on 2026 candidates — campaign money, disclosure forms and the networks behind them, plus the Doers Network.", url:"https://weber-county-hive.github.io/candidates2026/", color:"#3a2f5c", group:"money" },
  { title:"Great Salt Lake", desc:"Great Salt Lake coverage — legislation, mining interests, and the fight over the lake's future.", url:"https://weber-county-hive.github.io/Great-Salt-Lake/", color:"#163a4e", group:"land" },
  { title:"PAC Money-Flow Ledger", desc:"Interactive campaign-finance visualization tracing how PAC money moves through Utah politics.", url:"https://weber-county-hive.github.io/-weber-county-hive-ledger/", color:"#a67c1e", group:"money" },
  { title:"County Officials", desc:"Profiles of sitting county-level officials across Utah — board seats, campaign finance, and the networks behind them.", url:"https://webercountyhive-coder.github.io/countyofficials/", color:"#5c1a2b", group:"oversight" },
  { title:"Follow the Deed", desc:"Who's actually behind a piece of Utah land, once you trace the LLCs, the registered agents, and the state paperwork all the way down.", url:"https://weber-county-hive.github.io/followthedeed/", color:"#0B2545", group:"land" },
  { title:"Unelected Power", desc:"Utah officials who hold appointed, not elected, positions — how they got there, and any prior elected-office history.", url:"https://weber-county-hive.github.io/Unelected-Power/", color:"#7a1f3d", group:"oversight" },
  { title:"Utah House", desc:"Representative-by-representative profiles: committee seats, voting record, disclosed conflicts, and where public record and public messaging line up — or don't.", url:"https://weber-county-hive.github.io/Utah-House/", color:"#2c4a6b", group:"legislature" },
  { title:"Both Sides of the Table", desc:"The same firm planning what gets built and certifying it was built right. The same developer network winning a county override, then funding the fight against the city that override helped create. Case files on people and firms who sit on more than one side of a public decision.", url:"https://weber-county-hive.github.io/bothsidesofthetable/", color:"#6b3a1f", group:"oversight" },
  { title:"County Watch", desc:"County-by-county coverage across Utah — case files organized by where they happened, added as new deals and decisions surface in each county.", url:"https://weber-county-hive.github.io/countywatch/", color:"#3d5c3d", group:"oversight" },
  { title:"Audits", desc:"Primary-source state and county audits — what each one found, who was in charge, and whether anyone fixed it.", url:"https://weber-county-hive.github.io/audits/", color:"#4d3a1f", group:"oversight" },
  { title:"PAC", desc:"A case-by-case accounting of Utah political action committees — who runs them, who funds them, and where the money actually goes.", url:"https://weber-county-hive.github.io/pac/", color:"#5c2e5c", group:"money" },
  { title:"Education", desc:"District-by-district tracking of Utah school technology contracts, AI vendor deployments, and student data privacy: which districts have signed what, and who's minding the data.", url:"https://weber-county-hive.github.io/Education/", color:"#1f5c5c", group:"life" },
  { title:"Public Lands", desc:"How public land, minerals and water rights change hands in Utah — explainers and case files, starting with how a public parcel becomes private.", url:"https://weber-county-hive.github.io/public-lands/", color:"#6b5a2e", group:"land" },
  { title:"Referendums", desc:"Citizen referendum efforts against city and county decisions across Utah — filings, legal deadlines and disputes over required materials. Includes Eagle Mountain's tax referendums and the Stratos data center referendum.", url:"https://webercountyhive-coder.github.io/referendum/", color:"#2f4f6b", group:"oversight" },
];