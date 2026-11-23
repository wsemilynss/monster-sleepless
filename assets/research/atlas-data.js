(()=>{
'use strict';
const CATEGORIES=[
 {id:'anthro',no:'01',name:'拟人化与万物有灵',short:'拟人',en:'AGENCY & CHARACTER',color:'#e8c68c',statement:'动作有对象，反馈有性格。',description:'从一次朝向、一顿、一次恢复开始，观察抽象对象如何获得意图与个性；脸和语言都不是前提。',subthemes:[
  {id:'minimal',name:'极简的响应',en:'MINIMAL RESPONSE',description:'用尽量少的运动表达注意、靠近与停顿，让“大智若愚”的笨拙成为可读的性格。',algorithms:['attention','steering']},
  {id:'feedback',name:'生动的反馈',en:'EXPRESSIVE FEEDBACK',description:'精炼输入驱动丰富但连贯的身体反馈，重心、朝向和恢复共同建立操偶般的因果关系。',algorithms:['spring','fabrik']},
  {id:'character',name:'有趣的灵魂',en:'PLAYFUL CHARACTER',description:'好奇、胜负欲、傲娇与探索欲不依赖复杂外形，而由持续的行为偏好和小小的无用之事显现。',algorithms:['wander','attention']}
 ]},
 {id:'bio',no:'02',name:'生物与身体本源',short:'生物身体',en:'BODY & MORPHOGENESIS',color:'#7bd9d0',statement:'形态在生长，信息有节律。',description:'从微观形态、生命周期与多重信息映射中提炼时间结构，不把随机运动或粒子数量直接等同于生命。',subthemes:[
  {id:'micro',name:'微观形态创生',en:'MORPHOGENESIS',description:'以显微与微距观察为参照，通过局部反应、分枝、分合与形变形成生态美学。',algorithms:['reaction','growth']},
  {id:'cycle',name:'生命周期重组',en:'LIFE CYCLES',description:'把花开、月相、游动与收缩组织成阶段和循环；周期可以被拉伸、错相与重新编排。',algorithms:['homeostasis','oscillator']},
  {id:'mapping',name:'信息多重映射',en:'MULTIPLE MAPPING',description:'让不同个体或不同时刻的信息进入矩阵、蜂巢和群体，保持个体差异与整体格式塔。',algorithms:['kuramoto','boids']}
 ]},
 {id:'daily',no:'03',name:'日常审美与瞬间',short:'日常瞬间',en:'MATTER & MOMENT',color:'#b6e3bd',statement:'让熟悉之物，露出陌生的一刻。',description:'关注流动、阻尼、材质与空间重组，在界面和日常物件中发现轻微、短暂却可感的变化。',subthemes:[
  {id:'physical',name:'物理观测转译',en:'PHYSICAL TRANSLATION',description:'把流动、聚合、回弹、阻尼和节律转成可读的物理引擎，而不是统一的漂浮动画。',algorithms:['curl','material']},
  {id:'material',name:'物件材质衍生',en:'MATERIAL BEHAVIOUR',description:'从纸、墨、光、织物与工业材料中提取触感，让色彩、材料与表面处理呈现柔性行为。',algorithms:['material','spring']},
  {id:'spatial',name:'空间结构重组',en:'SPATIAL REFRAMING',description:'通过解构、层叠、漫游与立体相册改变观看位置，在稳定空间骨架中组织显隐和层次。',algorithms:['pbd','lsystem']}
 ]},
 {id:'relation',no:'04',name:'关系与共情',short:'关系共情',en:'RELATION & EMPATHY',color:'#cab7ed',statement:'回应不是回答，是承接。',description:'关系发生在对弈、等待、共同注意和声画对位中；可靠陪伴需要连续，也需要允许沉默与退出。',subthemes:[
  {id:'play',name:'对弈协作',en:'PLAY & CO-CREATION',description:'从一问一答转向有来有往的共同创作，不同主体保留差异，也能接续彼此的动作。',algorithms:['turns','boids']},
  {id:'audiovisual',name:'声画联动',en:'AUDIOVISUAL RESPONSE',description:'听见时改变姿态，发声时形成动作，声音的起止、停顿和视觉状态共享同一时间基准。',algorithms:['oscillator','turns']},
  {id:'companionship',name:'忠诚陪伴',en:'STEADY COMPANIONSHIP',description:'安全感来自稳定、可预期和不过度索取注意的存在，而不是持续讨好或永久在线的承诺。',algorithms:['homeostasis','attention']}
 ]},
 {id:'time',no:'05',name:'时间与痕迹',short:'时间痕迹',en:'TIME & TRACE',color:'#9fc4e9',statement:'发生过的事，仍在此刻。',description:'轨迹可以展开，效率可以放慢，变化可以加速；保留什么、如何衰减与何时清除共同构成时间体验。',subthemes:[
  {id:'trajectory',name:'被展开的轨迹',en:'UNFOLDED TRAJECTORIES',description:'把行为过程同时呈现在画面中，让路径、次序与重复累积成为可以直接观看的历史。',algorithms:['memory','pheromone']},
  {id:'slowness',name:'被降低的效率',en:'DELIBERATE SLOWNESS',description:'让劳作、等待和反复尝试重新进入体验，以低效率表达坚持、重量和独特个性。',algorithms:['memory','homeostasis']},
  {id:'acceleration',name:'被加速的变幻',en:'ACCELERATED CHANGE',description:'压缩长时间的变化或快速切换风格，同时保留可辨认的轮廓与阶段关系。',algorithms:['genetic','noise']}
 ]}
];
const CATEGORY_MAP=Object.fromEntries(CATEGORIES.map(c=>[c.id,c]));
const SUBTHEME_MAP={};CATEGORIES.forEach(c=>c.subthemes.forEach(s=>SUBTHEME_MAP[s.id]={...s,tag:c.id}));
const PPT_PATH='生命感研究/生命感研究案例与分析.pptx';
const ppt=(id,tag,subtheme,title,n,slide,keyword,facts,potential,credit='',external='',status='PPT 作品与视觉档案',algorithm='')=>{
 const ext=[31,32,33,37,38,39,50].includes(n)?'.jpeg':n===51?'.png':'.GIF';
 return{id:'ppt-'+id,tag,subtheme,title,credit,year:'',keyword,keywords:[keyword],media:`assets/research/cases/image${n}${ext}`,poster:`assets/research/cases/case-${n}.jpg`,stills:[`assets/research/cases/case-${n}.jpg`],url:external||PPT_PATH,sourceLabel:external?'作品官方来源':'《生命感研究案例与分析》',sourceDetail:`原分类与媒体：PPT 第 ${slide} 页。${status}。`,sourcePpt:PPT_PATH,slide,description:facts,potential,algorithm:algorithm||SUBTHEME_MAP[subtheme].algorithms[0],verified:!status.includes('待补')};
};
const PPT_CASES=[
 ppt('snoopy','anthro','minimal','Snoopy 表盘',2,3,'情境','时间、天气与情境触发小动作，让角色像在参与日常。','表盘与桌面可在时间、天气或设备状态改变时出现一次轻量动作，随后回到安静。'),
 ppt('luxo','anthro','feedback','Luxo Jr.',3,3,'朝向','灯罩朝向、重心与停顿表达注意和情态，动作有先后。','消息到来先轻转朝向，再通过展开或回正给出反馈。','Pixar','', 'PPT 作品与视觉档案','steering'),
 ppt('borrow-mountain','anthro','character','借山',4,3,'轮廓','鱼形在墨色与材质中连续转化，熟悉姿态让变化保持可辨识。','状态转换保留核心轮廓，用形态与墨色表达变化，阅读时降低动效强度。','限象工作室 · 2024','','限象工作室原稿 / 视觉档案','genetic'),
 ppt('burn-e','anthro','feedback','BURN·E',5,4,'恢复','任务受阻后收回重心、停顿并重新尝试，目标保持连续。','操作受阻后保留恢复过程，为下一次尝试留出停顿。','Pixar','','PPT 作品与视觉档案','spring'),
 ppt('reds-dream','anthro','minimal','Red’s Dream',6,4,'平衡','轮子与车身反复微调，在失衡后逐步找回平衡。','拖偏对象后分次回正，用衰减摆动呈现恢复过程。','Pixar','','PPT 作品与视觉档案','homeostasis'),
 ppt('source-body','anthro','feedback','分身·源启',7,4,'赋形','身体动作映射为非人形态，比例改变后，方向与节奏仍延续人的表现力。','将手势映射为数字伙伴的伸展与转向，保留动作关联。','限象工作室 · 2019','','限象工作室原稿 / 视觉档案','fabrik'),
 ppt('pulse-room','bio','mapping','Pulse Room',8,5,'心跳','传感器读取参与者心率并点亮灯泡，释放后心跳记录进入灯列。','将可确认的身体节律映射为柔和脉冲，保持输入来源清楚。','Rafael Lozano-Hemmer · 2006','https://www.lozano-hemmer.com/pulse_room.php','PPT 作品与视觉档案','oscillator'),
 ppt('emotion-theatre','bio','mapping','情绪剧场',9,5,'内观','生理数据参与生成动态视觉场，环绕空间将身体状态转为可感氛围。','形成舒缓视觉回顾，允许用户解释自身感受，避免单值情绪判断。','','','PPT 案例记录 / 外部出处待补','field'),
 ppt('rosas','bio','cycle','Rosas danst Rosas',10,5,'变奏','坐姿动作在重复与变奏中形成节律，相似动作保留个体差异。','让重复反馈保留小幅节奏变化，避免每次动作完全相同。','Anne Teresa De Keersmaeker','','PPT 作品与视觉档案','oscillator'),
 ppt('kungfu','bio','mapping','客家功夫动态可视化',11,5,'发力','动作捕捉将武术轨迹转为线束与体积，重心、蓄势和回弹维持身体连续性。','手势速度、方向与力度映射到尾迹和形变，让起势、发力、收势形成连续反馈。','Tobias Gremmler · 2016','','PPT 作品与视觉档案','verlet'),
 ppt('glow','bio','micro','Glow',12,6,'邻域','身体动作与投影图形相互呼应，使运动关系在地面显现。','把身体位移映射为邻近区域的形变与扩散。','','','PPT 案例记录 / 外部出处待补','reaction'),
 ppt('pixel','bio','mapping','Pixel',13,6,'粒子','舞者进入粒子场，身体位移与图形流动形成空间呼应。','让动作邻域的粒子先响应，再向周围传递变化。','','','PPT 案例记录 / 外部出处待补','boids'),
 ppt('pattern','bio','mapping','Pattern Recognition',14,6,'错拍','响应灯光追踪双人舞者，身体方向与停顿成为人机呼应的可见线索。','将同向变化与少量错拍结合，让连续反馈具有呼应感。','','','PPT 案例记录 / 外部出处待补','kuramoto'),
 ppt('into-sun','bio','cycle','Into The Sun',15,6,'柔性','举臂、进入与摆动对应植物的展开和弯曲，形态保持柔性。','保留手势方向与开合关系，让末端稍后到达并缓慢回正。','','','PPT 案例记录 / 外部出处待补','verlet'),
 ppt('organisms','bio','micro','Artificial Organisms',16,7,'起伏','整体舒展与局部起伏并不同步，细小变化提示内部仍在活动。','待机保留轻微舒展，任务处理时增加局部流动。','','','PPT 案例记录 / 外部出处待补','growth'),
 ppt('volumes','bio','mapping','Volumes',17,7,'传播','局部脉冲沿密集球体表面传播，颜色与起伏保持连续。','让进度脉冲沿表面传递，以传播间隔区分状态。','','','PPT 案例记录 / 外部出处待补','reaction'),
 ppt('primordial','bio','micro','Primordial',18,7,'相位','相近运动规则错开相位，各单元保留转向与速度差异。','多点反馈使用相近节拍，保留少量速度差与相位差。','','','PPT 案例记录 / 外部出处待补','kuramoto'),
 ppt('transfinite','bio','mapping','The Transfinite',19,7,'频率','条带、明暗与音画节奏构成抽象频率和尺度变化。','将声音节拍对应到亮度与空间密度，建立清楚的音画关联。','Ryoji Ikeda / Forma','','PPT 作品与视觉档案','oscillator'),
 ppt('inform','bio','mapping','inFORM',20,8,'形变','身体动作改变可触摸表面，形变把动作与材料联系起来。','让触点带动局部起伏，反馈位置与手部动作保持一致。','MIT Tangible Media Group','','PPT 作品与视觉档案','pbd'),
 ppt('materiable','bio','micro','Materiable',21,8,'阻尼','弹性、黏滞与阻力通过不同运动和恢复规律呈现。','按任务设定回弹与阻尼，让数字材料有可辨识的手感。','MIT Tangible Media Group','','PPT 作品与视觉档案','spring'),
 ppt('haptographer','bio','mapping','Haptographer',22,8,'跨感官','触摸、声音与形变相互关联，反馈在不同感官之间延续。','让触碰强弱对应声音与形变，保持各通道变化一致。','MIT Tangible Media Group','','PPT 作品与视觉档案','material'),
 ppt('remarkable','bio','mapping','reMarkable Paper Pro',23,8,'笔迹','手写动作留下可追踪笔迹，笔端移动与画面变化连续对应。','保持笔尖与笔迹贴合，用连续反馈承接手部动作。','reMarkable','','PPT 作品与视觉档案','memory'),
 ppt('flowers','daily','physical','Flowers and People',24,9,'消长','花朵生长、开放与消逝形成持续变化的环境。','让系统背景随情境缓慢消长，保留可被偶然发现的变化。','teamLab','','PPT 作品与视觉档案','growth'),
 ppt('pool','daily','physical','The Pool',25,9,'光场','参与者活动改变圆形光单元，人与场地共同组成画面。','从接触区域开始反馈，再用邻近光点延续空间呼应。','Jen Lewin','','PPT 作品与视觉档案','field'),
 ppt('slow-dance','daily','physical','Slow Dance',26,9,'慢动','频闪与振动产生慢动作观感，熟悉物体显出柔缓而持续的运动。','以低频变化呈现闲置状态，让日常物件保持轻微活动感。','Wonder Machines','','PPT 作品与视觉档案','oscillator'),
 ppt('walk','daily','spatial','行',27,9,'点云','日常人物与环境成为流动点云，地点记忆在连续显现与重组中被重新观看。','将地点与个人经历关联，探索动态相册和叙事性滤镜。','限象工作室 · 2023','','限象工作室原稿 / 视觉档案','curl'),
 ppt('layers','daily','spatial','Layers',28,10,'层次','物体保持可辨识轮廓，内部色层沿边界逐层展开。','面板展开时保留原有轮廓，再沿边界显出下一层内容。','','','PPT 案例记录 / 外部出处待补','pbd'),
 ppt('elements','daily','physical','Elements',29,10,'离散','颗粒从边缘脱离，整体结构在连续瓦解中改变组织方式。','对象退出时先释放边缘，再带走主体，保留短暂方向感。','','','PPT 案例记录 / 外部出处待补','curl'),
 ppt('music-bottles','daily','material','MusicBottles',30,10,'开合','容器的开启与关闭控制声音，让日常动作获得听觉回应。','用开合状态控制声音的进入与退场，让反馈对应实际动作。','Hiroshi Ishii / MIT Tangible Media Group','','PPT 作品与视觉档案','material'),
 ppt('lanting','daily','material','兰亭序',31,11,'笔势','笔画方向、连断与疏密构成书写中的节奏和势。','按输入方向和速度生成笔迹，保留行气的连续感。','东晋 · 王羲之','','静态图谱 / 非原始运动','memory'),
 ppt('caisson','daily','spatial','敦煌藻井',32,11,'秩序','中心与外围的层级、重复和对称组织稳定的空间秩序。','按层级展开纹样单元，让界面变化保持中心与边界关系。','敦煌壁画','','静态图谱 / 非原始运动','lsystem'),
 ppt('glyph','daily','material','Dynamic Glyph Study',33,11,'递进','静态序列呈现笔画连接与字形递进，为有方向的变换提供参照。','状态切换保留关键笔画，让字形变化仍可辨认。','','','静态序列 / 非原始运动','genetic'),
 ppt('peach','daily','material','桃幻',34,12,'水墨','山形、墨色与花树持续聚散，把纸面空间转为随时间展开的画境。','内容展开采用层次递进的显隐与聚散，留白和缓慢过渡辅助焦点迁移。','限象工作室 × 丘挺 · 2022','','限象工作室原稿 / 视觉档案','curl'),
 ppt('eternal','daily','spatial','不朽之境',35,12,'游观','视点进入可游历的山水空间，山石层次与生灵运动协同展开。','以远近层次组织信息，位移与视差跟随输入，并保留稳定参照和退出入口。','杨泳梁；与 Monochrome 合作 · 2017','','PPT 作品与视觉档案','pbd'),
 ppt('pureland','daily','spatial','Pure Land 360',36,12,'在场','现代舞者表演进入数字敦煌壁画，以当代身体重新阐释古代乐舞。','分层呈现原图、研究性复原与表演解读，通过指向和聚焦逐步发现细节。','Jeffrey Shaw、Sarah Kenderdine','','PPT 作品与视觉档案','pbd'),
 ppt('canglang','daily','physical','自·沧浪亭',37,13,'水纹','观众手环数据生成个人水图，身体状态以水纹留下视觉线索。','把体征历程转为个人视觉日志，同时保留原始数值和数据来源。','','','PPT 案例记录 / 外部出处待补','curl'),
 ppt('threads-moon','daily','material','糸-朔望',38,13,'演化','原稿以线迹、刻痕和光影讨论同一生成规则在不同空间材料中的延展。','让节气与日常节律驱动疏密和光影，形成缓慢演化主题。','限象工作室 · 2026','','限象工作室原稿 / 设计设想','lsystem'),
 ppt('aiva','relation','companionship','AIVA Origin Concept',40,14,'身份','光眸与手势回应提供情境感知线索，身份延续是原稿设想。','让同一助手跨设备保留称呼、偏好和回应方式。','','','原稿设想 / 非已实施功能','homeostasis'),
 ppt('all-mirrors','relation','play','All Mirrors',41,14,'局部回应','镜面片层在服装表面局部转动，使静态穿着转为持续变化。','以局部变化回应对方动作，并让交流对象保持明确。','Ying Gao · 动态服装','','PPT 作品与视觉档案','turns'),
 ppt('threads-play','relation','play','糸：对弈与共创',42,14,'共创','参与者围绕共同画面移动与绘线，已有轨迹成为后续动作的条件。','跨设备接续触点或笔迹，让不同参与者看见彼此的行动与痕迹。','限象工作室 · 2021','','限象工作室原稿 / 视觉档案','turns'),
 ppt('melodic-echo','relation','audiovisual','AI 叙事音乐会',43,14,'轮流','机械臂动作与演员演唱交替，朝向、停顿和声音回应形成对话关系。','借倾听、等待和回应的节奏提示状态，允许打断与纠错。','限象工作室 × 上海评弹团 · 2024','','演出编排 / 非自由对话证明','turns'),
 ppt('obliteration','time','trajectory','The Obliteration Room',44,15,'累积','观众不断贴上彩色圆点，个人动作累积成共同痕迹，逐步改变空间。','让每次参与加入可追溯标记，使共同历史逐渐显现。','草间弥生 · 观众参与','','PPT 作品与视觉档案','memory'),
 ppt('threads','time','trajectory','糸',45,15,'织理','蚕丝运动启发不规则循环，线条持续叠加，使生成过程留下可见纹理。','将操作留成线迹，按使用历程逐渐织成纹理。','限象工作室 · 2021','','限象工作室原稿 / 视觉档案','lsystem'),
 ppt('healing-pool','time','slowness','Healing Pool',46,15,'残差','接触改变画面，结构随后重建并留下与之前不同的历史差异。','让触碰后的形态缓慢恢复，保留可辨认的局部残差。','','','PPT 案例记录 / 外部出处待补','homeostasis'),
 ppt('time-launch','time','slowness','Time Since Launch',47,16,'计时','特定起点开启持续计时，让过去事件始终影响当下读数。','为重要事件建立专属时间起点，呈现持续的相处历程。','','','PPT 案例记录 / 外部出处待补','memory'),
 ppt('slow-game','time','slowness','Slow Game',48,16,'等待','持续游戏状态与延迟变化降低操作频率，使等待成为体验。','将非紧急变化逐步显现，为观察与再次访问留出空间。','','','PPT 案例记录 / 外部出处待补','memory'),
 ppt('ink-portraits','time','acceleration','铜官感旧·水墨肖像',49,16,'显影','人物轮廓在水墨显隐中浮现，连续变化保留辨识线索，使墨迹呈现记忆感。','状态切换可短暂留痕，连接前后操作，事实文字与日期始终清晰。','限象工作室 · 2023','','限象工作室原稿 / 视觉档案','noise'),
 ppt('connect-transfer','time','trajectory','Connect Transfer',50,17,'余温','身体运动留下物理印记，动作结束后轨迹仍可被观看。','让关键操作留下方向与力度痕迹，使过程可以回看。','Shen Wei Dance Arts','','静态图谱 / 非原始运动','pheromone'),
 ppt('tablecloth','time','slowness','The History Tablecloth',51,17,'光晕','物件停留数小时使光晕逐渐扩大，移开后较快消退，显露使用历程。','让停留时长与光晕范围对应，移开后渐隐保留短暂使用线索。','Interaction Research Studio','','PPT 作品与视觉档案','memory')
];
const BASE='生命感研究/01.限像工作室作品视频2021-2026/',EXT='生命感研究/02.外部案例补充/';
const extra=(id,tag,subtheme,title,credit,keyword,description,potential,file,start,algorithm,sourceLabel='限象工作室过程影像')=>({id:'studio-'+id,tag,subtheme,title,credit,year:'',keyword,keywords:keyword.split(' / '),media:`assets/research/studio/${id}.gif`,poster:`assets/research/studio/${id}.jpg`,stills:[`assets/research/studio/${id}.jpg`],url:file,video:file,sourceLabel,sourceDetail:`本地视频切片：第 ${start} 秒起约 4 秒；GIF 与静帧均由同一原片生成。`,description,potential,algorithm,verified:true,supplement:true});
const STUDIO_CASES=[
 extra('avatar-living','anthro','feedback','分身·源启｜身体赋形现场','限象工作室 · 2019','操偶 / 身体映射 / 舞台','表演者的抬手、转向与屏幕中的线状非人形体形成可见的动势传递。数字形体不是预录贴图，而是身体动作的另一种轮廓。','可用于跨屏动作接续：手机或摄像头端提供姿态方向，大屏端延续同一动势；弱网时先传关键姿态而不是整段视频。',BASE+'分身系列/(EngSub Small)New Media Performance AvatarMythology 5mins documentary.mp4',75,'fabrik'),
 extra('fish-language','anthro','character','借山｜鱼形的视觉性格实验','限象工作室 · 图形学过程','轮廓 / 墨色 / 风格迁移','同一鱼形在写实、墨线、留白与抽象轮廓之间切换。变化虽快，朝向、尾鳍与身体比例仍维持“还是它”的辨识。','适合角色主题、系统天气或专注模式的连续变体；跨屏切换时保留朝向与运动相位，避免每台设备重新开始。',BASE+'齐白石/似鱼不似-鱼的图形学分析.mp4',2,'genetic'),
 extra('branch-texture','bio','micro','根枝｜枝干肌理生成测试','限象工作室 · Nature Ink','纹理 / 微形变 / 枝干','固定枝形内部持续出现细小肌理流动，变化发生在材料层而非整体位移，使静止轮廓仍有生成感。','可转译为图标、卡片与壁纸的低强度材质活性；按算力只更新局部纹理，不把整个界面变成运动背景。',BASE+'01. Nature Ink Series-parts test/00.枝干肌理动态参数测试.mp4',2,'noise'),
 extra('branch-light','bio','micro','根枝｜光感沿枝生长测试','限象工作室 · Nature Ink','光感 / 局部生长 / 路径','明暗沿枝干和分叉局部移动，细枝与主干的响应不同步，形成类似内部输送的空间方向。','可用于充电、传输与跨屏连接状态：光从来源设备流向目标设备，路径本身说明数据去向。',BASE+'01. Nature Ink Series-parts test/00.枝干光感变化生长测试.mp4',2,'lsystem'),
 extra('borrow-fish','bio','cycle','借山｜水墨游鱼','限象工作室 · 齐白石数字转译','游动 / 身体节律 / 留白','鱼身、尾鳍与水感墨迹共同形成缓慢游动；运动以身体中线和尾部延迟为主，而非全图统一漂移。','适合环境屏保和阅读休憩场景；可根据设备姿态改变游向，保持小幅度、可休息的非任务性存在。',BASE+'齐白石/Qibaishi fish.mp4',1,'verlet'),
 extra('peach-spirit','bio','cycle','桃灵｜砂粒聚散与显影','限象工作室 · Nature Ink','颗粒 / 聚散 / 显影','花树与空间在细砂般的颗粒中消失又浮现，形态由颗粒密度逐渐重组，而不是硬切两张图片。','可用于相册回顾、文件归档和跨屏内容移交；旧状态化为颗粒后在新位置重新聚合，保持内容连续性。',BASE+'01. Nature Ink Series-parts test/05.桃灵-砂 测试01.mov',0,'growth'),
 extra('bio-luxury','bio','micro','细胞分裂式品牌动态','外部补充影像 · 原作者待核','分裂 / 镶嵌 / 有机几何','小单元通过分裂和镶嵌构成更大的有机几何体，精密网格与柔软外形同时存在。','可转译为系统账号、设备群组与健康数据的模块化图形；数量增加时仍维持整体边界和单元身份。',EXT+'生物科技到奢侈品.mp4',1,'automata','外部补充视频 · 原链接待补'),
 extra('ink-flow','daily','physical','墨晕｜流动与吸收测试','限象工作室 · Nature Ink','流动 / 吸收 / 墨色','墨色的深浅边界持续推进与扩散，局部浓度变化比整体位移更重要，呈现纸面吸收般的物理过程。','可用于加载与导入过程，以浓度和湿润边缘表达进度；减弱动效时保留不同阶段的墨色静帧。',BASE+'01. Nature Ink Series-parts test/06. 墨晕 测试.mov',0,'reaction'),
 extra('peach-garden','daily','material','桃幻｜园林场域中的水墨呼吸','限象工作室 × 丘挺 · 2022','水墨 / 场域 / 层次','圆形水墨景窗与现场身体、反射地面共存，画作不再只是屏幕内容，而成为空间中的一层光。','适合手机到大屏的展览接续：手机保留个人视点，大屏维护共享山水层次，二者不复制同一个缩放画面。',BASE+'01. Nature Ink Series-parts test/03. 桃幻 园林版test.mp4',2,'material'),
 extra('walk-old-town','daily','spatial','行｜旧城点云漫游','限象工作室 · 2023','点云 / 旧城 / 游观','建筑与街巷被转成稀疏点云，视点移动让遮挡、间隙与地点轮廓重新组织。','可用于立体相册和地点记忆：手机选定路径，大屏展开空间；离线与低算力模式保留关键点的静态深度层。',BASE+'行/行-视频切片picked/02. old town.mp4',2,'pbd'),
 extra('time-slice','daily','material','时间切片｜真实材质与光影','杨淞 · 外部补充影像','切片 / 反射 / 光塑','实体切片、透明轮廓与移动光线交替显现人物姿态，材料的反射和遮挡本身构成动态。','可转译为玻璃、金属与透明系统材质的视点响应；避免只加高光，应让层次随观看方向真实改变。',EXT+'真实材质光影（杨淞《时间切片》）.mp4',2,'material','外部补充视频'),
 extra('spatial-web','daily','spatial','Shopify Editions｜网页空间排布','Shopify Editions · 屏幕录制','纵深 / 路径 / 信息地形','网页内容由平面列表转为有纵深的区域和路径，滚动成为穿越信息地形的动作。','适合系统级多任务与跨屏导航：设备、应用和任务按区域组织，迁移时保留路径与层级，而非只移动一个窗口。',EXT+'空间感排布的网页.mp4',2,'pbd','外部补充视频 · 屏幕录制'),
 extra('flat-space','daily','spatial','Shopify Editions｜从平面到空间','Shopify Editions · 手机录屏','层叠 / 封面 / 空间索引','封面卡片由平面堆叠展开成可选择的纵深序列，进入内容后仍保留来自哪一层的关系。','可用于手机应用、内容与设备的最近任务切换；返回时沿原路径收拢，减少空间跳跃。',EXT+'平面到空间感排列.mp4',0,'pbd','外部补充视频 · 手机录屏'),
 extra('light-volume','daily','spatial','光点立体阵列｜空间成像观察','外部补充影像 · 作品名待核','光点 / 体积 / 视差','密集光点在真实体积中形成立体轮廓，观看位置改变时，平面光点与空间身体之间的关系随之变化。','可启发跨屏空间身份：小屏呈现切片，大屏或眼镜呈现完整体积；用稳定锚点避免内容漂移。',EXT+'e667da50ba1c91433de09dbed812b9c6.mp4',0,'kuramoto','外部补充视频 · 作品信息待核'),
 extra('melodic-echo','relation','audiovisual','漫歌行｜演员与机械臂的声画对位','限象工作室 × 上海评弹团 · 2024','轮流 / 机械臂 / 评弹','演员的朝向与机械臂的运动在同一舞台构图里交替成为焦点，动作与演唱形成可见的问答。','可用于智慧助手和座舱交互：先倾听、再回应，回应期间允许被打断；跨屏时保持同一轮次与声画时间基准。',BASE+'漫歌行/Melodic Echo Odyssey .mp4',75,'turns'),
 extra('thread-chess','relation','play','糸｜对弈共创的线迹场','限象工作室 · 2021','共创 / 线迹 / 局部规则','细密线迹在共同画面中流动、缠绕并逐步形成整体纹理，局部运动与集体图案同时可见。','适合多设备共同绘画与批注：每笔带来源与顺序，合并冲突时保留差异，而不是覆盖成单一答案。',BASE+'糸-朔望/糸-对弈-声音设计.MP4',135,'turns'),
 extra('sound-lab','relation','audiovisual','Sound Lab｜声音成为可触形态','限象工作室 · 2019','声波 / 触觉 / 共振','声波不再只是频谱图，而与实体、水波、装置和表演动作互相转译，形成可触、可看、可听的事件。','可用于通知、来电与跨设备声场：手机显示声源方向，音箱与手表只补充对应通道，静音时保留等价形变。',BASE+'19 Soundlab Trailer.mp4',9,'material'),
 extra('fifteen-performance','relation','audiovisual','15度｜钢琴与数字印象','限象工作室 × 万捷旎 · 2021','演奏 / 生成 / 多模态','钢琴演奏与背后的数字花形、光色共同出现，视觉不遮蔽表演者，而在另一层延展乐句。','可用于音乐播放与跨屏演出：小屏提供章节和说明，大屏表现生成视觉，暂停、静音与退出共享同一状态。',BASE+'15度/15°纪录片字幕版 small 2.mp4',210,'oscillator'),
 extra('thread-infinity','time','trajectory','糸—Infinity｜细丝累积成网','限象工作室 · 2021','细丝 / 累积 / 网络','微小线迹沿不同路径持续增加，局部扭曲逐渐组织成更大的纹理网络，过程比最终图案更重要。','可用于跨屏工作史和设备协作记录：保留贡献路径与关系，不把历史压成一个完成百分比。',BASE+'糸-朔望/Infinity .mp4',4,'pheromone'),
 extra('ink-portrait-process','time','acceleration','墨相｜肖像生成的显影过程','限象工作室 · 2023','显影 / 肖像 / 生成','人物轮廓、墨色与色层在同一肖像上连续显影和重组，观看者能辨认生成阶段而非只收到最终结果。','适合生成式创作与照片处理预览：跨屏等待时显示真实阶段，可回看每一步，不虚构不存在的进度。',BASE+'墨相/person art universe v1.mp4',3,'genetic'),
 extra('fifteen-process','time','acceleration','15度｜从素材到舞台视觉的过程','限象工作室 · 制作档案','采样 / 数字模型 / 时间层','植物采样、数字模型与舞台视觉在制作档案中并置，显示文化资源如何经过结构和行为转译成为新媒介。','可用于跨屏创作流程：手机采集素材，桌面端调整结构，大屏验证空间效果，各端保留同一份版本与来源。',BASE+'15度/15°纪录片字幕版 small 2.mp4',185,'genetic')
];
window.LIFE_CATEGORIES=CATEGORIES;
window.LIFE_CATEGORY_MAP=CATEGORY_MAP;
window.LIFE_SUBTHEME_MAP=SUBTHEME_MAP;
window.LIFE_CASES=[...PPT_CASES,...STUDIO_CASES];
})();
