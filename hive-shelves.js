/* Hive library: the ONE list of shelves that have call numbers.
   Every Hive repo's call-number search reads this file, so a call number
   typed on any page (HL, UP, FD, GR ...) opens the right repo.
   When a repo gets call numbers, add one line here. Nothing else changes. */
window.HIVE_SHELVES = [
  { prefix: "HL", name: "Hive library", url: "https://weber-county-hive.github.io/-weber-county-hive-index/index.html" },
  { prefix: "UP", name: "Unelected Power", url: "https://weber-county-hive.github.io/Unelected-Power/index.html" },
  { prefix: "FD", name: "Follow the Deed", url: "https://weber-county-hive.github.io/followthedeed/index.html" },
  { prefix: "GR", name: "Graphics library", url: "https://weber-county-hive.github.io/graphics/index.html" },
  { prefix: "GV", name: "GSL-Votes", url: "https://weber-county-hive.github.io/GSL-Votes/index.html" },
  { prefix: "DR", name: "Drawn From the Record", url: "https://weber-county-hive.github.io/Drawn-From-the-Record/index.html" }
];
