(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
const reduced=()=>motionQuery.matches||document.body.classList.contains('reduce-motion');
const views=[];
function view(id,draw){
 const canvas=$('#'+id);if(!canvas)return null;
 const ctx=canvas.getContext('2d'),v={canvas,ctx,w:1,h:1,visible:true,dirty:true,draw};
 const resize=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);v.w=Math.max(1,r.width);v.h=Math.max(1,r.height);canvas.width=Math.round(v.w*d);canvas.height=Math.round(v.h*d);ctx.setTransform(d,0,0,d,0,0);v.dirty=true};
 new ResizeObserver(resize).observe(canvas);resize();
 if('IntersectionObserver'in window)new IntersectionObserver(es=>es.forEach(e=>{v.visible=e.isIntersecting;v.dirty=true}),{rootMargin:'100px'}).observe(canvas);
 views.push(v);return v;
}
function blob(ctx,x,y,r,t,phase=0){
 const pts=[],N=18;for(let i=0;i<N;i++){const a=i/N*Math.PI*2,rr=r*(1+.055*Math.sin(i*1.71+phase+t*.0013)+.025*Math.cos(i*2.4-t*.0007));pts.push({x:x+Math.cos(a)*rr,y:y+Math.sin(a)*rr})}
 ctx.beginPath();const f=pts[0],l=pts[N-1];ctx.moveTo((l.x+f.x)/2,(l.y+f.y)/2);for(let i=0;i<N;i++){const p=pts[i],n=pts[(i+1)%N];ctx.quadraticCurveTo(p.x,p.y,(p.x+n.x)/2,(p.y+n.y)/2)}ctx.closePath();
}
function pointer(v,e){const r=v.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*v.w,y:(e.clientY-r.top)/r.height*v.h}}
function pressed(group,key){$$('['+group+']').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[group.replace('data-','')])) )}
function setButtons(selector,button){$$(selector).forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}
function background(ctx,w,h){ctx.clearRect(0,0,w,h);ctx.fillStyle='#050907';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(184,241,207,.035)';ctx.lineWidth=1;for(let x=24;x<w;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=24;y<h;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}}

let anthroMode='notice',anthroTarget={x:.72,y:.4},anthroPos=null,anthroLast=0;
const anthro=view('anthroCanvas',(v,t)=>{
 const {ctx,w,h}=v;background(ctx,w,h);if(!anthroPos)anthroPos={x:w*.28,y:h*.62};
 const target={x:anthroTarget.x*w,y:anthroTarget.y*h},dt=Math.min(40,t-anthroLast||16);anthroLast=t;let state='NOTICE · 注意当前目标',angle=Math.atan2(target.y-anthroPos.y,target.x-anthroPos.x),obstacle=false;
 if(anthroMode==='wander'){
  state='ORBIT · 无目标摆动';anthroPos.x=w*.5+Math.cos(t*.00055)*w*.25;anthroPos.y=h*.52+Math.sin(t*.0007)*h*.2;angle=t*.00055+Math.PI/2;
 }else if(anthroMode==='recover'){
  obstacle=true;const cycle=(t%7200)/7200,start={x:w*.23,y:h*.65},mid={x:(start.x+target.x)/2,y:(start.y+target.y)/2};
  if(cycle<.34){const k=cycle/.34;anthroPos.x=start.x+(mid.x-start.x)*k;anthroPos.y=start.y+(mid.y-start.y)*k;state='APPROACH · 目标仍在前方'}
  else if(cycle<.56){const k=(cycle-.34)/.22;anthroPos.x=mid.x-(mid.x-start.x)*.18*k;anthroPos.y=mid.y+Math.sin(k*Math.PI)*24;state='HESITATE · 收回重心并停顿'}
  else{const k=(cycle-.56)/.44;anthroPos.x=mid.x+(target.x-mid.x)*k;anthroPos.y=mid.y+(target.y-mid.y)*k-Math.sin(k*Math.PI)*70;state='RECOVER · 调整路径再试一次'}
  angle=Math.atan2(target.y-anthroPos.y,target.x-anthroPos.x);
 }else{
  anthroPos.x+=(target.x-anthroPos.x)*.0028*dt;anthroPos.y+=(target.y-anthroPos.y)*.0028*dt;state=Math.hypot(target.x-anthroPos.x,target.y-anthroPos.y)<65?'SETTLE · 抵达后停留':'APPROACH · 先朝向，再趋近';
 }
 ctx.save();ctx.setLineDash([3,8]);ctx.strokeStyle='rgba(233,200,141,.28)';ctx.beginPath();ctx.moveTo(anthroPos.x,anthroPos.y);ctx.lineTo(target.x,target.y);ctx.stroke();ctx.restore();
 ctx.strokeStyle='rgba(233,200,141,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(target.x,target.y,11+3*Math.sin(t*.003),0,Math.PI*2);ctx.stroke();ctx.fillStyle='#e9c88d';ctx.beginPath();ctx.arc(target.x,target.y,2.5,0,Math.PI*2);ctx.fill();
 if(obstacle){const x=w*.49,y=(h*.65+target.y)/2;ctx.fillStyle='rgba(238,158,148,.08)';ctx.strokeStyle='rgba(238,158,148,.55)';ctx.beginPath();ctx.roundRect(x-9,y-65,18,130,5);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(238,158,148,.7)';ctx.font='9px ui-monospace,monospace';ctx.fillText('PAUSE',x-17,y-76)}
 ctx.save();ctx.translate(anthroPos.x,anthroPos.y);ctx.rotate(angle);ctx.shadowColor='#e9c88d';ctx.shadowBlur=22;ctx.fillStyle='rgba(233,200,141,.08)';ctx.strokeStyle='#e9c88d';ctx.lineWidth=1.2;blob(ctx,0,0,43,t,0);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(34,0);ctx.stroke();ctx.fillStyle='#e9c88d';ctx.beginPath();ctx.arc(35,0,2.2,0,Math.PI*2);ctx.fill();ctx.restore();
 $('#anthroState').textContent=state;
});
if(anthro){
 const move=e=>{anthroTarget={x:pointer(anthro,e).x/anthro.w,y:pointer(anthro,e).y/anthro.h};if(reduced()&&anthroMode==='notice')anthroPos={x:anthroTarget.x*anthro.w,y:anthroTarget.y*anthro.h};anthro.dirty=true};
 anthro.canvas.addEventListener('pointermove',move);anthro.canvas.addEventListener('pointerdown',move);
 $$('[data-anthro]').forEach(b=>b.addEventListener('click',()=>{anthroMode=b.dataset.anthro;anthroPos=null;setButtons('[data-anthro]',b);anthro.dirty=true}));
}

const BREATHS=[
 {n:'平',full:'平气',hint:'从容和缓 · 节律均匀',rate:16,amp:1,inh:.42},{n:'深',full:'深息',hint:'深缓绵长 · 幅度较大',rate:8,amp:1.26,inh:.46},{n:'浅',full:'浅息',hint:'表浅 · 起伏甚微',rate:22,amp:.5,inh:.4},{n:'粗',full:'气粗',hint:'息涌 · 起伏有力',rate:20,amp:1.18,inh:.38},{n:'微',full:'少气',hint:'低微 · 起伏收束',rate:12,amp:.3,inh:.42},{n:'喘',full:'喘促',hint:'短促急迫 · 视觉变体',rate:28,amp:.85,inh:.32,rough:.22},{n:'哮',full:'哮鸣',hint:'呼气延长 · 视觉变体',rate:20,amp:.8,inh:.22},{n:'短',full:'短气',hint:'气急而短 · 视觉变体',rate:32,amp:.55,inh:.3},{n:'叹',full:'太息',hint:'四息一叹 · 视觉变体',rate:14,amp:.95,inh:.4,sigh:{amp:1.7,len:1.45}}
];
const pulseNames=['浮','沉','迟','数','滑','涩','虚','实','长','短','洪','微','紧','缓','芤','弦','革','牢','濡','弱','散','细','伏','动','促','结','代','疾'];
const pulseRates=[72,70,46,108,80,62,68,78,64,76,88,60,84,58,74,76,72,66,70,64,68,72,58,96,106,54,66,134];
const PULSES=pulseNames.map((n,i)=>({n,rate:pulseRates[i],amp:[1.12,.5,1,.95,1.05,.8,.38,1.25,1.05,.9,1.35,.2,1.05,.95,1.1,1.1,1,1.15,.5,.32,.8,.45,.12,1,1,1,1,.9][i],rough:i===5?.45:0,hollow:[14,16].includes(i),scat:i===20,skip:i>=24&&i<=26?{c:i===26?4:8,s:i===26?[3]:[3,6]}:null}));
function shapeAt(x,sh={}){const rise=sh.rise||.11,sus=sh.sustain||0,dec=sh.decay||.5;let v=0;if(x<rise){const u=x/rise;v=sh.round?u*u*(3-2*u):Math.pow(u,.65)}else if(x<rise+sus)v=1;else{const u=(x-rise-sus)/dec;if(u>=0&&u<1){v=1-u;if(sh.hollow)v*=1-.8*Math.exp(-Math.pow((u-.3)/.13,2));else v+=.15*Math.exp(-Math.pow((u-.42)/.15,2));v=Math.max(0,v)}}if(sh.rough)v*=Math.max(.3,1+sh.rough*.6*Math.sin(x*29));return v}
function pulseCycle(p,rate){
 const D=60/rate,ev=[];let C;
 if(p.scat){
  const jit=[0,.35,-.2,.5,-.3,.25,-.15],amps=[.7,.3,.9,.2,.55,.35,.18];let at=0;
  for(let i=0;i<jit.length;i++){ev.push({t:at,a:p.amp*amps[i]});at+=D*(1+jit[i])}
  C=at+D*.5;
 }else{
  const count=p.skip?p.skip.c:4;
  for(let i=0;i<count;i++)if(!p.skip?.s.includes(i))ev.push({t:i*D,a:p.amp});
  C=count*D;
 }
 const shape={decay:p.scat?.5:.42,rough:p.rough,hollow:p.hollow};
 return{C,wave(tm){let v=0;for(const e of ev){const x=(tm-e.t)/D;if(x>=0&&x<1)v+=e.a*shapeAt(x,shape)}return v},
  phaseAt(tm){const e=ev.findLast(e=>e.t<=tm),x=(tm-e.t)/D;return x<.11?0:x<.11+shape.decay?1:2}};
}
function breathCycle(b,rate){
 const D=60/rate,p=b.inh,C=D*(b.sigh?3+b.sigh.len:1);
 const phase=(tm)=>{const last=!!b.sigh&&tm>=D*3;return{last,x:last?(tm-3*D)/(D*b.sigh.len):(tm%D)/D}};
 return{C,wave(tm){const {last,x}=phase(tm);let s=x<p?Math.sin(x/p*Math.PI/2):Math.cos((x-p)/(1-p)*Math.PI/2);if(b.rough)s*=1-b.rough/2+b.rough*Math.abs(Math.sin(x*26));return b.amp*(last?b.sigh.amp:1)*s},
  phaseAt(tm){return phase(tm).x<p?0:1}};
}
function simpleCycle(mode,rate){
 const D=60/rate;
 if(mode==='heart')return{C:D,wave(tm){const x=tm/D;return Math.exp(-Math.pow((x-.1)/.045,2))+.58*Math.exp(-Math.pow((x-.32)/.065,2))},phaseAt(tm){return tm<D*.22?0:tm<D*.5?1:2}};
 if(mode==='gait'){
  const shape={rise:.07,decay:.36};
  return{C:2*D,wave(tm){return(tm<D?1.1:.88)*shapeAt((tm%D)/D,shape)},phaseAt(tm){return tm%D>=D*(shape.rise+shape.decay)?2:tm<D?0:1}};
 }
 if(mode==='tide'){
  const p=.3;
  return{C:D,wave(tm){const x=tm/D;let v=x<p?Math.sin(x/p*Math.PI/2):Math.cos((x-p)/(1-p)*Math.PI/2);if(x>=p)v+=.1*Math.sin((x-p)/(1-p)*Math.PI*3)*(1-x);return Math.max(0,v*1.2)},phaseAt(tm){return tm<D*p?0:tm<D*.72?1:2}};
 }
 const fd=D*.11,second=fd*1.5,shape={rise:.2,decay:.6,round:1},lit=fd*(shape.rise+shape.decay);
 return{C:D,wave(tm){return (tm<second?1.3:.95)*shapeAt((tm<second?tm:tm-second)/fd,shape)},phaseAt(tm){return tm<lit?0:tm>=second&&tm<second+lit?1:2}};
}
const rhythmMeta={
 heart:{code:'01 / HEART',name:'心跳 · 双峰',hint:'主峰推开内层，次峰沿外缘回响',unit:'BPM',range:[48,66,100],tags:['主峰','次峰','间歇'],tone:'#88d8ce',rgb:'136,216,206',lobes:3,flat:.82,drift:.10},
 breath:{code:'02 / BREATH',name:'呼吸',unit:'次/分',range:[6,16,32],tags:['吸入','呼出'],tone:'#b8dfb2',rgb:'184,223,178',lobes:2,flat:1,drift:.10},
 pulse:{code:'03 / PULSE',name:'脉象',hint:'窄促起伏像切片；部分变体在波形中留下空拍',unit:'次/分',range:[42,72,134],tags:['起脉','回落','间歇'],tone:'#d6b8eb',rgb:'214,184,235',lobes:5,flat:.70,drift:.07},
 gait:{code:'04 / GAIT',name:'步态 · 交替',hint:'左右落点交替加重，中间保留离地的空隙',unit:'步/分',range:[60,96,160],tags:['左足','右足','空隙'],tone:'#ebc58b',rgb:'235,197,139',lobes:2,flat:.70,drift:.14},
 tide:{code:'05 / TIDE',name:'潮汐 · 长波',hint:'潮来急，潮退缓，层层余涟向外移动',unit:'涌/分',range:[3,6,12],tags:['涨潮','退潮','余涟'],tone:'#97bdf4',rgb:'151,189,244',lobes:3,flat:.57,drift:.22},
 fire:{code:'06 / FIREFLY',name:'萤火 · 双闪',hint:'两次亮起算一组，暗处仍留一点余光',unit:'组/分',range:[8,14,26],tags:['初闪','次闪','暗歇'],tone:'#e9da8e',rgb:'233,218,142',lobes:5,flat:.87,drift:.16}
};
const rhythmRateInput=$('#rhythmRate'),rhythmStage=$('.rhythm-stage'),rhythmPhases=$('#rhythmPhases');
const rhythmSources=$$('[data-rhythm]'),rhythmSpeeds=$$('[data-speed]',rhythmStage);
const rhythmSamples=384,rhythmTau=2*Math.PI;
const rhythmAngles=Array.from({length:97},(_,i)=>i/96*rhythmTau);
const rhythmSeeds=Array.from({length:98},(_,i)=>({a:i*2.39996,r:.62+((i*37)%101)/112,d:(i%13)*.013,k:(i%7)/6}));
let rhythmMode='heart',rhythmRate=66,breathIndex=0,pulseIndex=0,rhythmCycle,rhythmWave,rhythmPeak;
let rhythmPhase=0,rhythmLast=null,rhythmActive=-1,rhythmStill=null;
function updateRhythmRate(){
 const m=rhythmMeta[rhythmMode];
 rhythmCycle=rhythmMode==='breath'?breathCycle(BREATHS[breathIndex],rhythmRate):rhythmMode==='pulse'?pulseCycle(PULSES[pulseIndex],rhythmRate):simpleCycle(rhythmMode,rhythmRate);
 rhythmWave=Array.from({length:rhythmSamples+1},(_,i)=>rhythmCycle.wave(i/rhythmSamples*rhythmCycle.C));
 rhythmPeak=rhythmWave.indexOf(Math.max(...rhythmWave))/rhythmSamples;
 const speed=m.range.reduce((best,n,i)=>Math.abs(n-rhythmRate)<Math.abs(m.range[best]-rhythmRate)?i:best,0);
 rhythmSpeeds.forEach((b,i)=>{
  const label=b.textContent;
  b.dataset.active=String(i===speed);
  b.title=`${label} · ${m.range[i]} ${m.unit}`;
  b.setAttribute('aria-label',b.title);
 });
 const value=`${rhythmRate} ${m.unit}`;
 $('#rhythmRateOut').textContent=value;
 rhythmRateInput.setAttribute('aria-valuetext',`${value}，${rhythmSpeeds[speed].textContent}`);
 $('#rhythmCycleOut').textContent=`${rhythmCycle.C.toFixed(2)} s`;
 rhythm.dirty=true;
}
function setRhythm(mode){
 rhythmMode=mode;rhythmPhase=0;rhythmLast=null;rhythmActive=-1;
 const m=rhythmMeta[mode],b=BREATHS[breathIndex],p=PULSES[pulseIndex];
 rhythmRateInput.min=m.range[0];rhythmRateInput.max=m.range[2];
 rhythmRate=mode==='breath'?b.rate:mode==='pulse'?p.rate:m.range[1];
 rhythmRateInput.value=rhythmRate;
 rhythmStage.style.setProperty('--rhythm-tone',m.tone);
 $('#rhythmCode').textContent=m.code;
 $('#rhythmName').textContent=m.name+(mode==='breath'?` · ${b.full}`:mode==='pulse'?` · ${p.n}脉`:'');
 rhythmPhases.replaceChildren(...m.tags.map(tag=>{const li=document.createElement('li');li.textContent=tag;return li}));
 rhythmStill=null;
 rhythmSources.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rhythm===mode)));
 $$('#breathVariants button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===breathIndex&&mode==='breath')));
 $$('#pulseVariants button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===pulseIndex&&mode==='pulse')));
 updateRhythmRate();
}
$('#breathVariants').innerHTML=BREATHS.map((b,i)=>`<button type="button" data-breath="${i}" aria-pressed="false" title="${b.full} · ${b.hint}">${b.n}</button>`).join('');
$('#pulseVariants').innerHTML=PULSES.map((p,i)=>`<button type="button" data-pulse="${i}" aria-pressed="false" title="${p.n}脉 · 来源中的传统文化标签，仅作视觉变体">${p.n}</button>`).join('');
rhythmSources.forEach(b=>{
 b.style.setProperty('--source-tone',rhythmMeta[b.dataset.rhythm].tone);
 b.addEventListener('click',()=>{if(b.dataset.rhythm!==rhythmMode)setRhythm(b.dataset.rhythm)});
});
rhythmRateInput.addEventListener('input',()=>{rhythmRate=rhythmRateInput.valueAsNumber;updateRhythmRate()});
rhythmSpeeds.forEach((b,i)=>b.addEventListener('click',()=>{rhythmRate=rhythmMeta[rhythmMode].range[i];rhythmRateInput.value=rhythmRate;updateRhythmRate()}));
$$('[data-breath]').forEach(b=>b.addEventListener('click',()=>{breathIndex=+b.dataset.breath;setRhythm('breath')}));
$$('[data-pulse]').forEach(b=>b.addEventListener('click',()=>{pulseIndex=+b.dataset.pulse;setRhythm('pulse')}));
function drawRhythm(v,t){
 const {ctx,w,h}=v,m=rhythmMeta[rhythmMode],cy=rhythmCycle,still=reduced();
 if(!still&&rhythmLast!==null&&t-rhythmLast<200)rhythmPhase=(rhythmPhase+(t-rhythmLast)/(1000*cy.C))%1;
 rhythmLast=still?null:t;
 const phase=still?rhythmPeak:rhythmPhase,tm=phase*cy.C,val=cy.wave(tm),step=cy.phaseAt(tm);
 if(step!==rhythmActive){
  [...rhythmPhases.children].forEach((li,i)=>li.dataset.active=String(i===step));
  rhythmActive=step;
 }
 if(still!==rhythmStill){
  $('#rhythmState').textContent=(still?'静态峰值 · ':'')+(m.hint||BREATHS[breathIndex].hint);
  rhythmStill=still;
 }
 const tint=a=>`rgba(${m.rgb},${a})`,signal=d=>cy.wave((phase+1-d)%1*cy.C);
 const fieldH=h*.75,cx=w/2,cy0=fieldH*.49,r=Math.min(w*.24,fieldH*.33);
 const side=rhythmMode==='gait'?(phase<.5?-1:1)*val:0;
 ctx.fillStyle='#070c0a';ctx.fillRect(0,0,w,h);
 ctx.save();ctx.beginPath();ctx.rect(0,0,w,fieldH);ctx.clip();
 ctx.fillStyle=tint(.12);
 for(let y=13;y<fieldH;y+=24)for(let x=12;x<w;x+=24)ctx.fillRect(x,y,1,1);
 ctx.beginPath();ctx.moveTo(cx,10);ctx.lineTo(cx,fieldH-10);ctx.moveTo(12,cy0);ctx.lineTo(w-12,cy0);ctx.strokeStyle=tint(.11);ctx.lineWidth=1;ctx.stroke();
 const halo=ctx.createRadialGradient(cx,cy0,0,cx,cy0,r*2.2);
 halo.addColorStop(0,tint(.11+val*.07));halo.addColorStop(.55,tint(.038+val*.024));halo.addColorStop(1,tint(0));
 ctx.fillStyle=halo;ctx.fillRect(0,0,w,fieldH);
 for(let j=11;j>=0;j--){
  const level=j/11,response=signal(level*m.drift),radius=r*(.25+level*.77+response*(.10+level*.06));
  const offsetX=side*r*(.30-level*.12),twist=level*.58+response*.27;
  ctx.beginPath();
  rhythmAngles.forEach((a,i)=>{
   const rr=radius*(1+(.09+response*.04)*Math.cos(m.lobes*a+twist)+.055*Math.sin(3*a-twist*2));
   const x=cx+offsetX+Math.cos(a)*rr*(rhythmMode==='tide'?1.26:1);
   const y=cy0+Math.sin(a)*rr*(m.flat+(rhythmMode==='breath'?response*.13:0))+(rhythmMode==='tide'?Math.sin(2*a+twist)*r*.16:0);
   i?ctx.lineTo(x,y):ctx.moveTo(x,y);
  });
  ctx.closePath();
  const edge=j===11||j===0;
  if(j===11){ctx.fillStyle=tint(.035+response*.045);ctx.fill()}
  ctx.strokeStyle=tint((edge?.35:.13)+response*(edge?.30:.20));ctx.lineWidth=edge?1.15:.75;ctx.stroke();
 }
 const particleReach=Math.min(1.7,(w/2-8)/r);
 for(const s of rhythmSeeds){
  const glow=signal(s.d),angle=s.a+glow*.23,dist=r*Math.min(particleReach,s.r+glow*.13);
  const x=cx+Math.cos(angle)*dist+side*r*.12,y=cy0+Math.sin(angle)*dist*m.flat;
  ctx.fillStyle=tint(.14+s.k*.18+glow*(rhythmMode==='fire'?.49:.27));
  ctx.beginPath();ctx.arc(x,y,.55+s.k*.8+glow*.66,0,rhythmTau);ctx.fill();
 }
 ctx.restore();

 const x0=9,x1=w-9,span=x1-x0,top=fieldH+5,base=h-19,amp=(base-top)/1.7;
 if(span<=0||amp<=0)return;
 ctx.strokeStyle=tint(.16);ctx.lineWidth=1;ctx.beginPath();
 for(let i=0;i<=8;i++){const x=x0+span*i/8;ctx.moveTo(x,top);ctx.lineTo(x,base)}
 ctx.moveTo(x0,base);ctx.lineTo(x1,base);ctx.stroke();
 ctx.beginPath();
 rhythmWave.forEach((n,i)=>{const x=x0+span*i/rhythmSamples,y=base-n*amp;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
 const px=x0+span*phase,py=base-val*amp;
 const stroke=ctx.createLinearGradient(x0,0,x1,0);
 stroke.addColorStop(0,tint(.87));stroke.addColorStop(phase,tint(.87));stroke.addColorStop(phase,tint(.40));stroke.addColorStop(1,tint(.40));
 ctx.strokeStyle=stroke;ctx.lineWidth=1.45;ctx.stroke();
 ctx.lineTo(x1,base);ctx.lineTo(x0,base);ctx.closePath();
 const wash=ctx.createLinearGradient(0,top,0,base);wash.addColorStop(0,tint(.18));wash.addColorStop(1,tint(.025));ctx.fillStyle=wash;ctx.fill();
 ctx.fillStyle=tint(.48);ctx.fillRect(px,top,1,base-top);
 ctx.beginPath();ctx.arc(px,py,3.1,0,rhythmTau);ctx.fillStyle='#edf2e9';ctx.fill();
 ctx.font='9px ui-monospace,monospace';ctx.fillStyle='#a0aea4';ctx.textAlign='left';ctx.fillText('0 s',x0,h-5);
 ctx.textAlign='right';ctx.fillText(`${cy.C.toFixed(2)} s`,x1,h-5);ctx.textAlign='left';
}
const rhythm=view('rhythmCanvas',drawRhythm);
setRhythm('heart');

let dailyMode='grow',dailyPointer={x:.5,y:.5},blooms=[];
const dailySeeds=Array.from({length:92},(_,i)=>({x:((i*47)%97)/97,y:((i*71)%89)/89,p:i*.77,s:.5+(i%7)/7}));
const daily=view('dailyCanvas',(v,t)=>{
 const {ctx,w,h}=v;background(ctx,w,h);const px=dailyPointer.x*w,py=dailyPointer.y*h;
 if(dailyMode==='grow'){
  dailySeeds.forEach(s=>{const x=s.x*w+Math.sin(t*.00018+s.p)*8,y=s.y*h+Math.cos(t*.00014+s.p)*6;ctx.fillStyle='rgba(184,241,207,.16)';ctx.beginPath();ctx.arc(x,y,1.2,0,Math.PI*2);ctx.fill()});
  blooms=blooms.filter(b=>t-b.t<6500);blooms.forEach(b=>{for(let i=0;i<13;i++){const a=i/13*Math.PI*2+i*.8,d=18+(i%5)*22,k=clamp((t-b.t-i*70)/1800,0,1),x=b.x+Math.cos(a)*d*k,y=b.y+Math.sin(a)*d*k,rr=3+(i%4)*2;ctx.strokeStyle=`rgba(184,241,207,${.65*(1-k*.45)})`;ctx.beginPath();ctx.arc(x,y,rr*k,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(x,y);ctx.strokeStyle='rgba(184,241,207,.1)';ctx.stroke()}});
 }else if(dailyMode==='flow'){
  const pts=dailySeeds.map(s=>{let x=(s.x*w+Math.sin(t*.00022+s.p)*55+w)%w,y=(s.y*h+Math.cos(t*.00017+s.p)*45+h)%h,dx=x-px,dy=y-py,d=Math.hypot(dx,dy)||1;if(d<140){x+=dx/d*(140-d)*.65;y+=dy/d*(140-d)*.65}return{x,y,s}});pts.forEach((p,i)=>{for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<65){ctx.strokeStyle=`rgba(184,241,207,${(1-d/65)*.12})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}ctx.fillStyle=`rgba(184,241,207,${.25+p.s.s*.4})`;ctx.beginPath();ctx.arc(p.x,p.y,1+p.s.s*1.7,0,Math.PI*2);ctx.fill()});
 }else{
  for(let j=0;j<7;j++){ctx.strokeStyle=`rgba(184,241,207,${.08+j*.045})`;ctx.lineWidth=1;blob(ctx,px,py,35+j*24,t*(j%2?1:-1),j*.7);ctx.stroke()}dailySeeds.slice(0,52).forEach(s=>{const x=s.x*w,y=s.y*h,d=Math.hypot(x-px,y-py),a=clamp(1-d/280,0,1);ctx.fillStyle=`rgba(184,241,207,${a*.65})`;ctx.fillRect(x-3,y-3,6,6)});
 }
 ctx.strokeStyle='rgba(184,241,207,.55)';ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.stroke();
});
if(daily){
 const move=e=>{const p=pointer(daily,e);dailyPointer={x:p.x/daily.w,y:p.y/daily.h};daily.dirty=true};daily.canvas.addEventListener('pointermove',move);daily.canvas.addEventListener('pointerdown',e=>{move(e);if(dailyMode==='grow'){const p=pointer(daily,e);blooms.push({x:p.x,y:p.y,t:performance.now()});if(blooms.length>8)blooms.shift()}});
 $$('[data-daily]').forEach(b=>b.addEventListener('click',()=>{dailyMode=b.dataset.daily;setButtons('[data-daily]',b);$('#dailyState').textContent={grow:'GROW · 从触点向邻域生长',flow:'FLOW · 连续速度场与局部聚散',reveal:'REVEAL · 保留轮廓的局部显隐'}[dailyMode];daily.dirty=true}));
}

let relationMode='turn',relationStrokes=[],relationCurrent=null,relationPartner=null,relationId=0;
const relation=view('relationCanvas',(v,t)=>{
 const {ctx,w,h}=v;background(ctx,w,h);ctx.font='9px ui-monospace,monospace';ctx.fillStyle='rgba(200,178,231,.7)';ctx.fillText('YOU / 你的笔迹',18,28);ctx.fillStyle='rgba(233,200,141,.7)';ctx.textAlign='right';ctx.fillText('OTHER / 接续笔迹',w-18,28);ctx.textAlign='left';
 const drawStroke=(s,now)=>{if(!s.points.length)return;const progress=s.born&&!reduced()?clamp((now-s.born)/700,0,1):1,n=Math.max(1,Math.ceil(s.points.length*progress));ctx.strokeStyle=s.color;ctx.lineWidth=s.partner?2:2.4;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor=s.color;ctx.shadowBlur=7;ctx.beginPath();s.points.slice(0,n).forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.shadowBlur=0;const p=s.points[Math.min(n-1,s.points.length-1)];ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill()};
 relationStrokes.forEach(s=>drawStroke(s,t));if(relationCurrent)drawStroke(relationCurrent,t);if(relationPartner)drawStroke(relationPartner,t);
});
function relationRespond(){if(relationMode==='wait'||!relationCurrent||relationCurrent.points.length<2){$('#relationState').textContent='WAIT · 不回应也保持完整';return}const pts=relationCurrent.points,last=pts[pts.length-1],prev=pts[pts.length-2],a=Math.atan2(last.y-prev.y,last.x-prev.x),out=[];for(let i=0;i<18;i++){const d=i*8,outA=a+Math.sin(i*.22)*.42;out.push({x:clamp(last.x+Math.cos(outA)*d,12,relation.w-12),y:clamp(last.y+Math.sin(outA)*d+Math.sin(i*.28)*12,42,relation.h-30)})}relationPartner={points:out,color:'rgba(233,200,141,.88)',partner:true,born:performance.now()+(relationMode==='turn'?420:0)};relationStrokes.push(relationCurrent,relationPartner);relationCurrent=null;relationPartner=null;$('#relationState').textContent=relationMode==='turn'?'TURN · 另一主体承接上一笔':'OVERLAP · 同时回应可能争夺注意'}
function relationPoint(e){const p=pointer(relation,e);if(!relationCurrent)return;const pts=relationCurrent.points,last=pts[pts.length-1];if(!last||Math.hypot(p.x-last.x,p.y-last.y)>3){pts.push(p);if(relationMode==='overlap'&&pts.length%3===0){const echo={x:clamp(p.x+26,10,relation.w-10),y:clamp(p.y-18,35,relation.h-20)};if(!relationPartner)relationPartner={points:[],color:'rgba(233,200,141,.65)',partner:true,born:0};relationPartner.points.push(echo)}relation.dirty=true}}
relation.canvas.addEventListener('pointerdown',e=>{e.preventDefault();relation.canvas.setPointerCapture(e.pointerId);const p=pointer(relation,e);relationCurrent={points:[p],color:'rgba(200,178,231,.9)',partner:false,born:0};relationPartner=null;$('#relationState').textContent='LISTEN · 正在接收你的动作';relation.dirty=true});
relation.canvas.addEventListener('pointermove',e=>{if(relationCurrent)relationPoint(e)});relation.canvas.addEventListener('pointerup',relationRespond);relation.canvas.addEventListener('pointercancel',relationRespond);
$$('[data-relation]').forEach(b=>b.addEventListener('click',()=>{relationMode=b.dataset.relation;setButtons('[data-relation]',b);$('#relationState').textContent={turn:'TURN · 等待你的上一笔',overlap:'OVERLAP · 另一主体同步进入',wait:'WAIT · 不应答也保持完整'}[relationMode];relation.dirty=true}));
$('#relationClear').addEventListener('click',()=>{relationStrokes=[];relationCurrent=null;relationPartner=null;relation.dirty=true;$('#relationState').textContent='CLEARED · 共画已清空'});
relation.canvas.addEventListener('keydown',e=>{if(e.key!==' '&&e.key!=='Enter')return;e.preventDefault();relationCurrent={points:Array.from({length:16},(_,i)=>({x:relation.w*.22+i*relation.w*.025,y:relation.h*.55+Math.sin(i*.4)*22})),color:'rgba(200,178,231,.9)',partner:false,born:0};relationRespond();relation.dirty=true});

let timeMode='decay',timeStrokes=[],timeCurrent=null,timeDecay=12,timeReplay=null;
const time=view('timeCanvas',(v,t)=>{
 const {ctx,w,h}=v;background(ctx,w,h);const now=performance.now();let replayAge=null;
 if(timeReplay){const elapsed=now-timeReplay.start,last=timeStrokes.length?timeStrokes[timeStrokes.length-1].at-timeReplay.origin:0;replayAge=elapsed;if(elapsed>last+1800)timeReplay=null}
 const visible=s=>{if(replayAge!==null&&timeReplay)return replayAge-(s.at-timeReplay.origin)>=0;return timeMode==='persist'||now-s.at<timeDecay*1000};
 if(!timeReplay&&timeMode==='decay')timeStrokes=timeStrokes.filter(visible);
 const draw=s=>{if(!visible(s))return;let alpha=timeMode==='persist'?.78:timeReplay ? .85 : clamp(1-(now-s.at)/(timeDecay*1000),0,.85);if(reduced())alpha=Math.max(alpha,.22);ctx.strokeStyle=`rgba(165,201,232,${alpha})`;ctx.lineWidth=1.2+alpha*2;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();s.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.fillStyle=`rgba(165,201,232,${alpha*.65})`;s.points.filter((_,i)=>i%8===0).forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill()})};
 timeStrokes.forEach(draw);if(timeCurrent)draw(timeCurrent);
 ctx.strokeStyle='rgba(165,201,232,.15)';ctx.beginPath();ctx.moveTo(18,h-44);ctx.lineTo(w-18,h-44);ctx.stroke();timeStrokes.slice(-18).forEach((s,i,a)=>{const x=18+(a.length===1?0:i/(a.length-1))*(w-36);ctx.fillStyle='rgba(165,201,232,.55)';ctx.fillRect(x,h-47,1,6)});
 $('#timeCount').textContent=`${timeStrokes.length} 段动作 / ${timeStrokes.reduce((n,s)=>n+s.points.length,0)} 个触点`;
});
function timePoint(e){if(!timeCurrent)return;const p=pointer(time,e),last=timeCurrent.points[timeCurrent.points.length-1];if(Math.hypot(p.x-last.x,p.y-last.y)>3){timeCurrent.points.push(p);time.dirty=true}}
time.canvas.addEventListener('pointerdown',e=>{e.preventDefault();time.canvas.setPointerCapture(e.pointerId);timeReplay=null;timeCurrent={points:[pointer(time,e)],at:performance.now()};time.dirty=true});time.canvas.addEventListener('pointermove',timePoint);
function endTime(){if(!timeCurrent)return;if(timeCurrent.points.length>1)timeStrokes.push(timeCurrent);timeCurrent=null;time.dirty=true}
time.canvas.addEventListener('pointerup',endTime);time.canvas.addEventListener('pointercancel',endTime);
$$('[data-time]').forEach(b=>b.addEventListener('click',()=>{timeMode=b.dataset.time;setButtons('[data-time]',b);timeReplay=null;$('#timeState').textContent=timeMode==='decay'?`DECAY · 余迹 ${timeDecay} 秒`:'PERSIST · 动作持续累积';time.dirty=true}));
$('#timeDecay').addEventListener('input',e=>{timeDecay=+e.target.value;$('#timeDecayOut').textContent=timeDecay+' s';if(timeMode==='decay')$('#timeState').textContent=`DECAY · 余迹 ${timeDecay} 秒`;time.dirty=true});
$('#timeReplay').addEventListener('click',()=>{if(!timeStrokes.length){$('#timeState').textContent='REPLAY · 先留下一段动作';return}timeReplay={origin:timeStrokes[0].at,start:performance.now()};$('#timeState').textContent='REPLAY · 只重放真实发生过的动作';time.dirty=true});
$('#timeClear').addEventListener('click',()=>{timeStrokes=[];timeCurrent=null;timeReplay=null;$('#timeState').textContent='CLEARED · 痕迹已清除';time.dirty=true});
time.canvas.addEventListener('keydown',e=>{if(e.key!==' '&&e.key!=='Enter')return;e.preventDefault();timeStrokes.push({at:performance.now(),points:Array.from({length:18},(_,i)=>({x:time.w*.2+i*time.w*.025,y:time.h*.5+Math.sin(i*.45)*25}))});time.dirty=true});

function tick(t){if(!document.hidden)views.forEach(v=>{if(v.visible&&(!reduced()||v.dirty)){v.draw(v,t);v.dirty=false}});requestAnimationFrame(tick)}
function wake(){views.forEach(v=>v.dirty=true)}
$('#motionToggle')?.addEventListener('click',wake);if(motionQuery.addEventListener)motionQuery.addEventListener('change',wake);
requestAnimationFrame(tick);
})();
