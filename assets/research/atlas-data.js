(()=>{
'use strict';
const TAGS={
 anthro:{name:'拟人化与万物有灵',short:'拟人',color:'#e9c88d'},
 bio:{name:'生物与生态本源',short:'生物生态',color:'#88d8ce'},
 daily:{name:'日常审美与瞬间',short:'日常瞬间',color:'#b8f1cf'},
 relation:{name:'关系与共情',short:'关系共情',color:'#c8b2e7'},
 time:{name:'时间与痕迹',short:'时间痕迹',color:'#a5c9e8'}
};
const CASE_TAG={baseline:'bio',fifteen:'bio',shylight:'daily',textrain:'bio',woodenmirror:'bio',pulseroom:'bio',avolve:'bio',graffiti:'bio',electricsheep:'time',lastbreath:'time'};
const ppt=(id,tag,title,n,slide,keyword,facts,mechanism,credit='',external='',status='PPT 作品与视觉档案')=>{
 const ext=[31,32,33,37,38,39,50].includes(n)?'.jpeg':n===51?'.png':'.GIF';
 return{id:'ppt-'+id,ppt:true,tag,level:{anthro:2,bio:1,daily:1,relation:2,time:4}[tag],kind:'ppt',title,credit,year:'',keyword,tags:['visual'],features:[],url:'#ref-42',sourceLabel:`PPT 第 ${slide} 页 · 分类与视觉`,slide,media:`assets/research/cases/image${n}${ext}`,thumb:`assets/research/cases/case-${n}.jpg`,external,facts,mechanism,sound:'PPT 未提供逐事件听觉资料，本页不作补写。',evidence:`分类、机制文案与视觉材料来自《生命感研究案例与分析》第 ${slide} 页。${status}；不据此推断观众效果。`,limit:status.includes('设想')||status.includes('原稿')?'属于原稿或设计设想，不作为已实施互动或效果证据。':'作品尺度、展陈、社交语境与声音条件需要另行核查；视觉材料不等于独立效果实验。',game:'',refs:[],verified:true};
};
const PPT_CASES=[
 ppt('snoopy','anthro','Snoopy 表盘',2,3,'情境','时间、天气与情境触发小动作，让角色像在参与日常。','按情境触发轻量动作，为表盘与桌面增添偶遇感。'),
 ppt('luxo','anthro','Luxo Jr.',3,3,'朝向','灯罩朝向、重心与停顿表达注意和情态，动作有先后。','消息到来先轻转朝向，再通过展开或回正给出反馈。','Pixar'),
 ppt('borrow-mountain','anthro','借山',4,3,'轮廓','鱼形在墨色与材质中连续转化，熟悉姿态让变化保持可辨识。','状态转换保留核心轮廓，用形态与墨色表达变化，阅读时降低动效强度。','限象工作室 · 2024','','限象工作室原稿 / 视觉档案'),
 ppt('burn-e','anthro','BURN·E',5,4,'恢复','任务受阻后收回重心、停顿并重新尝试，目标保持连续。','操作受阻后保留恢复过程，为下一次尝试留出停顿。','Pixar'),
 ppt('reds-dream','anthro','Red’s Dream',6,4,'平衡','轮子与车身反复微调，在失衡后逐步找回平衡。','拖偏对象后分次回正，用衰减摆动呈现恢复过程。','Pixar'),
 ppt('source-body','anthro','分身·源启',7,4,'赋形','身体动作映射为非人形态，比例改变后，方向与节奏仍延续人的表现力。','将手势映射为数字伙伴的伸展与转向，保留动作关联。','限象工作室 · 2019','','限象工作室原稿 / 视觉档案'),
 ppt('pulse-room','bio','Pulse Room',8,5,'心跳','传感器读取参与者心率并点亮灯泡，释放后心跳记录进入灯列。','将可确认的身体节律映射为柔和脉冲，保持输入来源清楚。','Rafael Lozano-Hemmer · 2006','https://www.lozano-hemmer.com/pulse_room.php'),
 ppt('emotion-theatre','bio','情绪剧场',9,5,'内观','生理数据参与生成动态视觉场，环绕空间将身体状态转为可感氛围。','形成舒缓视觉回顾，允许用户解释自身感受，避免单值情绪判断。','','','PPT 案例记录 / 外部出处待补'),
 ppt('rosas','bio','Rosas danst Rosas',10,5,'变奏','坐姿动作在重复与变奏中形成节律，相似动作保留个体差异。','让重复反馈保留小幅节奏变化，避免每次动作完全相同。','Anne Teresa De Keersmaeker'),
 ppt('kungfu','bio','客家功夫动态可视化',11,5,'发力','动作捕捉将武术轨迹转为线束与体积，重心、蓄势和回弹维持身体连续性。','手势速度、方向与力度映射到尾迹和形变，让起势、发力、收势形成连续反馈。','Tobias Gremmler · 2016'),
 ppt('glow','bio','Glow',12,6,'邻域','身体动作与投影图形相互呼应，使运动关系在地面显现。','把身体位移映射为邻近区域的形变与扩散。','','','PPT 案例记录 / 外部出处待补'),
 ppt('pixel','bio','Pixel',13,6,'粒子','舞者进入粒子场，身体位移与图形流动形成空间呼应。','让动作邻域的粒子先响应，再向周围传递变化。','','','PPT 案例记录 / 外部出处待补'),
 ppt('pattern','bio','Pattern Recognition',14,6,'错拍','响应灯光追踪双人舞者，身体方向与停顿成为人机呼应的可见线索。','将同向变化与少量错拍结合，让连续反馈具有呼应感。','','','PPT 案例记录 / 外部出处待补'),
 ppt('into-sun','bio','Into The Sun',15,6,'柔性','举臂、进入与摆动对应植物的展开和弯曲，形态保持柔性。','保留手势方向与开合关系，让末端稍后到达并缓慢回正。','','','PPT 案例记录 / 外部出处待补'),
 ppt('organisms','bio','Artificial Organisms',16,7,'起伏','整体舒展与局部起伏并不同步，细小变化提示内部仍在活动。','待机保留轻微舒展，任务处理时增加局部流动。','','','PPT 案例记录 / 外部出处待补'),
 ppt('volumes','bio','Volumes',17,7,'传播','局部脉冲沿密集球体表面传播，颜色与起伏保持连续。','让进度脉冲沿表面传递，以传播间隔区分状态。','','','PPT 案例记录 / 外部出处待补'),
 ppt('primordial','bio','Primordial',18,7,'相位','相近运动规则错开相位，各单元保留转向与速度差异。','多点反馈使用相近节拍，保留少量速度差与相位差。','','','PPT 案例记录 / 外部出处待补'),
 ppt('transfinite','bio','The Transfinite',19,7,'频率','条带、明暗与音画节奏构成抽象频率和尺度变化。','将声音节拍对应到亮度与空间密度，建立清楚的音画关联。','Ryoji Ikeda / Forma'),
 ppt('inform','bio','inFORM',20,8,'形变','身体动作改变可触摸表面，形变把动作与材料联系起来。','让触点带动局部起伏，反馈位置与手部动作保持一致。','MIT Tangible Media Group'),
 ppt('materiable','bio','Materiable',21,8,'阻尼','弹性、黏滞与阻力通过不同运动和恢复规律呈现。','按任务设定回弹与阻尼，让数字材料有可辨识的手感。','MIT Tangible Media Group'),
 ppt('haptographer','bio','Haptographer',22,8,'跨感官','触摸、声音与形变相互关联，反馈在不同感官之间延续。','让触碰强弱对应声音与形变，保持各通道变化一致。','MIT Tangible Media Group'),
 ppt('remarkable','bio','reMarkable Paper Pro',23,8,'笔迹','手写动作留下可追踪笔迹，笔端移动与画面变化连续对应。','保持笔尖与笔迹贴合，用连续反馈承接手部动作。','reMarkable'),
 ppt('flowers','daily','Flowers and People',24,9,'消长','花朵生长、开放与消逝形成持续变化的环境。','让系统背景随情境缓慢消长，保留可被偶然发现的变化。','teamLab'),
 ppt('pool','daily','The Pool',25,9,'光场','参与者活动改变圆形光单元，人与场地共同组成画面。','从接触区域开始反馈，再用邻近光点延续空间呼应。','Jen Lewin'),
 ppt('slow-dance','daily','Slow Dance',26,9,'慢动','频闪与振动产生慢动作观感，熟悉物体显出柔缓而持续的运动。','以低频变化呈现闲置状态，让日常物件保持轻微活动感。','Wonder Machines'),
 ppt('walk','daily','行',27,9,'点云','日常人物与环境成为流动点云，地点记忆在连续显现与重组中被重新观看。','将地点与个人经历关联，探索动态相册和叙事性滤镜。','限象工作室 · 2023','','限象工作室原稿 / 视觉档案'),
 ppt('layers','daily','Layers',28,10,'层次','物体保持可辨识轮廓，内部色层沿边界逐层展开。','面板展开时保留原有轮廓，再沿边界显出下一层内容。','','','PPT 案例记录 / 外部出处待补'),
 ppt('elements','daily','Elements',29,10,'离散','颗粒从边缘脱离，整体结构在连续瓦解中改变组织方式。','对象退出时先释放边缘，再带走主体，保留短暂方向感。','','','PPT 案例记录 / 外部出处待补'),
 ppt('music-bottles','daily','MusicBottles',30,10,'开合','容器的开启与关闭控制声音，让日常动作获得听觉回应。','用开合状态控制声音的进入与退场，让反馈对应实际动作。','Hiroshi Ishii / MIT Tangible Media Group'),
 ppt('lanting','daily','兰亭序',31,11,'笔势','笔画方向、连断与疏密构成书写中的节奏和势。','按输入方向和速度生成笔迹，保留行气的连续感。','东晋 · 王羲之','','静态图谱 / 非原始运动'),
 ppt('caisson','daily','敦煌藻井',32,11,'秩序','中心与外围的层级、重复和对称组织稳定的空间秩序。','按层级展开纹样单元，让界面变化保持中心与边界关系。','敦煌壁画','','静态图谱 / 非原始运动'),
 ppt('glyph','daily','Dynamic Glyph Study',33,11,'递进','静态序列呈现笔画连接与字形递进，为有方向的变换提供参照。','状态切换保留关键笔画，让字形变化仍可辨认。','','','静态序列 / 非原始运动'),
 ppt('peach','daily','桃幻',34,12,'水墨','山形、墨色与花树持续聚散，把纸面空间转为随时间展开的画境。','内容展开采用层次递进的显隐与聚散，留白和缓慢过渡辅助焦点迁移。','限象工作室 × 丘挺 · 2022','','限象工作室原稿 / 视觉档案'),
 ppt('eternal','daily','不朽之境',35,12,'游观','视点进入可游历的山水空间，山石层次与生灵运动协同展开。','以远近层次组织信息，位移与视差跟随输入，并保留稳定参照和退出入口。','杨泳梁；与 Monochrome 合作 · 2017'),
 ppt('pureland','daily','Pure Land 360',36,12,'在场','现代舞者表演进入数字敦煌壁画，以当代身体重新阐释古代乐舞。','分层呈现原图、研究性复原与表演解读，通过指向和聚焦逐步发现细节。','Jeffrey Shaw、Sarah Kenderdine'),
 ppt('canglang','daily','自·沧浪亭',37,13,'水纹','观众手环数据生成个人水图，身体状态以水纹留下视觉线索。','把体征历程转为个人视觉日志，同时保留原始数值和数据来源。','','','PPT 案例记录 / 外部出处待补'),
 ppt('threads-moon','daily','糸-朔望',38,13,'演化','原稿以线迹、刻痕和光影讨论同一生成规则在不同空间材料中的延展。','让节气与日常节律驱动疏密和光影，形成缓慢演化主题。','限象工作室 · 2026','','限象工作室原稿 / 设计设想'),
 ppt('aiva','relation','AIVA Origin Concept',40,14,'身份','光眸与手势回应提供情境感知线索，身份延续是原稿设想。','让同一助手跨设备保留称呼、偏好和回应方式。','','','原稿设想 / 非已实施功能'),
 ppt('all-mirrors','relation','All Mirrors',41,14,'局部回应','镜面片层在服装表面局部转动，使静态穿着转为持续变化。','以局部变化回应对方动作，并让交流对象保持明确。','Ying Gao · 动态服装'),
 ppt('threads-play','relation','糸：对弈与共创',42,14,'共创','参与者围绕共同画面移动与绘线，已有轨迹成为后续动作的条件。','跨设备接续触点或笔迹，让不同参与者看见彼此的行动与痕迹。','限象工作室 · 2021','','限象工作室原稿 / 视觉档案'),
 ppt('melodic-echo','relation','AI 叙事音乐会',43,14,'轮流','机械臂动作与演员演唱交替，朝向、停顿和声音回应形成对话关系。','借倾听、等待和回应的节奏提示状态，允许打断与纠错。','限象工作室 × 上海评弹团 · 2024','','演出编排 / 非自由对话证明'),
 ppt('obliteration','time','The Obliteration Room',44,15,'累积','观众不断贴上彩色圆点，个人动作累积成共同痕迹，逐步改变空间。','让每次参与加入可追溯标记，使共同历史逐渐显现。','草间弥生 · 观众参与'),
 ppt('threads','time','糸',45,15,'织理','蚕丝运动启发不规则循环，线条持续叠加，使生成过程留下可见纹理。','将操作留成线迹，按使用历程逐渐织成纹理。','限象工作室 · 2021','','限象工作室原稿 / 视觉档案'),
 ppt('healing-pool','time','Healing Pool',46,15,'残差','接触改变画面，结构随后重建并留下与之前不同的历史差异。','让触碰后的形态缓慢恢复，保留可辨认的局部残差。','','','PPT 案例记录 / 外部出处待补'),
 ppt('time-launch','time','Time Since Launch',47,16,'计时','特定起点开启持续计时，让过去事件始终影响当下读数。','为重要事件建立专属时间起点，呈现持续的相处历程。','','','PPT 案例记录 / 外部出处待补'),
 ppt('slow-game','time','Slow Game',48,16,'等待','持续游戏状态与延迟变化降低操作频率，使等待成为体验。','将非紧急变化逐步显现，为观察与再次访问留出空间。','','','PPT 案例记录 / 外部出处待补'),
 ppt('ink-portraits','time','铜官感旧·水墨肖像',49,16,'显影','人物轮廓在水墨显隐中浮现，连续变化保留辨识线索，使墨迹呈现记忆感。','状态切换可短暂留痕，连接前后操作，事实文字与日期始终清晰。','限象工作室 · 2023','','限象工作室原稿 / 视觉档案'),
 ppt('connect-transfer','time','Connect Transfer',50,17,'余温','身体运动留下物理印记，动作结束后轨迹仍可被观看。','让关键操作留下方向与力度痕迹，使过程可以回看。','Shen Wei Dance Arts'),
 ppt('tablecloth','time','The History Tablecloth',51,17,'光晕','物件停留数小时使光晕逐渐扩大，移开后较快消退，显露使用历程。','让停留时长与光晕范围对应，移开后渐隐保留短暂使用线索。','Interaction Research Studio')
];
PPT_CASES.find(c=>c.id==='ppt-music-bottles').sound='PPT 第 20 页明确以开合瓶塞对应听觉反馈；具体声轨仍需听音。';
PPT_CASES.find(c=>c.id==='ppt-transfinite').sound='PPT 第 20 页明确条带与声音同步变化；本页不复刻原作声轨。';
PPT_CASES.find(c=>c.id==='ppt-melodic-echo').sound='PPT 第 20 页明确演员演唱与机械臂动作在演出编排中彼此呼应。';
PPT_CASES.find(c=>c.id==='ppt-pureland').sound='PPT 第 20 页明确现代舞者与乐舞声音进入数字敦煌壁画。';
window.LIFE_TAGS=TAGS;
window.LIFE_CASE_TAG=CASE_TAG;
window.PPT_CASES=PPT_CASES;
})();
