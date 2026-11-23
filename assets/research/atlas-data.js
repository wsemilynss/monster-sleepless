(()=>{
'use strict';
const CATEGORIES=[
 {id:'anthro',no:'01',name:'拟人化与万物有灵',short:'拟人',en:'AGENCY & CHARACTER',color:'#e8c68c',statement:'灵动、形态、节律与有趣灵魂。',description:'从一次朝向、一顿、一次恢复开始，观察抽象对象如何获得意图与个性；脸和语言都不是前提。',subthemes:[
  {id:'minimal',name:'灵动感',en:'MINIMAL RESPONSE',description:'用尽量少的运动表达注意、靠近与停顿，让“大智若愚”的笨拙成为可读的性格。',algorithms:['attention','steering']},
  {id:'micro',name:'微观形态',en:'MORPHOGENESIS',description:'以显微与微距观察为参照，通过局部反应、分枝、分合与形变形成生态美学。',algorithms:['reaction','growth']},
  {id:'cycle',name:'生命节律',en:'LIFE CYCLES',description:'把花开、月相、游动与收缩组织成阶段和循环；周期可以被拉伸、错相与重新编排。',algorithms:['homeostasis','oscillator']},
  {id:'character',name:'有趣灵魂',en:'PLAYFUL CHARACTER',description:'好奇、胜负欲、傲娇与探索欲不依赖复杂外形，而由持续的行为偏好和小小的无用之事显现。',algorithms:['wander','attention']}
 ]},
 {id:'bio',no:'02',name:'生物与身体本源',short:'生物身体',en:'BODY & MORPHOGENESIS',color:'#7bd9d0',statement:'身体是接口，反馈与信息映射形成生命线索。',description:'从身体动作、实时反馈与多重信息映射中提炼生命感，不把随机运动或粒子数量直接等同于生命。',subthemes:[
  {id:'feedback',name:'生动反馈',en:'EXPRESSIVE FEEDBACK',description:'精炼输入驱动丰富但连贯的身体反馈，重心、朝向和恢复共同建立操偶般的因果关系。',algorithms:['spring','fabrik']},
  {id:'mapping',name:'信息多重映射',en:'MULTIPLE MAPPING',description:'让不同个体或不同时刻的信息进入矩阵、蜂巢和群体，保持个体差异与整体格式塔。',algorithms:['kuramoto','boids']}
 ]},
 {id:'daily',no:'03',name:'日常审美与瞬间',short:'日常瞬间',en:'MATTER & MOMENT',color:'#b6e3bd',statement:'让熟悉之物，露出陌生的一刻。',description:'关注流动、阻尼、材质与空间重组，在界面和日常物件中发现轻微、短暂却可感的变化。',subthemes:[
  {id:'physical',name:'物理观测转译',en:'PHYSICAL TRANSLATION',description:'把流动、聚合、回弹、阻尼和节律转成可读的物理引擎，而不是统一的漂浮动画。',algorithms:['curl','material']},
  {id:'material',name:'物件材质衍生',en:'MATERIAL BEHAVIOUR',description:'从纸、墨、光、织物与工业材料中提取触感，让色彩、材料与表面处理呈现柔性行为。',algorithms:['material','spring']},
  {id:'spatial',name:'空间结构重组',en:'SPATIAL REFRAMING',description:'通过解构、层叠、漫游与立体相册改变观看位置，在稳定空间骨架中组织显隐和层次。',algorithms:['pbd','lsystem']}
 ]},
 {id:'relation',no:'04',name:'关系与共情',short:'关系共情',en:'RELATION & EMPATHY',color:'#cab7ed',statement:'回应不是回答，是承接。',description:'关系发生在对弈、等待、共同注意和声画对位中；可靠陪伴需要连续，也需要允许沉默与退出。',subthemes:[
  {id:'companionship',name:'忠诚陪伴',en:'STEADY COMPANIONSHIP',description:'安全感来自稳定、可预期和不过度索取注意的存在，而不是持续讨好或永久在线的承诺。',algorithms:['homeostasis','attention']},
  {id:'play',name:'对弈协作',en:'PLAY & CO-CREATION',description:'从一问一答转向有来有往的共同创作，不同主体保留差异，也能接续彼此的动作。',algorithms:['turns','boids']},
  {id:'audiovisual',name:'声画联动',en:'AUDIOVISUAL RESPONSE',description:'听见时改变姿态，发声时形成动作，声音的起止、停顿和视觉状态共享同一时间基准。',algorithms:['oscillator','turns']}
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
const V5_CASES=[
 extra('monster-intro','daily','spatial','怪物里｜水晶怪物与里弄序曲','限象工作室 · 怪物里','水晶 / 里弄 / 光影','水晶般的怪物悬在真实里弄中，切割轮廓、折射光与地面影子共同建立角色与空间的关系。首页聚焦角色主体，保留环境作为理解尺度的参照。','可用于角色开场与跨屏空间叙事：手机呈现近景和角色状态，大屏展开里弄环境，保持同一光源与空间锚点。',BASE+'怪物里/00.INTRO-怪物里开始序曲.mp4',3,'material'),
 extra('monster-ending','time','acceleration','怪物里｜离开与奔赴新世界','限象工作室 · 怪物里','剪影 / 转场 / 时间','人物剪影在明暗交界处前行，离开的动作由光线和负空间共同完成。与序曲的水晶近景不同，这里关注叙事阶段的转换。','可用于跨屏章节切换和任务结束：保留同一角色方向与行进状态，不把转场做成无关的整屏特效。',BASE+'怪物里/02 结局02-艾莉（AILLY ）- 离开奔赴新世界.mp4',4,'memory'),
 extra('shuowang-2025','bio','cycle','朔望｜月相、天幕与算法场','限象工作室 · 苏州当代美术馆 2025','月相 / 天幕 / 周期','月体与环形天幕构成清晰的中心，材质细节与圆周关系让朔望周期成为可观看的空间结构。首页去除社交界面，聚焦月体和轨道。','可用于环境屏、天文内容与跨屏节律主题：小屏显示月相信息，大屏保持共享的周期和空间中心。',BASE+'糸-朔望/朔望-2025年苏州当代美术馆.mp4',3,'kuramoto'),
 extra('canglang-analysis','bio','mapping','自·沧浪亭｜心理水图的算法映射','自·沧浪亭当代艺术展 · 2018','水纹 / 数据 / 多重映射','心跳等来源信息被转译为水纹形态，重点不是把数据等同情绪，而是观察输入、算法和水图之间的可见对应。首页截取水图生成区域。','可用于有明确来源的个人视觉日志与跨屏数据艺术：保留原始数值、时间和解释边界，不输出自动心理判断。',EXT+'自沧浪亭数据可视化2018年/自沧浪亭-心理水图_动态分析.mp4',5,'curl'),
 extra('tingyun-flow','daily','physical','停云｜云雾流动的边界','限象工作室 · Nature Ink','云雾 / 扩散 / 留白','云雾在画面下部聚集、扩散与留白，变化主要来自浓度和边界，而非整个画面平移。首页放大云层交界，突出物理观测。','可用于加载、等待和环境状态：以局部浓度表示过程，低算力模式保留几组连续静帧。',BASE+'01. Nature Ink Series-parts test/04. 停云中.mp4',8,'curl'),
 extra('mozhi-material','daily','material','墨脂｜墨色的柔性材料','限象工作室 · Nature Ink','墨脂 / 柔性 / 吸收','墨团在纸面上显出柔软、黏稠和逐渐吸收的材料感，核心在于边缘与浓度变化，而非额外添加角色表情。','可用于系统材质、触控和笔迹反馈：让不同材料拥有不同阻尼、扩散与恢复方式。',BASE+'01. Nature Ink Series-parts test/02. 墨脂.mp4',4,'material'),
 extra('moyun-installation','daily','spatial','墨韵｜圆窗、人物与空间显影','限象工作室 · Nature Ink','圆窗 / 框景 / 显影','圆窗把墨色空间与观看者剪影框在同一构图中，前景人物和背景云层形成两层深度。','可用于手机取景与大屏框景：小屏决定观看方向，大屏保留完整空间层次和稳定窗框。',BASE+'01. Nature Ink Series-parts test/06. 墨韵 装置.mp4',4,'pbd'),
 extra('taoling-smoke','bio','micro','桃灵·烟｜颗粒烟雾的聚合','限象工作室 · Nature Ink','烟雾 / 颗粒 / 微形态','紫色烟雾从中心聚合出柔软体积，局部颗粒持续改变密度，形成没有固定边界的微形态。','可用于待机微动、加载和跨屏聚合：小屏显示局部种子，大屏延续同一生成阶段。',BASE+'01. Nature Ink Series-parts test/05. 桃灵-烟 测试02.mov',3,'growth'),
 extra('genzhi-palace','daily','spatial','根枝·殿｜数字枝干与观看尺度','限象工作室 · Nature Ink','枝干 / 殿 / 尺度','观众、建筑窗格和中央数字枝干共同构成尺度关系。与枝干参数测试不同，这里关注作品进入真实空间后的观看方式。','可用于展览与跨屏导览：手机提供枝干细节和注释，大屏维持人物、建筑与作品的尺度关系。',BASE+'01. Nature Ink Series-parts test/01. 根枝 - 殿 装置测试.mp4',5,'lsystem'),
 extra('roaming-life','time','trajectory','行｜日常人物的点云痕迹','限象工作室 · 2023','人物 / 点云 / 日常轨迹','日常人物被拆成稀疏点云，运动留下聚散和方向，熟悉的动作在时间中变成可回看的轨迹。','可用于立体相册与跨屏记忆：手机选择人物和时段，大屏展开运动轨迹，同时保护原始素材边界。',BASE+'行/行-视频切片picked/02.life scenes.mp4',4,'memory'),
 extra('roaming-city','daily','spatial','行｜城市街角的点云重组','限象工作室 · 2023','街角 / 点云 / 空间','城市街角以不同颜色与密度的点云重新组织，建筑、道路和行人的层次随视点展开。与人物轨迹切片关注不同尺度。','可用于地点记忆与空间导航：小屏控制视点，大屏呈现完整街角，保留稳定的返回位置。',BASE+'行/行-视频切片picked/04.city corners.mp4',4,'curl'),
 extra('qibaishi-lighting','anthro','feedback','借山｜点灯与鱼的相互回应','限象工作室 · 齐白石数字转译','点灯 / 朝向 / 因果','烛台的点亮与游鱼出现形成同一场景中的事件关系，火光和鱼的朝向提供比台词更直接的因果线索。','可用于跨屏叙事与物件交互：一端执行点灯，另一端以角色朝向和局部动作回应，保持事件来源明确。',BASE+'齐白石/chapter-02-点灯画鱼.mp4',24,'attention'),
 extra('qibaishi-chapter','time','acceleration','借山｜似与不似的形变章节','限象工作室 · 齐白石数字转译','形变 / 风格 / 章节','鱼形在章节中连续显影和转换，原作轮廓、数字分析与风格变化被放在同一时间线上比较。','可用于生成式创作与版本预览：跨屏保留阶段、来源和前后对照，不把快速切换误写成真实生长。',BASE+'齐白石/20241125 chapter 02 — 似与不似（预览版）.mp4',10,'genetic'),
 extra('avatar-capture','anthro','feedback','分身｜动作捕捉的骨骼与网格','限象工作室 · 2019','骨骼 / 网格 / 动作捕捉','骨骼节点和网格直接呈现动作捕捉过程，关节之间的连续关系比外观更能说明数字身体如何被驱动。','可用于跨屏动作输入：手机或传感器端发送少量关键点，大屏重建完整姿态，降低带宽并保留因果。',BASE+'分身系列/Screen Recording 2019-06-24 at 8.41.35 AM.mov',3,'fabrik'),
 extra('avatar-stage-live','relation','audiovisual','分身｜双人舞台上的身体对话','限象工作室 · 2019','双人 / 舞台 / 轮流','两位表演者在同一舞台上通过靠近、停顿和动作回应形成关系。与动作捕捉的技术切片不同，这里观察双方的轮次与身体距离。','可用于双人协作和远程剧场：保留双方动作的先后与空间位置，不将同步等同于完全一致。',BASE+'分身系列/转瞬+分身2.mp4',8,'turns'),
 extra('online-theater','relation','play','线上剧场｜虚拟剧院的空间协作','日内瓦剧院 × Gilles Jobin · 2020','虚拟剧院 / 漫游 / 远程在场','虚拟剧院把售票处、门厅、剧场与滨水空间组织为可漫游路径，线上观众通过空间标签和位置理解彼此的关系。','可用于远程剧场与跨屏导览：手机提供空间索引，大屏呈现共享场景，保留每个参与者的位置和进入路径。','生命感研究/线上剧场.pptx',4,'turns','《线上剧场》PPT 内嵌空间漫游视频'),
 extra('monster-walk-cuicui','anthro','feedback','怪物里｜翠翠的循环步态','限象工作室 · 怪物里','步态 / 重心 / 循环','原创角色行走序列帧直接呈现身体扭转、重心移动与步态循环，适合观察少量姿态如何形成连续性格。','可用于系统角色与跨屏状态：手机显示局部体征，大屏延续同一步态相位，减少静态立绘之间的生硬切换。','Reference/00.creatures-怪物角色/00.12个怪物角色行走序列帧（LOOP）/12咸豆腐片儿翠翠',0,'oscillator','《怪物里》原创角色行走序列帧')
];
V5_CASES.find(c=>c.id==='studio-online-theater').video='';
V5_CASES.find(c=>c.id==='studio-online-theater').sourceDetail='《线上剧场》PPT 内嵌视频 ppt/media/media1.mp4；首页为第 4 秒起核心切片，详情为 24 秒压缩研究剪辑。';
V5_CASES.find(c=>c.id==='studio-monster-walk-cuicui').sourceDetail='《怪物里》翠翠原创行走序列帧，按时间顺序抽帧合成循环动图与视频；未使用 AI 补画角色。';
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-branch-texture'),{title:'根枝｜生长中的光与树形',keyword:'生长 / 分枝 / 光感',keywords:['生长','分枝','光感'],description:'枝干在黑暗中逐层点亮，主枝与细枝保持不同的生长节奏。选择树形逐渐形成的过程，而不是静态参数测试，让分枝、光感和内部能量直接对应微观创生。',potential:'可用于生长型图标、连接路径和跨屏拓扑：从来源节点向目标节点生长，保留主干与细枝的层级和相位。',url:BASE+'01. Nature Ink Series-parts test/01. 根枝.mp4',video:BASE+'01. Nature Ink Series-parts test/01. 根枝.mp4',algorithm:'lsystem',sourceDetail:'《根枝》第 18 秒起，选择树形与光感共同生长的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-peach-garden'),{title:'桃幻｜树叶的聚合与消散',keyword:'树叶 / 粒子 / 聚合',keywords:['树叶','粒子','聚合'],description:'粉白花叶从离散粒子聚合成形，又在边缘逐渐消散。选择叶片组织方式不断改变的段落，突出粒子、材料和整体轮廓之间的关系。',potential:'可用于跨屏内容移交与状态转换：旧页面沿边缘释放粒子，新页面在同一视觉中心重新聚合，保留内容连续性。',url:BASE+'01. Nature Ink Series-parts test/03. 桃幻 树叶test.mp4',video:BASE+'01. Nature Ink Series-parts test/03. 桃幻 树叶test.mp4',algorithm:'growth',sourceDetail:'《桃幻》树叶测试第 12 秒起，选择粒子聚合与消散的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-taoling-smoke'),{title:'桃灵·烟｜圆窗中的烟雾生成',keyword:'烟雾 / 颗粒 / 微形态',keywords:['烟雾','颗粒','微形态'],description:'紫色烟雾在圆窗内聚集、翻卷并改变体积，窗格和观众剪影提供清晰尺度。选择烟雾最饱满的段落，避免只有模糊色团的画面。',potential:'可用于待机微动、加载与跨屏聚合：小屏呈现局部种子，大屏延续同一生成阶段和空间框景。',url:BASE+'01. Nature Ink Series-parts test/05. 桃灵-烟 空间装置.mp4',video:BASE+'01. Nature Ink Series-parts test/05. 桃灵-烟 空间装置.mp4',sourceDetail:'《桃灵·烟》空间装置第 12 秒起，选择圆窗内烟雾生成最完整的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-peach-spirit'),{title:'桃灵·砂｜空间中的砂粒显影',keyword:'砂粒 / 显影 / 空间',keywords:['砂粒','显影','空间'],description:'砂粒从朦胧覆盖逐渐显出花树与空间层次，变化由颗粒密度完成，而不是硬切两张图片。选择花树开始显影的段落，与桃灵·烟的圆窗烟雾形成明确区分。',potential:'可用于相册回顾、文件归档和跨屏内容移交：旧状态化为砂粒后在新位置重新聚合，保持内容和空间连续性。',url:BASE+'01. Nature Ink Series-parts test/05. 桃灵-砂 内景空间.mp4',video:BASE+'01. Nature Ink Series-parts test/05. 桃灵-砂 内景空间.mp4',sourceDetail:'《桃灵·砂》内景空间第 21 秒起，选择砂粒逐渐显出花树的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-tingyun-flow'),{title:'停云｜云形的连续变奏',keyword:'云形 / 形变 / 留白',keywords:['云形','形变','留白'],description:'云团在留白中连续改变轮廓，像云、像动物又始终不被固定命名。选择形态变奏最清晰的段落，避免大面积空白和缺少变化的画面。',potential:'可用于加载、等待和环境状态：以局部形变表达过程，低算力模式保留几组连续静帧。',url:BASE+'01. Nature Ink Series-parts test/04. 停云下.mp4',video:BASE+'01. Nature Ink Series-parts test/04. 停云下.mp4',algorithm:'noise',sourceDetail:'《停云下》第 12 秒起，选择云形连续变奏的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-mozhi-material'),{title:'墨脂｜户外圆窗中的形态呼吸',keyword:'墨脂 / 圆窗 / 形变',keywords:['墨脂','圆窗','形变'],description:'白色圆窗中的墨形不断收放，户外夜色和观看者剪影共同构成前后层次。选择形态变化最明确的段落，呈现材料的柔性、吸收与呼吸感。',potential:'可用于系统材质、触控和笔迹反馈：让不同材料拥有不同阻尼、扩散与恢复方式，跨屏保持同一形态相位。',url:BASE+'01. Nature Ink Series-parts test/02. 墨脂 户外装置.mp4',video:BASE+'01. Nature Ink Series-parts test/02. 墨脂 户外装置.mp4',sourceDetail:'《墨脂》户外装置第 12 秒起，选择圆窗内形态连续收放的段落；详情为 24 秒压缩研究剪辑。'});
Object.assign(STUDIO_CASES.find(c=>c.id==='studio-thread-chess'),{keyword:'线迹 / 流场 / 共同生成',keywords:['线迹','流场','共同生成'],description:'细密线迹在共同画面中流动、缠绕并逐渐形成整体纹理，局部运动与集体图案同时可见。这里分析共同生成的视觉结果，不把纪录片画面误写成实时多人交互证明。'});
const V3_PATH='生命感研究/11-25 MoodBoard Final v3.pptx';
const v3=(id,tag,subtheme,title,credit,keyword,description,potential,n,start,algorithm)=>{
 const c=extra(id,tag,subtheme,title,credit,keyword,description,potential,V3_PATH,start,algorithm,'MoodBoard Final v3 内嵌视频');
 c.sourcePpt=V3_PATH;c.sourceDetail=`《11-25 MoodBoard Final v3》内嵌 media${n}.mp4；首页为第 ${start} 秒起核心切片，详情为压缩研究剪辑。`;return c;
};
const V3_CASES=[
 v3('toufu','anthro','minimal','Toufu / Sociable PC','Sociable PC','极简 / 回应 / 物件主体','白色物件以少量姿态回应人的靠近，复杂外形被主动舍弃，注意力集中在它与人的距离和反应时机。','可用于锁屏和系统助手：以一次朝向、停顿或退后表达回应，不让复杂动作抢走当前任务。',1,0,'attention'),
 v3('qoobo','anthro','minimal','Qoobo','Yukai Engineering','毛绒 / 重心 / 触碰','毛绒身体与尾部动作把触碰转成重心变化，柔软外观只是入口，真正形成灵动的是受力后的细微反馈。','可用于手表轻触与手机通知：用短促、可取消的局部动作回应，而非每次都播放完整角色动画。',4,0,'spring'),
 v3('double-taker','anthro','minimal','Double-Taker (Snout)','Daniel Rozin','回望 / 视线 / 自主姿态','机械主体通过回望、停顿和姿态切换表达注意，动作有对象，也保留不完全服从指令的性格。','可用于通知与助手注意：先指向事件，再决定是否靠近，保留迟疑和不应答的状态。',3,0,'attention'),
 v3('test387','anthro','minimal','Test 387 Tentacle-HDRP','Wenzy（温子阳）· 2019','触手 / 柔性 / 关节','触手在蓝色空间中连续弯曲，关节之间的延迟与约束让抽象形体呈现灵巧的身体感。','可用于跨屏指向与姿态反馈：手机提供目标方向，大屏延续同一组关节和柔性运动。',8,0,'fabrik'),
 v3('microloop','anthro','micro','Microloop_169','MoodBoard v3 案例记录','微流 / 图案 / 自组织','绿色场域中的黑色流线不断组织成细密图案，中心与外围的变化相互关联，呈现微观的自组织美学。','可用于生成式壁纸与设备群组图案：共享局部规则和种子，小屏观察局部，大屏展开整体纹理。',18,0,'reaction'),
 v3('diligent-shadow','anthro','character','The Diligent Shadow','远藤紘也 · 2020','影子 / 劳作 / 幽默','影子反复执行看似简单甚至无用的劳动，坚持、笨拙和节奏共同形成幽默而鲜明的性格。','可用于非任务型角色与系统彩蛋：让无明确目标的小动作成为个性，而不是把每次行为都包装成效率。',24,2,'attention'),
 v3('holon','bio','mapping','Holon','Jon McCormack · 2023','矩阵 / 灯列 / 数据场','城市暮色中的灯列以群体形式呈现信息，单个光点与整体矩阵同时可见，强调多重数据的组合与空间秩序。','可用于设备群组、状态矩阵和跨屏数据场：各端保留单元身份，同时共享整体构图与时间基准。',30,3,'kuramoto'),
 v3('corn-starch','daily','physical','Corn Starch and Water Dancing in a Speaker','MoodBoard v3 案例记录','振动 / 非牛顿 / 声场','马铃薯粉与水在扬声器振动下改变形态，声音频率直接驱动物料的聚合、断裂和流动。','可用于音乐与触觉反馈：用真实材料的运动解释频率，而不是只把频谱画成装饰波形。',31,0,'material'),
 v3('apple-music','daily','physical','Apple Music — Made by Sound','Apple Music','声波 / 液体 / 形状','液体和柔性形体随声音改变轮廓，声音被转成可以观察的物理作用，而非界面上的抽象播放按钮。','可用于跨屏音乐体验：小屏控制声源，大屏呈现材料形变，暂停与静音共享同一状态。',32,5,'material'),
 v3('protrude-flow','daily','physical','Protrude Flow','MoodBoard v3 案例记录','突起 / 铁磁流体 / 场','铁磁流体在场作用下形成密集的尖峰与纹理，微小场强变化被放大成清晰的形体起伏。','可用于场强、距离与连接状态的可视化：让参数改变对应可读的形变，而不是随机抖动。',33,3,'field'),
 v3('shy-society','relation','companionship','Shy Society','DRIFT','灯具 / 呼吸 / 陪伴','灯具以接近、退避和缓慢呼吸组成群体的陪伴关系，光的存在不依赖持续命令。','可用于环境屏与陪伴型设备：保持低强度、可预测的节律，允许安静和自主活动。',42,3,'homeostasis'),
 v3('moqut','relation','companionship','moQut','ICD-Lab · 2025','松弛 / 自主 / 共处','小物件拥有自主活动节律，不始终等待指令，也不过度打扰，只在特定情境下与环境轻微联动。','可用于陪伴型桌面与跨屏环境主体：保留无任务目标和随机松弛感，让用户可以选择观看或不互动。',43,0,'homeostasis'),
 v3('loopimal','relation','audiovisual','Loopimal','YATATOY · 2015','音乐 / 拼贴 / 姿态','声音片段被组合成有姿态的角色节奏，用户能直接听见组合结果，也能从动作理解音乐的进入和退出。','可用于儿童音乐创作和跨屏演奏：以身体与图形的组合表达音轨，而不是只显示时间线。',46,0,'turns'),
 v3('hidden-worlds','relation','audiovisual','Hidden Worlds of Noise and Voice','Tmema · 2002','声源 / 身体 / 空间','声音、身体和影像在同一空间中相互塑造，听觉经验不再只是画面的附属，而成为行动发生的场所。','可用于空间音频与远程表演：保留声源方向、身体位置和真实进入路径，静音时提供等价空间线索。',47,0,'material'),
 v3('ar-sound','relation','audiovisual','AR 声音实验','Zach Lieberman · 2017','距离 / 空间声场 / 身体移动','时间被转成空间距离，用户通过身体与手机的移动接近、离开或逆向穿过声音。','可用于 AR 与跨屏声场：以真实位置组织播放关系，让声音接近、远离和回放在空间中可理解。',48,3,'field'),
 extra('recursions','relation','play','遞迴（RECURSIONS）','钟愫君 · 2026','机械臂 / 共创 / 轮流','参与者与机械臂围绕同一画面进行创作，双方动作和已有线迹共同决定后续过程，呈现“和而不同”的协作关系。','可用于多设备共同创作：保留不同主体的笔迹与顺序，让系统接续而不是覆盖参与者的动作。','生命感研究/11-25 MoodBoard Final v3.pptx',0,'turns','MoodBoard Final v3 案例与静态图像')
];
Object.assign(V3_CASES[V3_CASES.length-1],{media:'assets/research/guided/v3-recursions.gif',mediaType:'image/gif',guided:true,sourcePpt:V3_PATH,sourceDetail:'《11-25 MoodBoard Final v3》RECURSIONS 静态图像的动态导览，不冒充原始运动。'});
const DEDUPLICATE_IDS=['ppt-source-body','studio-avatar-capture','studio-avatar-stage-live','ppt-borrow-mountain','studio-fish-language','studio-borrow-fish','studio-qibaishi-lighting','ppt-walk','studio-walk-old-town','studio-roaming-life','ppt-peach','ppt-threads-moon','ppt-melodic-echo','ppt-threads-play','ppt-ink-portraits','ppt-threads','ppt-canglang','studio-branch-light','studio-genzhi-palace','studio-fifteen-process','studio-monster-ending','studio-monster-walk-cuicui'];
const GUIDED_IDS=['ppt-lanting','ppt-caisson','ppt-glyph','ppt-canglang','ppt-threads-moon','ppt-connect-transfer','ppt-tablecloth'];
const ALL_CASES=[...PPT_CASES,...STUDIO_CASES,...V5_CASES,...V3_CASES].filter(c=>!DEDUPLICATE_IDS.includes(c.id));
const V3_CLASS={
 'ppt-slow-dance':['anthro','cycle'],'studio-peach-garden':['anthro','cycle'],'studio-thread-infinity':['anthro','cycle'],'ppt-primordial':['anthro','cycle'],
 'ppt-healing-pool':['anthro','micro'],'ppt-elements':['anthro','micro'],'ppt-into-sun':['bio','feedback'],'studio-monster-intro':['anthro','character'],
 'studio-shuowang-2025':['time','acceleration'],'ppt-kungfu':['time','trajectory'],'ppt-obliteration':['time','slowness'],
 'ppt-all-mirrors':['daily','material'],'ppt-layers':['daily','material'],'ppt-inform':['daily','material'],'ppt-materiable':['daily','material'],'ppt-haptographer':['bio','feedback']
};
ALL_CASES.forEach(c=>{
 if(c.tag==='bio'&&c.subtheme==='micro')c.tag='anthro';
 if(c.tag==='bio'&&c.subtheme==='cycle')c.tag='anthro';
 if(c.tag==='anthro'&&c.subtheme==='feedback')c.tag='bio';
 if(V3_CLASS[c.id]){c.tag=V3_CLASS[c.id][0];c.subtheme=V3_CLASS[c.id][1]}
 c.preview=`assets/research/previews/${c.id.replace(/^studio-/,'')}.mp4`;
 c.previewDetail=c.supplement?'24 秒压缩研究剪辑；原片不足 24 秒时按原时长保留。':'原始嵌入媒体转码预览，完整原片与作品链接继续保留。';
 if(GUIDED_IDS.includes(c.id)){c.media=`assets/research/guided/${c.id}.gif`;c.mediaType='image/gif';c.guided=true;c.previewDetail='原作为静态图像；当前为平移与缩放动态导览，不冒充原作运动。'}
});
STUDIO_CASES.find(c=>c.id==='studio-thread-chess').url=BASE+'糸-朔望/《糸 》自然与算法的思考.mp4';
STUDIO_CASES.find(c=>c.id==='studio-thread-chess').video=BASE+'糸-朔望/《糸 》自然与算法的思考.mp4';
STUDIO_CASES.find(c=>c.id==='studio-thread-chess').sourceDetail='《糸：自然与算法的思考》第 50 秒起：首页 4 秒聚焦线迹流动，详情为 24 秒压缩研究剪辑。';
STUDIO_CASES.find(c=>c.id==='studio-bio-luxury').sourceDetail='外部补充视频第 4 秒起：聚焦细胞分裂与有机几何，详情为 24 秒压缩研究剪辑。';
V5_CASES.find(c=>c.id==='studio-canglang-analysis').sourceDetail='自沧浪亭动态分析第 2 秒起：首页聚焦水图生成区域，详情为 24 秒压缩研究剪辑；心理数据仅作映射观察，不作诊断。';
window.LIFE_CATEGORIES=CATEGORIES;
window.LIFE_CATEGORY_MAP=CATEGORY_MAP;
window.LIFE_SUBTHEME_MAP=SUBTHEME_MAP;
window.LIFE_CASES=ALL_CASES;
})();
