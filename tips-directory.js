// Weber County Hive: tips directory. Every checked tip, filed by where it is ABOUT.
// Reads tips-data.js (the same list as the map and the log). Nothing here needs editing to add a tip.
(function(){
  var css=''+
  '.td-county{background:#faf7ef;border:1px solid #ddd6c4;border-left:6px solid #d4af37;border-radius:6px;margin:10px 0;}'+
  '.td-county>summary{cursor:pointer;list-style:none;padding:16px 18px;font-family:"Playfair Display",serif;font-size:1.3rem;font-weight:700;display:flex;flex-wrap:wrap;align-items:center;gap:10px;min-height:56px;}'+
  '.td-county>summary::-webkit-details-marker,.td-tip>summary::-webkit-details-marker{display:none;}'+
  '.td-county>summary:before,.td-tip>summary:before{content:"+";display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#17130c;color:#d4af37;font-family:Inter,sans-serif;font-size:1.1rem;flex:0 0 auto;}'+
  '.td-county[open]>summary:before,.td-tip[open]>summary:before{content:"\\2212";}'+
  '.td-n{font-family:Inter,sans-serif;font-size:.9rem;font-weight:600;color:#5b5850;}'+
  '.td-dots{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto;}'+
  '.td-dot{font-family:Inter,sans-serif;font-size:.78rem;font-weight:700;color:#fff;padding:2px 8px;border-radius:4px;}'+
  '.td-body{padding:0 14px 12px;}'+
  '.td-tip{background:#fff;border:1px solid #ddd6c4;border-left:6px solid #8c8878;border-radius:4px;margin:8px 0;}'+
  '.td-tip[data-r="verified"]{border-left-color:#1d6b3a}.td-tip[data-r="partly"]{border-left-color:#8a5a00}.td-tip[data-r="notfound"]{border-left-color:#9b1c1c}.td-tip[data-r="checking"]{border-left-color:#4b4b8f}'+
  '.td-tip>summary{cursor:pointer;list-style:none;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;font-size:1.05rem;line-height:1.4;}'+
  '.td-tip>summary .td-s{flex:1}'+
  '.td-tip .td-in{padding:0 16px 14px 52px;}'+
  '.td-tip ul{margin:6px 0 8px 20px}.td-tip li{margin-bottom:4px}'+
  '.td-meta{font-family:"IBM Plex Mono",monospace;font-size:12px;color:#5b5850;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:4px;}'+
  '.td-came{font-family:Inter,sans-serif;font-size:.92rem;color:#1c1c1a;margin:6px 0;}'+
  '.td-links a{font-family:Inter,sans-serif;font-weight:700;margin-right:16px;display:inline-block;margin-top:4px;}'+
  '.td-none{font-family:Inter,sans-serif;font-size:.9rem;color:#5b5850;margin-top:10px;}'+
  '@media(max-width:620px){.td-tip .td-in{padding-left:16px}.td-dots{margin-left:38px}}';
  var COL={verified:'#1d6b3a',partly:'#8a5a00',notfound:'#9b1c1c',checking:'#4b4b8f'};
  var WORD={verified:'verified',partly:'partly',notfound:'not found',checking:'checking'};
  var ALL=['Beaver','Box Elder','Cache','Carbon','Daggett','Davis','Duchesne','Emery','Garfield','Grand','Iron','Juab','Kane','Millard','Morgan','Piute','Rich','Salt Lake','San Juan','Sanpete','Sevier','Summit','Tooele','Uintah','Utah','Wasatch','Washington','Wayne','Weber'];
  function tipHTML(t){
    return '<details class="td-tip" data-r="'+t.r+'"><summary><span class="td-s"><span class="td-meta">'+t.date+' · '+t.how+'</span>'+
      '<span class="badge b-'+t.r+'">'+t.badge+'</span> '+t.claim+'</span></summary>'+
      '<div class="td-in"><ul>'+t.points.map(function(p){return '<li>'+p+'</li>';}).join('')+'</ul>'+
      (t.came?'<p class="td-came"><b>What came of it:</b> '+t.came+'</p>':'')+
      '<p class="td-links">'+(t.link?'<a href="'+t.link+'">'+t.linkText+'</a>':'')+'<a href="#tip-'+t.id+'">See it in the log ↓</a></p></div></details>';
  }
  window.renderHiveTipsDirectory=function(root){
    var D=window.HIVE_TIP_LIST; if(!D||!root) return;
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    var by={}; D.tips.forEach(function(t){(by[t.area]=by[t.area]||[]).push(t);});
    var groups=[['State','State of Utah (statewide)']];
    Object.keys(by).filter(function(a){return a!=='State'&&a!=='Outside';}).sort().forEach(function(a){groups.push([a,a+' County']);});
    if(by.Outside) groups.push(['Outside','Outside Utah (national cases)']);
    var html=groups.filter(function(g){return by[g[0]];}).map(function(g){
      var list=by[g[0]], tally={};
      list.forEach(function(t){tally[t.r]=(tally[t.r]||0)+1;});
      var dots=['verified','partly','notfound','checking'].filter(function(r){return tally[r];}).map(function(r){
        return '<span class="td-dot" style="background:'+COL[r]+'">'+tally[r]+' '+WORD[r]+'</span>';}).join('');
      return '<details class="td-county" id="county-'+g[0].toLowerCase().replace(/\s+/g,'-')+'"><summary>'+g[1]+
        ' <span class="td-n">'+list.length+' tip'+(list.length===1?'':'s')+'</span><span class="td-dots">'+dots+'</span></summary>'+
        '<div class="td-body">'+list.map(tipHTML).join('')+'</div></details>';
    }).join('');
    var empty=ALL.filter(function(c){return !by[c];});
    html+='<p class="td-none"><b>No tips yet:</b> '+empty.join(', ')+' counties. Know something there? <a href="tip.html">Send a tip →</a></p>';
    html+='<p class="td-none">Updated '+D.updated+'. Tipster names are never published.</p>';
    root.innerHTML=html;
    if(location.hash&&location.hash.indexOf('#county-')===0){var e=document.getElementById(location.hash.slice(1));if(e){e.open=true;e.scrollIntoView();}}
  };
})();
