async ({mode,N})=>{
  // 点击成功率模型：用户目光一直盯着目标，手有 ~120ms 视觉-运动滞后（落点 = 120ms 前目标所在位置 + 瞄准误差）
  const touch=mode==='touch', sigma=touch?14:6, LAG=120;
  const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const ev=(type,x,y)=>{const el=document.elementFromPoint(x,y)||document.body;
    el.dispatchEvent(new PointerEvent(type,{clientX:x,clientY:y,pointerType:touch?'touch':'mouse',pointerId:1,isPrimary:true,bubbles:true,cancelable:true,button:0}));return el;};
  const res={ok:0,wrong:0,miss:0,n:0,rows:[]};
  for(let i=0;i<N;i++){
    if(curOrb) closePanel();
    ORBS.forEach(o=>{o._locking=false;o.el.classList.remove('locking');});
    const ret=document.getElementById('contactReticle'); if(ret) ret.classList.remove('lock');
    window.__stageFocus=false;
    const vis=ORBS.filter(o=>!o.done&&o.sx!=null&&o.sx>16&&o.sx<innerWidth-16&&o.sy>70&&o.sy<innerHeight-(touch?110:60)).filter(o=>{
      const e=document.elementFromPoint(o.sx,o.sy);return e&&o.el.contains(e);});
    if(!vis.length){await sleep(400);i--;continue;}
    const t=vis[Math.floor(Math.random()*vis.length)];
    const hist=[]; const sample=setInterval(()=>hist.push([performance.now(),t.sx,t.sy]),16);
    const lagged=()=>{const now=performance.now();let p=hist[0]||[now,t.sx,t.sy];for(const h of hist){if(now-h[0]>=LAG)p=h;else break;}return p;};
    const ex=gauss()*sigma, ey=gauss()*sigma;
    const reaction=touch?(300+Math.random()*250):(120+Math.random()*130);
    let ax,ay;
    if(!touch){
      const dir=Math.random()<.5?-1:1, ox=dir*250, oy=(Math.random()-.5)*160, steps=12;
      await sleep(60);
      for(let s=1;s<=steps;s++){const p=lagged();const k=s/steps;ax=p[1]+ex;ay=p[2]+ey;ev('pointermove',(p[1]+ox*(1-k))+ex,(p[2]+oy*(1-k))+ey);await sleep(22);}
      const end=performance.now()+reaction;
      while(performance.now()<end){const p=lagged();ax=p[1]+ex;ay=p[2]+ey;ev('pointermove',ax,ay);await sleep(30);}
    }else{ await sleep(reaction); const p=lagged(); ax=p[1]+ex; ay=p[2]+ey; }
    const dBefore=Math.hypot(t.sx-ax,t.sy-ay), scale=t.el.getBoundingClientRect().width/76;
    ev('pointerdown',ax,ay); await sleep(60); ev('pointerup',ax,ay);
    const hit=document.elementFromPoint(ax,ay); if(hit&&hit.closest&&hit.closest('.orb')) hit.dispatchEvent(new MouseEvent('click',{clientX:ax,clientY:ay,bubbles:true,cancelable:true}));
    await sleep(15); clearInterval(sample);
    const locked=ORBS.filter(o=>o._locking||o===curOrb);
    let r='miss'; if(locked.includes(t)) r='ok'; else if(locked.length) r='wrong';
    res[r]++; res.n++; res.rows.push([r,Math.round(dBefore),+scale.toFixed(2)]);
    await sleep(560);
  }
  res.rate=+(res.ok/res.n*100).toFixed(1);
  res.missRows=res.rows.filter(x=>x[0]!=='ok').slice(0,10);
  res.meanErr=Math.round(res.rows.reduce((a,x)=>a+x[1],0)/res.rows.length);
  delete res.rows; return res;
}
