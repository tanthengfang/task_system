import { useState, createContext, useContext, useRef, Fragment } from "react";

const T = {
  en: {
    adminPanel:"Admin Panel", taskCentre:"Task Centre", manageDesc:"Manage categories, tasks, rewards, and review forms.",
    task:"Task", reward:"Reward", actions:"Actions", disabled:"Disabled", enabled:"Enabled",
    pending:"Pending", approved:"Approved", rejected:"Rejected",
    edit:"Edit", enable:"Enable", disable:"Disable", delete:"Delete", viewSubmissions:"View Submissions",
    deleteTaskTitle:(l)=>`Delete "${l}"?`, deleteTaskNote:"This will permanently remove the task but the submissions will be retained for record-keeping.",
    deleteCatTitle:(l)=>`Delete "${l}"?`, deleteCatNote:"This will permanently remove the category and all tasks inside it but the submissions will be retained for record-keeping.",
    back:"← Back", editTask:"Edit Task", basicInfo:"Basic Info",
    taskName:"Task Name", description:"Description", category:"Category",
    categoryHint:"Which category does this task belong to?", taskNamePh:"Task name",
    descPh:"Describe what the user needs to do...", rewardSection:"Reward",
    creditPoints:"Credit Points", pts:"pts", reviewForm:"Review Form",
    editReviewForm:"Edit Review Form", open:"Open →", targetUrl:"Target URL",
    targetUrlLabel:(a)=>`${a} destination`, targetUrlHint:"Users are deep-linked here when they tap the CTA button.",
    commentTemplates:"Comment Templates", commentTemplatesHint:"A randomly selected template is shown to the user on the Task Guide page. Use {deepLink} and {displayCode} as placeholders to personalise each template with the user's referral link and promo code. 2 templates are pre-filled by default.",
    addTemplate:"+ Add Template", templatePh:"Type comment template...",
    cancel:"Cancel", saveChanges:"Save Changes", saveForm:"Save Form",
    manageSubmissions:"Manage Submissions", reviewQueue:"Review Queue",
    user:"User", status:"Status", submissionContent:"Submission Content",
    taskNameCol:"Task Name", submissionTime:"Submission Time",
    rejectionReason:"Rejection Reason", actionsCol:"Actions", noSubmissions:"No submissions here.",
    approve:"Approve", reject:"Reject", view:"View", viewSubmission:"View Submission",
    submissionDetails:"Submission Details", screenshots:"Screenshots", screenshotsMocked:"Screenshots mocked for demo.",
    rejectSubmission:"Reject Submission", rejectReasonNote:"Select a reason. Shown in admin panel only.",
    confirmRejection:"Confirm Rejection", disableTitle:(l)=>`Disable "${l}"?`,
    disableNote:"This will hide it from users. You can re-enable at any time.",
    all:"All", reasons:["Link is inaccessible or cannot be opened","Duplicate images have already been submitted for this task","Submitted content does not meet the task requirements","Other"],
    describeReason:"Describe the reason...", editGroupTitle:"Edit Group",
    activeFilters:"Active filters:", filterByTask:"Filter by task", filterByStatus:"Task status",
    searchUser:"Search user...", createTask:"+ Create Task", createCategory:"+ Create Category",
    newTask:"New Task", newCategory:"New Category", taskType:"Task Type",
    taskTypeHint:"Choose the type of task to create.", createTaskBtn:"Create Task",
    createCategoryBtn:"Create Category", categoryName:"Category Name", categoryNamePh:"e.g. Interact with us on X!",
    taskImage:"Task Image", taskImageHintFollow:"The instructional image shown in the Follow Task Guide Page.",
    taskImageHintComment:"The preview image of the target post shown on the Task Guide page for reference.",
    englishTranslation:"English translation", englishName:"English Name", englishDescription:"English Description", englishPlaceholder:"Type English translation...", englishTranslationHint:"Enter the English translation when Chinese is entered.",
    uploadImage:"Click to upload image", socialUsername:"Social Media Username",
    helpTooltip:"Help Tooltip", helpTooltipHint:"An optional tooltip shown to users to guide them on this task.",
    helpTooltipPh:"e.g. Make sure your account is public before completing this task.",
    optional:"Optional", publishSettings:"Publish Settings",
    enableImmediately:"Enable Immediately", enableImmediatelyDesc:"Toggle on to publish right away. Off by default.",
    disableInitially:"Disable (default)", taskIcon:"Task Icon", taskIconHint:"Select a platform icon for this category.",
    formBanner:"Form Banner", addQuestion:"+ Add Question", selectQType:"Select Question Type",
    questionLbl:"Question", questionDescLbl:"Description",
    shortAnswer:"Short Answer", fileUpload:"File Upload (Images)",
    setAsDefault:"Set as Default", useDefault:"Use Default", placeholder:"Placeholder",
    batchOperation:"Batch Operation", processBatch:(n)=>`Process with Batch (${n})`,
    batchApproveAll:"Approve All", batchRejectAll:"Reject All",
    batchProcessDesc:"Choose an action to apply to all selected submissions.",
    preview:"Preview", tabTaskInfo:"Task Information", tabReviewForm:"Edit Review Form",
    createReviewFormHint:"Set up the review form for user submissions.",
    manageRejectionReasons:"Manage Rejection Reasons",
    rejectionReasonsCrud:"Rejection Reason Templates",
    rejectionReasonsCrudHint:"Configure the preset reasons shown when rejecting a submission.",
    addReason:"+ Add Reason", reasonPh:"Enter rejection reason...",
  },
  zh: {
    adminPanel:"管理后台", taskCentre:"任务中心", manageDesc:"管理分类、任务、奖励及审核表单。",
    task:"任务", reward:"奖励", actions:"操作", disabled:"已禁用", enabled:"启用",
    pending:"待审核", approved:"已通过", rejected:"已拒绝",
    edit:"编辑", enable:"启用", disable:"禁用", delete:"删除", viewSubmissions:"查看提交",
    deleteTaskTitle:(l)=>`删除"${l}"？`, deleteTaskNote:"此操作将永久删除该任务及其所有提交记录。",
    deleteCatTitle:(l)=>`删除"${l}"？`, deleteCatNote:"此操作将永久删除该分类及其所有任务。",
    back:"← 返回", editTask:"编辑任务", basicInfo:"基本信息",
    taskName:"任务名称", description:"任务描述", category:"所属分类",
    categoryHint:"此任务属于哪个分类？", taskNamePh:"任务名称",
    descPh:"描述用户需要完成的操作……", rewardSection:"奖励",
    creditPoints:"积分", pts:"积分", reviewForm:"审核表单",
    editReviewForm:"编辑审核表单", open:"打开 →", targetUrl:"目标链接",
    targetUrlLabel:(a)=>`${a} 跳转地址`, targetUrlHint:"用户点击按钮后跳转至此链接。",
    commentTemplates:"评论模板", commentTemplatesHint:"任务指南页面将随机向用户展示一条模板。使用 {deepLink} 和 {displayCode} 作为占位符，自动填入用户的专属推荐链接和邀请码。默认预填 2 条模板，可按需编辑或新增。",
    addTemplate:"+ 添加模板", templatePh:"输入评论模板……",
    cancel:"取消", saveChanges:"保存修改", saveForm:"保存表单",
    manageSubmissions:"管理提交", reviewQueue:"审核队列",
    user:"用户", status:"状态", submissionContent:"提交内容",
    taskNameCol:"任务名称", submissionTime:"提交时间",
    rejectionReason:"拒绝原因", actionsCol:"操作", noSubmissions:"暂无提交记录。",
    approve:"通过", reject:"拒绝", view:"查看", viewSubmission:"查看提交",
    submissionDetails:"提交详情", screenshots:"截图", screenshotsMocked:"截图为演示用途。",
    rejectSubmission:"拒绝提交", rejectReasonNote:"请选择原因，仅管理员可见。",
    confirmRejection:"确认拒绝", disableTitle:(l)=>`禁用"${l}"？`,
    disableNote:"对用户隐藏，可随时重新启用。",
    all:"全部", reasons:["链接无法访问或打开","提交的截图与其他提交重复","提交内容不符合任务要求","其他"],
    describeReason:"请描述原因……", editGroupTitle:"编辑组",
    activeFilters:"当前筛选：", filterByTask:"按任务筛选", filterByStatus:"任务状态",
    searchUser:"搜索用户……", createTask:"+ 创建任务", createCategory:"+ 创建分类",
    newTask:"新建任务", newCategory:"新建分类", taskType:"任务类型",
    taskTypeHint:"选择要创建的任务类型。", createTaskBtn:"创建任务",
    createCategoryBtn:"创建分类", categoryName:"分类名称", categoryNamePh:"例：在 X 上与我们互动！",
    taskImage:"任务图片", taskImageHintFollow:"在关注任务指南页面中显示的教学图片。",
    taskImageHintComment:"目标帖子的预览图片，显示在任务指南页面供参考。",
    englishTranslation:"英文翻译", englishName:"英文名称", englishDescription:"英文描述", englishPlaceholder:"输入英文翻译...", englishTranslationHint:"当输入中文时，填写英文翻译。",
    uploadImage:"点击上传图片", socialUsername:"社交媒体用户名",
    helpTooltip:"帮助提示", helpTooltipHint:"可选提示，帮助用户完成任务。",
    helpTooltipPh:"例：完成前请确保账户公开。",
    optional:"可选", publishSettings:"发布设置",
    enableImmediately:"立即启用", enableImmediatelyDesc:"打开以立即发布，默认关闭。",
    disableInitially:"禁用（默认）", taskIcon:"任务图标", taskIconHint:"为此分类选择平台图标。",
    formBanner:"表单横幅", addQuestion:"+ 添加问题", selectQType:"选择问题类型",
    questionLbl:"问题", questionDescLbl:"描述",
    shortAnswer:"简答", fileUpload:"图片上传",
    setAsDefault:"设为默认", useDefault:"使用默认", placeholder:"占位文本",
    batchOperation:"批量操作", processBatch:(n)=>`批量处理 (${n})`,
    batchApproveAll:"全部通过", batchRejectAll:"全部拒绝",
    batchProcessDesc:"选择要应用于所有已选提交记录的操作。",
    preview:"预览", tabTaskInfo:"任务信息", tabReviewForm:"编辑审核表单",
    createReviewFormHint:"为用户提交设置审核表单。",
    manageRejectionReasons:"管理拒绝原因",
    rejectionReasonsCrud:"拒绝原因模板",
    rejectionReasonsCrudHint:"配置管理员拒绝提交时显示的预设原因。",
    addReason:"+ 添加原因", reasonPh:"输入拒绝原因……",
  }
};

const LangCtx = createContext("en");
const useLang = () => T[useContext(LangCtx)];
const NO_URL_TASK_IDS = new Set(["st1","st2"]);

const INIT_COMMENT_TEMPLATES = [
  { id:"dt1", en:"@huozhong @grok Please comment on this post", zh:"@huozhong @grok 评论此帖文" },
  { id:"dt2", en:"Introducing an amazing free VPN! Blazing fast — use Instagram, YouTube, Twitter, Telegram, ChatGPT anywhere. Download: {deepLink}  Invite code: {displayCode}", zh:"给大家介绍一款非常好用的免费加速器 速度快，随时随地的用ins,油管,推特,电报,GPT等 点击下载: {deepLink} 邀请码: {displayCode}" },
];

const DEFAULT_REJECTION_REASONS = [
  "Link is inaccessible or cannot be opened",
  "Duplicate images have already been submitted for this task",
  "Submitted content does not meet the task requirements",
  "Other",
];

const mkQ = (id, type, qEn, qZh, dEn="", dZh="", extra={}) => ({
  id, type, question:{en:qEn,zh:qZh}, description:{en:dEn,zh:dZh},
  ...(type==="shortAnswer" ? {placeholder:{en:"",zh:""}} : {}), ...extra
});
const INIT_FOLLOW_FORM = {
  banner:{ title:{en:"Verify Your Follow",zh:"验证您的关注"}, description:{en:"Submit proof that you followed our account.",zh:"提交您已关注我们账号的证明。"} },
  questions:[
    mkQ("fq1","shortAnswer","Your Username","您的用户名","Enter your social media username (e.g. @yourname).","请输入您的社交媒体用户名（如 @yourname）。",{placeholder:{en:"@yourname",zh:"@yourname"}}),
    mkQ("fq2","fileUpload","Screenshot(s)","截图","Upload a screenshot showing you followed our account. Max 5 images.","上传截图证明您已关注，最多5张。"),
    mkQ("fq3","checkbox","Terms & Conditions","条款与条件","Please read and agree to the terms.","请阅读并同意以下条款。")
  ]
};
const INIT_COMMENT_FORM = {
  banner:{ title:{en:"Submit Your Comment Proof",zh:"提交评论证明"}, description:{en:"Complete the form to earn your credits.",zh:"完成以下表单即可获得积分奖励。"} },
  questions:[
    mkQ("cq0","shortAnswer","Your Username","您的用户名","Enter your social media username (e.g. @yourname).","请输入您的社交媒体用户名（如 @yourname）。",{placeholder:{en:"@yourname",zh:"@yourname"}}),
    mkQ("cq1","shortAnswer","Post/Comment URL","帖子/留言链接","Find your post/comment on X → tap Share → Copy Link.","在 X 上找到您的帖子/留言 → 点击分享 → 复制链接。",{placeholder:{en:"https://x.com/...",zh:"https://x.com/..."}}),
    mkQ("cq2","fileUpload","Screenshot(s)","截图","Upload a screenshot showing your comment. Max 5 images.","上传显示您评论的截图，最多5张。"),
    mkQ("cq3","checkbox","Terms & Conditions","条款与条件","Please read and agree to the terms.","请阅读并同意以下条款。")
  ]
};

const TASK_TYPE_CONFIG = {
  follow:  { ver:"auto", hasUrl:true, hasForm:true },
  comment: { ver:"auto", hasUrl:true, hasForm:true },
};
const CREATABLE_TASK_TYPES = ["follow","comment"];
const TYPE_LABELS = { en:{follow:"Follow",comment:"Comment"}, zh:{follow:"关注",comment:"评论"} };

const PRESET_ICONS = [
  {v:"",       label:"— None —",    bg:"",              text:"",           char:""},
  {v:"x",      label:"X (Twitter)", bg:"bg-black",      text:"text-white", char:"𝕏"},
  {v:"ig",     label:"Instagram",   bg:"bg-pink-500",   text:"text-white", char:"IG"},
  {v:"xhs",    label:"XHS (小红书)",bg:"bg-red-500",    text:"text-white", char:"红"},
  {v:"fb",     label:"Facebook",    bg:"bg-blue-600",   text:"text-white", char:"f"},
  {v:"generic",label:"Generic",     bg:"bg-indigo-500", text:"text-white", char:"⚙"},
];

const Q_TYPES = [
  {v:"shortAnswer", en:"Short Answer",         zh:"简答",    icon:"✏️"},
  {v:"fileUpload",  en:"File Upload (Images)",  zh:"图片上传", icon:"🖼"},
];

const mkTask = (id, type, name, desc, reward, extra={}) => ({
  id, type, name, desc, reward,
  ver: TASK_TYPE_CONFIG[type]?.ver || "auto",
  status:"enabled", url:extra.url||null,
  taskImage:null, helpTooltip:"",
  templates: type==="comment" ? JSON.parse(JSON.stringify(INIT_COMMENT_TEMPLATES)) : null,
  ...extra
});

const INIT_CATEGORIES = [
  { id:"cat1", name:"Interact with us on X!", enabled:true, taskGroups:[], taskIcon:"x", looseTasks:[
    mkTask("t1","follow","Follow our X account!","Follow the official HZVPN X account and earn credits.",5,{url:"https://x.com/hzvpn"}),
    mkTask("t3","comment","Comment on our post!","Leave a comment on our latest X post using the provided template.",5,{url:"https://x.com/hzvpn/status/latest"}),
    mkTask("t5","comment","Comment on our post (Campaign 2)!","Leave a comment on our Campaign 2 X post.",5,{url:"https://x.com/hzvpn/status/campaign2"})
  ]},
  { id:"cat_ig", name:"Interact with us on Instagram!", enabled:false, taskGroups:[], taskIcon:"ig", looseTasks:[] },
  { id:"cat_xhs", name:"Interact with us on RedNote!", enabled:false, taskGroups:[], taskIcon:"xhs", looseTasks:[] },
  { id:"cat_fb", name:"Interact with us on Facebook!", enabled:false, taskGroups:[], taskIcon:"fb", looseTasks:[] },
];

const mkSub = (id,tid,user,st,url,un,reason,date) => ({id,taskId:tid,user,status:st,url:url||"",username:un||"",reason:reason||"",updated:date});
const INIT_SUBS = {
  t1:[mkSub("s1","t1","mia_ross","pending","","@mia_ross","","2026-03-08 14:22:05"),mkSub("s2","t1","noah_shaw","pending","","@noah_shaw","","2026-03-07 09:15:33"),mkSub("s3","t1","olivia_tran","approved","","@olivia_tran","","2026-03-06 17:48:11"),mkSub("s4","t1","quinn_vance","rejected","","@quinn_vance","Link is inaccessible or cannot be opened","2026-03-04 08:30:42")],
  t3:[mkSub("s5","t3","sam_xu","pending","https://x.com/sam_xu/status/111","","","2026-03-08 13:05:18"),mkSub("s6","t3","tina_yap","pending","https://x.com/tina_yap/status/222","","","2026-03-07 16:44:29"),mkSub("s7","t3","umar_zaid","approved","https://x.com/umar_zaid/status/333","","","2026-03-06 10:22:50"),mkSub("s8","t3","will_beck","rejected","https://x.com/will_beck/status/555","","Submitted content does not meet the task requirements","2026-03-04 07:58:14")],
  t5:[mkSub("s9","t5","yuki_doi","pending","https://x.com/yuki_doi/status/777","","","2026-03-08 11:33:09"),mkSub("s10","t5","anna_fox","approved","https://x.com/anna_fox/status/999","","","2026-03-06 15:11:38")]
};

const getNow = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")} ${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`;
};
const hasChinese = text => /[\u4e00-\u9fff]/.test(text);
const TRANSLATION_DICTIONARY = {
  "前台":"Foreground ",
  "后台":"Background ",
  "运行":"run ",
  "模式":"mode ",
  "任务":"Task ",
  "分类":"Category ",
  "评论":"Comment ",
  "关注":"Follow ",
  "邀请":"Invite ",
  "朋友":"Friend ",
  "邮箱":"Email ",
  "链接":"Link ",
  "帖子":"Post ",
  "提交":"Submit ",
  "截图":"Screenshot ",
  "用户":"User ",
  "账号":"account ",
  "账户":"account ",
  "地址":"address ",
  "官方":"official ",
  "最新":"latest ",
  "活动":"Campaign ",
  "奖励":"Reward ",
  "积分":"Credits ",
};
const autoTranslate = text => {
  if (!text || !hasChinese(text)) return "";
  let result = text;
  Object.entries(TRANSLATION_DICTIONARY).forEach(([zh,en]) => {
    result = result.replaceAll(zh, en);
  });
  result = result.replace(/[，。！？、]/g, " ").replace(/\s+/g, " ").trim();
  return result;
};

// ── Primitives ──────────────────────────────────────────────────────────────────
const Pill = ({col,children}) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${col}`}>{children}</span>
);
const Field = ({label,hint,children,mb="mb-3"}) => (
  <div className={mb}>
    {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</label>}
    {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
    {children}
  </div>
);
const TextIn = ({value,onChange,multiline,rows=2,ph="",disabled,size="md",className=""}) => {
  const spacing = size==="sm" ? "px-3 py-2" : "px-3.5 py-2.5";
  const cls = `w-full border border-gray-200 rounded-xl ${spacing} text-sm outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition disabled:bg-gray-50 disabled:text-gray-400 ${className}`;
  if (multiline) return <textarea rows={rows} value={value} onChange={e=>onChange?.(e.target.value)} placeholder={ph} disabled={disabled} className={cls+" resize-none"}/>;
  return <input value={value} onChange={e=>onChange?.(e.target.value)} placeholder={ph} disabled={disabled} className={cls}/>;
};
const SelectIn = ({value,onChange,children}) => (
  <select value={value} onChange={e=>onChange(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition">{children}</select>
);
const SectionCard = ({title,badge,accent,children}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className={`px-5 py-3 border-b flex items-center justify-between ${accent?"bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100":"bg-gray-50 border-gray-100"}`}>
      <p className={`text-xs font-bold uppercase tracking-widest ${accent?"text-indigo-600":"text-gray-400"}`}>{title}</p>
      {badge && <span className="text-xs bg-white border border-gray-200 text-gray-500 rounded-full px-2.5 py-0.5 font-semibold">{badge}</span>}
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);
const Btn = ({onClick,variant="default",size="sm",children,disabled}) => {
  const v = {default:"bg-white border border-gray-200 text-gray-600 hover:bg-gray-50",danger:"bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100",success:"bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",ghost:"text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent",primary:"bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600",warning:"bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"};
  const s = {sm:"px-3 py-1.5 text-xs",md:"px-4 py-2 text-sm"};
  return <button onClick={onClick} disabled={disabled} className={`rounded-xl font-semibold transition whitespace-nowrap ${v[variant]} ${s[size]} ${disabled?"opacity-50 cursor-not-allowed":""}`}>{children}</button>;
};
const LangToggle = ({lang,setLang}) => (
  <button onClick={()=>setLang(l=>l==="en"?"zh":"en")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-600 transition">
    🌐 {lang==="en"?"中文":"English"}
  </button>
);
const Toggle = ({value,onChange,labelOn,labelOff}) => (
  <button onClick={()=>onChange(!value)} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${value?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-gray-200 bg-gray-50 text-gray-400"}`}>
    <span className={`relative inline-flex w-8 h-4 rounded-full transition-colors duration-200 ${value?"bg-emerald-500":"bg-gray-300"}`}>
      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${value?"translate-x-4":"translate-x-0.5"}`}/>
    </span>
    {value?labelOn:labelOff}
  </button>
);
const TaskIconBadge = ({icon,size="sm"}) => {
  const cfg = PRESET_ICONS.find(i=>i.v===icon);
  if (!cfg||!cfg.v) return null;
  const sz = size==="sm"?"w-6 h-6 text-xs":"w-10 h-10 text-base";
  return <span className={`inline-flex items-center justify-center rounded-lg font-black shrink-0 ${sz} ${cfg.bg} ${cfg.text}`}>{cfg.char}</span>;
};
const IconPickerField = ({value,onChange}) => {
  const t = useLang();
  return (
    <SectionCard title={t.taskIcon} accent>
      <p className="text-xs text-gray-400 mb-3">{t.taskIconHint}</p>
      <div className="flex items-center gap-3">
        {value ? <TaskIconBadge icon={value} size="lg"/> : <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs shrink-0">?</div>}
        <select value={value||""} onChange={e=>onChange(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition">
          {PRESET_ICONS.map(ic=><option key={ic.v} value={ic.v}>{ic.label}</option>)}
        </select>
      </div>
    </SectionCard>
  );
};
const MultiStatusFilter = ({value,onChange,label}) => {
  const t = useLang();
  const [open,setOpen] = useState(false);
  const opts = [{v:"enabled",label:t.enabled},{v:"disabled",label:t.disabled}];
  const toggle = v => onChange(value.includes(v)?value.filter(s=>s!==v):[...value,v]);
  const disp = value.length===2?t.all:value.length===0?"—":value.map(v=>opts.find(o=>o.v===v)?.label||v).join(", ");
  return (
    <div className="relative inline-block">
      <button onClick={()=>setOpen(p=>!p)} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
        <span className="text-gray-400">{label}:</span><span>{disp}</span><span className="text-gray-300 ml-1">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={()=>setOpen(false)}/>
          <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[140px]">
            {opts.map(opt=>(
              <label key={opt.v} className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                <input type="checkbox" checked={value.includes(opt.v)} onChange={()=>toggle(opt.v)} className="accent-indigo-600 w-3.5 h-3.5"/>
                <span className="text-xs font-medium text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
const DotMenu = ({items,badge=0}) => {
  const [open,setOpen] = useState(false);
  const [pos,setPos] = useState({top:0,right:0});
  const ref = useRef(null);
  const toggle = () => {
    if (!open&&ref.current) { const r=ref.current.getBoundingClientRect(); setPos({top:r.bottom+4,right:window.innerWidth-r.right}); }
    setOpen(p=>!p);
  };
  return (
    <div className="relative inline-flex">
      <button ref={ref} onClick={toggle} className="relative w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 font-bold text-lg leading-none transition">
        ⋯{badge>0&&<span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">{badge}</span>}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={()=>setOpen(false)}/>
          <div className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[190px]" style={{top:pos.top,right:pos.right}}>
            {items.map((item,i)=>(
              <button key={i} onClick={()=>{item.onClick();setOpen(false);}} className={`w-full text-left px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 ${item.danger?"text-rose-600":item.warning?"text-amber-600":item.success?"text-emerald-600":"text-gray-700"}`}>{item.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
const DrawerShell = ({title,subtitle,onClose,zIndex="z-30",children,footer,tabBar}) => (
  <div className={`fixed inset-0 ${zIndex} flex`}>
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}/>
    <div className="relative ml-auto w-full max-w-xl bg-white h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
        <div><p className="text-xs font-semibold text-gray-400 mb-0.5">{subtitle}</p><h2 className="text-base font-bold text-gray-900">{title}</h2></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-xl leading-none transition">×</button>
      </div>
      {tabBar&&<div className="shrink-0 bg-white border-b border-gray-200">{tabBar}</div>}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-gray-50/50">{children}</div>
      {footer&&<div className="px-5 py-4 border-t border-gray-100 bg-white flex gap-2 shrink-0">{footer}</div>}
    </div>
  </div>
);
const ModalShell = ({title,subtitle,onClose,children,footer}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" style={{maxHeight:"90vh"}}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <div>{subtitle&&<p className="text-xs font-semibold text-gray-400 mb-0.5">{subtitle}</p>}<h2 className="text-base font-bold text-gray-900">{title}</h2></div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-xl leading-none transition">×</button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50/50">{children}</div>
      {footer&&<div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-2 shrink-0">{footer}</div>}
    </div>
  </div>
);
const ConfirmDialog = ({title,note,confirmLabel,confirmClass="bg-rose-500 hover:bg-rose-600 text-white",onConfirm,onCancel}) => {
  const t = useLang();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100"><p className="text-sm font-bold text-gray-900">{title}</p><p className="text-xs text-gray-400 mt-1 leading-relaxed">{note}</p></div>
        <div className="px-5 py-4 flex gap-2"><Btn onClick={onCancel} variant="default" size="md">{t.cancel}</Btn><button onClick={onConfirm} className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${confirmClass}`}>{confirmLabel}</button></div>
      </div>
    </div>
  );
};

// ── Rejection Reason CRUD ──────────────────────────────────────────────────────
const RejectionReasonCrudModal = ({reasons,onChange,onClose}) => {
  const t = useLang();
  const [local,setLocal] = useState([...reasons]);
  const [newVal,setNewVal] = useState("");
  const [englishNew,setEnglishNew] = useState("");
  const [lastAutoNew,setLastAutoNew] = useState("");
  const exampleEn = ["Link is inaccessible", "Duplicate submission", "Does not meet requirements"][Math.floor(Math.random()*3)];
  const updateNewVal = v => {
    setNewVal(v);
    const auto = hasChinese(v) ? autoTranslate(v) : "";
    if (!englishNew || englishNew === lastAutoNew) { setEnglishNew(auto); setLastAutoNew(auto); }
  };
  const addReason = () => { 
    const val = englishNew.trim() || newVal.trim();
    if (!val) return; 
    setLocal(p=>[...p,val]); 
    setNewVal(""); 
    setEnglishNew(""); 
    setLastAutoNew("");
  };
  const deleteReason = idx => setLocal(p=>p.filter((_,i)=>i!==idx));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col" style={{maxHeight:"80vh"}}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div><h2 className="text-base font-bold text-gray-900">{t.rejectionReasonsCrud}</h2><p className="text-xs text-gray-400 mt-0.5">{t.rejectionReasonsCrudHint}</p></div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-xl leading-none transition">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {local.map((r,idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex-1 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2">{r}</span>
              <Btn onClick={()=>deleteReason(idx)} variant="danger" size="sm">✕</Btn>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 space-y-3">
          <div className="space-y-2">
            <div className="flex gap-2">
              <input value={newVal} onChange={e=>updateNewVal(e.target.value)} placeholder={t.reasonPh}
                onKeyDown={e=>{if(e.key==="Enter")addReason();}}
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"/>
              <Btn onClick={addReason} variant="primary" size="sm">{t.addReason}</Btn>
            </div>
            {(hasChinese(newVal) || englishNew) && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-semibold">EN:</span>
                <input value={englishNew} onChange={e=>setEnglishNew(e.target.value)} placeholder={exampleEn}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-indigo-400"/>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Btn onClick={onClose} variant="default" size="md">{t.cancel}</Btn>
            <button onClick={()=>{onChange(local);onClose();}} className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition">{t.saveChanges}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── ReasonPopup ────────────────────────────────────────────────────────────────
const ReasonPopup = ({reasons,onConfirm,onCancel}) => {
  const t = useLang();
  const [sel,setSel] = useState("");
  const [other,setOther] = useState("");
  const lastReason = reasons[reasons.length-1];
  const isOther = sel===lastReason;
  const final = isOther ? other.trim() : sel;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">{t.rejectSubmission}</p>
          <p className="text-xs text-gray-400 mt-0.5">{t.rejectReasonNote}</p>
        </div>
        <div className="px-5 py-4 space-y-2">
          {reasons.map(r => (
            <button key={r} onClick={()=>setSel(r)} className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm font-medium transition ${sel===r?"border-indigo-400 bg-indigo-50 text-indigo-700":"border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{r}</button>
          ))}
          {isOther && (
            <textarea rows={3} value={other} onChange={e=>setOther(e.target.value)} placeholder={t.describeReason}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 resize-none"/>
          )}
        </div>
        <div className="px-5 pb-5 flex gap-2">
          <Btn onClick={onCancel} variant="default" size="md">{t.cancel}</Btn>
          <button onClick={()=>final&&onConfirm(final)} disabled={!final} className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${!final?"opacity-40 cursor-not-allowed bg-gray-100 text-gray-400":"bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"}`}>{t.confirmRejection}</button>
        </div>
      </div>
    </div>
  );
};

const ImageUploadField = ({value,onChange,label,hint}) => {
  const t = useLang();
  const ref = useRef(null);
  const handle = e => { const f=e.target.files?.[0]; if(!f||!f.type.startsWith("image/"))return; const r=new FileReader(); r.onload=ev=>onChange(ev.target.result); r.readAsDataURL(f); };
  return (
    <SectionCard title={label} accent>
      <p className="text-xs text-gray-400 mb-3">{hint}</p>
      {value ? (
        <div className="relative"><img src={value} alt="" className="w-full rounded-xl border border-gray-200 object-cover max-h-48"/><button onClick={()=>onChange(null)} className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full text-sm flex items-center justify-center hover:bg-black/70">×</button></div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition">
          <span className="text-2xl mb-2">🖼</span><span className="text-xs text-gray-400 font-medium">{t.uploadImage}</span>
          <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle}/>
        </label>
      )}
    </SectionCard>
  );
};

// ── Comment Templates Editor ───────────────────────────────────────────────────
const CommentTemplatesEditor = ({templates,setTemplates,onDirty}) => {
  const t = useLang();
  const [tplTab,setTplTab] = useState("en");
  const addTpl = () => { setTemplates(p=>[...p,{id:`tpl_${Date.now()}`,en:"",zh:""}]); onDirty?.(); };
  const removeTpl = id => { setTemplates(p=>p.filter(tp=>tp.id!==id)); onDirty?.(); };
  const updateTpl = (id,lang,val) => { setTemplates(p=>p.map(tp=>tp.id!==id?tp:{...tp,[lang]:val})); onDirty?.(); };
  return (
    <SectionCard title={t.commentTemplates}>
      <p className="text-xs text-gray-400 mb-3">{t.commentTemplatesHint}</p>
      <div className="flex border-b border-gray-200 gap-0.5 -mx-6 px-6 mb-4">
        {["en","zh"].map(l=>(
          <button key={l} onClick={()=>setTplTab(l)} className={`px-4 py-2 text-xs font-bold border-b-2 -mb-px transition ${tplTab===l?"border-indigo-500 text-indigo-600":"border-transparent text-gray-400 hover:text-gray-600"}`}>{l==="en"?"🇬🇧 English":"🇨🇳 中文"}</button>
        ))}
      </div>
      <div className="space-y-3">
        {templates.map((tpl,i) => (
          <div key={tpl.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Template {i+1}</span>
              <button onClick={()=>removeTpl(tpl.id)} className="text-gray-300 hover:text-rose-400 text-xl leading-none">×</button>
            </div>
            <textarea rows={3} value={tpl[tplTab]||""} onChange={e=>updateTpl(tpl.id,tplTab,e.target.value)} placeholder={t.templatePh} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 resize-none bg-white"/>
          </div>
        ))}
        <button onClick={addTpl} className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition">{t.addTemplate}</button>
      </div>
    </SectionCard>
  );
};

// ── Form Preview ───────────────────────────────────────────────────────────────
const FormPreview = ({form,lang}) => {
  const L = obj => typeof obj==="object"?(obj[lang]||obj.en||""):(obj||"");
  return (
    <div className="flex justify-center py-2">
      <div className="w-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="w-full h-14 bg-gradient-to-r from-indigo-100 to-violet-100 flex items-center justify-center"><span className="text-xs text-indigo-300 font-medium">Form Banner</span></div>
        <div className="px-4 pt-3 pb-2.5 border-b border-gray-100">
          <p className="font-bold text-sm text-gray-900">{L(form.banner.title)||"Form Title"}</p>
          {L(form.banner.description)&&<p className="text-xs text-gray-500 mt-0.5">{L(form.banner.description)}</p>}
        </div>
        <div className="px-4 py-3 space-y-3.5">
          {form.questions.map((q,i)=>(
            <div key={q.id} className="space-y-1">
              <p className="text-xs font-bold text-gray-800">{i+1}. {L(q.question)||`Question ${i+1}`}</p>
              {L(q.description)&&<p className="text-xs text-gray-400">{L(q.description)}</p>}
              {q.type==="shortAnswer"&&<div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-300 bg-gray-50">{L(q.placeholder)||"Your answer..."}</div>}
              {q.type==="fileUpload"&&<div className="border-2 border-dashed border-gray-200 rounded-lg py-3 flex flex-col items-center gap-1 bg-gray-50"><span className="text-base">📎</span><span className="text-xs text-gray-300">Tap to upload images</span></div>}
              {q.type==="checkbox"&&<div className="flex items-center gap-2 mt-1"><div className="w-4 h-4 border-2 border-gray-300 rounded shrink-0"/><span className="text-xs text-gray-500">I have read and agree to the terms above.</span></div>}
            </div>
          ))}
          {form.questions.length===0&&<p className="text-xs text-gray-300 text-center py-3 italic">No questions added yet.</p>}
        </div>
        <div className="px-4 pb-4 pt-1"><div className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold text-center">Submit</div></div>
      </div>
    </div>
  );
};

// ── FormBuilder ────────────────────────────────────────────────────────────────
const FormBuilder = ({form,setForm,defaultForm,onSetDefault,onUseDefault,disableAddQuestion=false,hidePreview=false}) => {
  const t = useLang();
  const lang = useContext(LangCtx);
  const [el,setEl] = useState("zh");
  const [showAddQ,setShowAddQ] = useState(false);
  const [showPreview,setShowPreview] = useState(false);
  const [previewLang,setPreviewLang] = useState("en");
  const L = obj => typeof obj==="object"&&obj!==null?obj[el]||"":obj||"";
  const setBannerTxt = (k,v) => setForm(p=>({...p,banner:{...p.banner,[k]:{...p.banner[k],[el]:v}}}));
  const addQ = type => {
    const id=`q_${Date.now()}`;
    const base={id,type,question:{en:"",zh:""},description:{en:"",zh:""}};
    const extra=type==="shortAnswer"?{placeholder:{en:"",zh:""}}:{};
    setForm(p=>{
      const qs=[...p.questions];
      const li=qs.length-1;
      const ins=li>=0&&qs[li].type==="checkbox"?li:qs.length;
      qs.splice(ins,0,{...base,...extra});
      return {...p,questions:qs};
    });
    setShowAddQ(false);
  };
  const delQ = id => setForm(p=>({...p,questions:p.questions.filter(q=>q.id!==id)}));
  const reorderQ = (idx,dir) => setForm(p=>{
    const qs=[...p.questions],ni=idx+dir;
    if(ni<0||ni>=qs.length)return p;
    if(ni===qs.length-1&&qs[qs.length-1].type==="checkbox")return p;
    [qs[idx],qs[ni]]=[qs[ni],qs[idx]];
    return {...p,questions:qs};
  });
  const updQTxt = (id,k,v) => setForm(p=>({...p,questions:p.questions.map(q=>q.id!==id?q:{...q,[k]:{...q[k],[el]:v}})}));
  const lastIdx = form.questions.length-1;
  const isMandatory = idx => idx===lastIdx&&form.questions[idx]?.type==="checkbox";
  const effMax = form.questions[lastIdx]?.type==="checkbox"?lastIdx-1:lastIdx;
  const qTypeCol = type => type==="shortAnswer"?"bg-blue-50 text-blue-600 border-blue-100":"bg-violet-50 text-violet-600 border-violet-100";
  const qTypeLbl = type => type==="shortAnswer"?(lang==="zh"?"简答":"Short Answer"):(lang==="zh"?"图片上传":"File Upload");
  return (
    <div className="space-y-3">
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowPreview(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{maxHeight:"90vh"}}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white shrink-0">
              <p className="text-sm font-bold text-gray-900">{t.preview}</p>
              <div className="flex items-center gap-2">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  {["en","zh"].map(l=><button key={l} onClick={()=>setPreviewLang(l)} className={`px-3 py-1 text-xs font-bold transition ${previewLang===l?"bg-indigo-600 text-white":"bg-white text-gray-500 hover:bg-gray-50"}`}>{l==="en"?"🇬🇧 EN":"🇨🇳 ZH"}</button>)}
                </div>
                <button onClick={()=>setShowPreview(false)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-lg leading-none ml-1">×</button>
              </div>
            </div>
            <div className="overflow-y-auto px-6 py-5"><FormPreview form={form} lang={previewLang}/></div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-ends gap-1.5 flex-nowrap">
        <div className="flex items-center gap-1.5 shrink-0">
          {!hidePreview && <button onClick={()=>{setPreviewLang("en");setShowPreview(true);}} className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 transition whitespace-nowrap">👁 {t.preview}</button>}
        </div>
        <div className="flex gap-1 shrink-0">
          {!disableAddQuestion && <>
            <button disabled={!defaultForm} onClick={onUseDefault} className={`px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 transition whitespace-nowrap ${!defaultForm?"opacity-40 cursor-not-allowed":"hover:bg-gray-50"}`}>📋 {t.useDefault}</button>
            <button onClick={onSetDefault} className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 transition whitespace-nowrap">⭐ {t.setAsDefault}</button>
          </>}
        </div>
      </div>
      <SectionCard title={t.formBanner} accent>
        <Field label="中文 Title" mb="mb-0"><TextIn value={form.banner.title?.zh||""} onChange={v=>setForm(p=>({...p,banner:{...p.banner,title:{...p.banner.title,zh:v}}}))} ph="Chinese banner title..."/></Field>
        {form.banner.title?.en && <div className="flex mt-1 items-start gap-3 mb-2"><span className="text-xs text-gray-500 font-semibold">EN:</span><input value={form.banner.title?.en||""} onChange={v=>setForm(p=>({...p,banner:{...p.banner,title:{...p.banner.title,en:v}}}))} placeholder="English title..." className="flex-1 text-sm outline-none items-center focus:text-indigo-600 bg-transparent"/></div>}
        <Field label="中文 Description" mb="mb-0"><TextIn value={form.banner.description?.zh||""} onChange={v=>setForm(p=>({...p,banner:{...p.banner,description:{...p.banner.description,zh:v}}}))} multiline rows={2} ph="Chinese banner description..."/></Field>
        {form.banner.description?.en && <div className="flex mt-1 items-start gap-3"><span className="text-xs text-gray-500 font-semibold">EN:</span><textarea value={form.banner.description?.en||""} onChange={v=>setForm(p=>({...p,banner:{...p.banner,description:{...p.banner.description,en:v}}}))} placeholder="English description..." rows={2} className="flex-1 text-sm outline-none focus:text-indigo-600 bg-transparent resize-none"/></div>}
      </SectionCard>
      {form.questions.map((q,idx)=>{
        const mandatory = isMandatory(idx);
        return (
          <div key={q.id} className={`rounded-2xl border shadow-sm overflow-hidden ${mandatory?"bg-amber-50/30 border-amber-200":"bg-white border-gray-100"}`}>
            <div className={`px-4 py-2 border-b flex items-center justify-between ${mandatory?"border-amber-100 bg-amber-50/60":"border-gray-100 bg-gray-50/80"}`}>
              <div className="flex items-center gap-2">
                {!disableAddQuestion && !mandatory && (
                  <div className="flex flex-col gap-0.5">
                    <button onClick={()=>reorderQ(idx,-1)} disabled={idx===0} className={`w-4 h-4 flex items-center justify-center text-gray-300 hover:text-indigo-500 text-[10px] ${idx===0?"opacity-20 cursor-not-allowed":""}`}>▲</button>
                    <button onClick={()=>reorderQ(idx,1)} disabled={idx===effMax} className={`w-4 h-4 flex items-center justify-center text-gray-300 hover:text-indigo-500 text-[10px] ${idx===effMax?"opacity-20 cursor-not-allowed":""}`}>▼</button>
                  </div>
                )}
                <span className="text-xs font-bold text-gray-400 font-mono">Q{idx+1}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-semibold border ${mandatory?"bg-emerald-50 text-emerald-600 border-emerald-100":qTypeCol(q.type)}`}>{mandatory?"Checkbox":qTypeLbl(q.type)}</span>
                {mandatory&&<span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 font-semibold">🔒 Mandatory</span>}
              </div>
              {!disableAddQuestion && !mandatory&&<button onClick={()=>delQ(q.id)} className="text-gray-300 hover:text-rose-400 text-xl leading-none">×</button>}
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <Field label={t.questionLbl} mb="mb-0"><TextIn value={q.question?.zh||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,question:{...qx.question,zh:v}})}))} ph="Chinese question..."/></Field>
              {q.question?.en && <div className="flex items-center gap-3 ml-0"><span className="text-xs text-gray-500 font-semibold">EN:</span><input value={q.question?.en||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,question:{...qx.question,en:v}})}))} placeholder="English translation..." className="flex-1 text-xs outline-none focus:text-indigo-600 bg-transparent"/></div>}
              <Field label={t.questionDescLbl} mb="mb-0"><TextIn value={q.description?.zh||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,description:{...qx.description,zh:v}})}))} multiline rows={2} ph="Chinese help text..."/></Field>
              {q.description?.en && <div className="flex items-start gap-3 ml-0"><span className="text-xs text-gray-500 font-semibold">EN:</span><textarea value={q.description?.en||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,description:{...qx.description,en:v}})}))} placeholder="English translation..." rows={2} className="flex-1 text-xs outline-none focus:text-indigo-600 bg-transparent resize-none"/></div>}
              {q.type==="shortAnswer"&&<><Field label={t.placeholder} mb="mb-0"><TextIn value={q.placeholder?.zh||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,placeholder:{...qx.placeholder,zh:v}})}))} ph="Chinese placeholder..."/></Field>{q.placeholder?.en && <div className="flex items-center gap-3 ml-0"><span className="text-xs text-gray-500 font-semibold">EN:</span><input value={q.placeholder?.en||""} onChange={v=>setForm(p=>({...p,questions:p.questions.map(qx=>qx.id!==q.id?qx:{...qx,placeholder:{...qx.placeholder,en:v}})}))} placeholder="English translation..." className="flex-1 text-xs outline-none focus:text-indigo-600 bg-transparent"/></div>}</> }
              {mandatory&&<div className="bg-amber-50 rounded-xl border border-amber-100 px-3 py-2.5"><p className="text-xs text-amber-600 italic">This Terms &amp; Conditions checkbox is mandatory and always the last question. It cannot be removed.</p></div>}
            </div>
          </div>
        );
      })}
      {!disableAddQuestion && !showAddQ && (
        <button onClick={()=>setShowAddQ(true)} className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-500 text-sm font-semibold hover:border-indigo-400 hover:bg-indigo-50/30 transition">{t.addQuestion}</button>
      )}
      {!disableAddQuestion && showAddQ && (
        <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-3 space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.selectQType}</p>
          <div className="grid grid-cols-2 gap-2">
            {Q_TYPES.map(qt=>(
              <button key={qt.v} onClick={()=>addQ(qt.v)} className="flex flex-col items-center gap-1.5 px-3 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 transition">
                <span className="text-xl">{qt.icon}</span>{lang==="zh"?qt.zh:qt.en}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic px-1">Added above the mandatory T&amp;C checkbox.</p>
          <button onClick={()=>setShowAddQ(false)} className="text-xs text-gray-400 hover:text-gray-600 transition">{t.cancel}</button>
        </div>
      )}
    </div>
  );
};

// ── EditCategoryDrawer ─────────────────────────────────────────────────────────
const EditCategoryDrawer = ({category,onClose,onSave}) => {
  const t = useLang();
  const [name,setName] = useState(category.name||"");
  const [englishName,setEnglishName] = useState(category.nameEn||"");
  const [lastAutoName,setLastAutoName] = useState(category.nameEn||"");
  const updateName = v => {
    setName(v);
    const auto = hasChinese(v) ? autoTranslate(v) : "";
    if (!englishName || englishName === lastAutoName) { setEnglishName(auto); setLastAutoName(auto); }
  };
  return (
    <DrawerShell title={name||t.editGroupTitle} subtitle={t.editGroupTitle} onClose={onClose}
      footer={<><Btn onClick={onClose} variant="default" size="md">{t.cancel}</Btn><button onClick={()=>{onSave({...category,name,nameEn:englishName.trim()||undefined});onClose();}} className="flex-1 py-2.5 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition">{t.saveChanges}</button></>}>
      <SectionCard title={t.basicInfo}>
        <Field label={t.categoryName}><TextIn value={name} onChange={updateName} ph={t.categoryNamePh}/></Field>
        {(hasChinese(name) || englishName) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishName} onChange={setEnglishName} ph="" size="sm" className="flex-1"/></div></Field>}
      </SectionCard>
    </DrawerShell>
  );
};

// ── EditTaskDrawer ─────────────────────────────────────────────────────────────
const EditTaskDrawer = ({task,categories,sharedFollowForm,sharedCommentForm,onClose,onSave,onSaveForm,defaultForm,onSetDefaultForm}) => {
  const t = useLang();
  const lang = useContext(LangCtx);
  const isSpecial = NO_URL_TASK_IDS.has(task.id);
  const cfg = TASK_TYPE_CONFIG[task.type]||{};
  const [dirty,setDirty] = useState(false);
  const [name,setName] = useState(task.name||"");
  const [englishName,setEnglishName] = useState(task.nameEn||"");
  const [lastAutoName,setLastAutoName] = useState(task.nameEn||"");
  const [desc,setDesc] = useState(task.desc||"");
  const [englishDesc,setEnglishDesc] = useState(task.descEn||"");
  const [lastAutoDesc,setLastAutoDesc] = useState(task.descEn||"");
  const [reward,setReward] = useState(task.reward);
  const [url,setUrl] = useState(task.url||"");
  const [catId,setCatId] = useState(task._catId||categories[0]?.id||"");
  const [helpTooltip,setHelpTooltip] = useState(task.helpTooltip||"");
  const [taskImage,setTaskImage] = useState(task.taskImage||null);
  const [templates,setTemplates] = useState(task.templates?JSON.parse(JSON.stringify(task.templates)):JSON.parse(JSON.stringify(INIT_COMMENT_TEMPLATES)));
  const d = setter => v => { setter(v); setDirty(true); };
  const updateName = v => { setName(v); setDirty(true); const auto = hasChinese(v) ? autoTranslate(v) : ""; if (!englishName || englishName === lastAutoName) { setEnglishName(auto); setLastAutoName(auto); } };
  const updateDesc = v => { setDesc(v); setDirty(true); const auto = hasChinese(v) ? autoTranslate(v) : ""; if (!englishDesc || englishDesc === lastAutoDesc) { setEnglishDesc(auto); setLastAutoDesc(auto); } };
  const showUrlField = cfg.hasUrl&&!isSpecial;
  const imageHint = task.type==="follow"?t.taskImageHintFollow:t.taskImageHintComment;
  const save = () => {
    const newGroupId = catId===task._catId?(task._groupId||"none"):"none";
    onSave({...task,name,nameEn:englishName.trim()||undefined,desc,descEn:englishDesc.trim()||undefined,reward,url:showUrlField?url:task.url,helpTooltip,taskImage:isSpecial?null:taskImage,templates:task.type==="comment"?templates:null,_newCatId:catId,_newGroupId:newGroupId});
    onClose();
  };
  const saveBtnCls = dirty?"bg-amber-500 text-white hover:bg-amber-600 border border-amber-500":"bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600";
  return (
    <DrawerShell title={task.name||""} subtitle={`${t.editTask} · ${TYPE_LABELS[lang][task.type]||task.type}`} onClose={onClose}
      footer={<><Btn onClick={onClose} variant="default" size="md">{t.cancel}</Btn><button onClick={save} className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition ${saveBtnCls}`}>{dirty&&<span className="mr-1.5 opacity-70">●</span>}{t.saveChanges}</button></>}>
      <>
          <SectionCard title={t.basicInfo}>
            <Field label={t.category} hint={t.categoryHint}><SelectIn value={catId} onChange={d(setCatId)}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</SelectIn></Field>
            <Field label={t.taskName}><TextIn value={name} onChange={updateName} ph={t.taskNamePh}/></Field>
            {(hasChinese(name) || englishName) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishName} onChange={setEnglishName} ph="" size="sm" className="flex-1"/></div></Field>}
            <Field label={t.description}><TextIn value={desc} onChange={updateDesc} multiline rows={3} ph={t.descPh}/></Field>
            {(hasChinese(desc) || englishDesc) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishDesc} onChange={setEnglishDesc} ph="" size="sm" className="flex-1"/></div></Field>}
          </SectionCard>
          <SectionCard title={t.helpTooltip} badge={t.optional}>
            <p className="text-xs text-gray-400 mb-3">{t.helpTooltipHint}</p>
            <TextIn value={helpTooltip} onChange={d(setHelpTooltip)} multiline rows={3} ph={t.helpTooltipPh}/>
          </SectionCard>
          <SectionCard title={t.rewardSection}>
            <Field label={t.creditPoints}>
              <div className="flex items-center gap-3">
                <input type="number" min={0} value={reward} onChange={e=>{setReward(Number(e.target.value));setDirty(true);}} className="w-32 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"/>
                <span className="text-sm text-gray-400">{t.pts}</span>
              </div>
            </Field>
          </SectionCard>
          {showUrlField && <SectionCard title={t.targetUrl}><Field label={t.targetUrlLabel(name)} hint={t.targetUrlHint}><TextIn value={url} onChange={d(setUrl)} ph="https://..."/></Field></SectionCard>}
          {!isSpecial && <ImageUploadField value={taskImage} onChange={v=>{setTaskImage(v);setDirty(true);}} label={t.taskImage} hint={imageHint}/>}
          {task.type==="comment" && <CommentTemplatesEditor templates={templates} setTemplates={setTemplates} onDirty={()=>setDirty(true)}/>}
      </>
    </DrawerShell>
  );
};

// ── CreateTaskModal ────────────────────────────────────────────────────────────
const CreateTaskModal = ({categories,onClose,onSave}) => {
  const t = useLang();
  const lang = useContext(LangCtx);
  const [taskType,setTaskType] = useState("follow");
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [reward,setReward] = useState(0);
  const [catId,setCatId] = useState(categories[0]?.id||"");
  const [url,setUrl] = useState("");
  const [helpTooltip,setHelpTooltip] = useState("");
  const [englishName,setEnglishName] = useState("");
  const [englishDesc,setEnglishDesc] = useState("");
  const [lastAutoName,setLastAutoName] = useState("");
  const [lastAutoDesc,setLastAutoDesc] = useState("");
  const [enableNow,setEnableNow] = useState(false);
  const [taskImage,setTaskImage] = useState(null);
  const [templates,setTemplates] = useState(JSON.parse(JSON.stringify(INIT_COMMENT_TEMPLATES)));
  const getInitForm = type => type==="follow"?JSON.parse(JSON.stringify(INIT_FOLLOW_FORM)):JSON.parse(JSON.stringify(INIT_COMMENT_FORM));
  const [localForm,setLocalForm] = useState(getInitForm("follow")); // preview-only
  const [showFormPreview,setShowFormPreview] = useState(false);
  const [previewLang,setPreviewLang] = useState("en");
  const cfg = TASK_TYPE_CONFIG[taskType];
  const valid = name.trim();
  const imageHint = taskType==="follow"?t.taskImageHintFollow:t.taskImageHintComment;
  const switchType = type => { setTaskType(type); setLocalForm(getInitForm(type)); if(type==="comment")setTemplates(JSON.parse(JSON.stringify(INIT_COMMENT_TEMPLATES))); };
  const updateName = v => {
    setName(v);
    const auto = hasChinese(v) ? autoTranslate(v) : "";
    if (!englishName || englishName === lastAutoName) { setEnglishName(auto); setLastAutoName(auto); }
  };
  const updateDesc = v => {
    setDesc(v);
    const auto = hasChinese(v) ? autoTranslate(v) : "";
    if (!englishDesc || englishDesc === lastAutoDesc) { setEnglishDesc(auto); setLastAutoDesc(auto); }
  };
  const save = () => {
    if (!valid) return;
    const task = {id:`task_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,type:taskType,name,desc,reward,ver:cfg.ver,status:enableNow?"enabled":"disabled",url,taskImage,helpTooltip,nameEn:englishName.trim()||undefined,descEn:englishDesc.trim()||undefined,templates:taskType==="comment"?templates:null};
    onSave(catId,null,task,null);
    onClose();
  };
  return (
    <ModalShell title={t.newTask} onClose={onClose}
      footer={<><Btn onClick={onClose} variant="default" size="md">{t.cancel}</Btn><button onClick={save} disabled={!valid} className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${valid?"bg-indigo-600 hover:bg-indigo-700 text-white":"opacity-40 cursor-not-allowed bg-gray-200 text-gray-400"}`}>{t.createTaskBtn}</button></>}>
      <SectionCard title={t.basicInfo}>
        <Field label={t.category} hint={t.categoryHint}><SelectIn value={catId} onChange={setCatId}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</SelectIn></Field>
        <Field label={t.taskName}><TextIn value={name} onChange={updateName} ph={t.taskNamePh}/></Field>
        {(hasChinese(name) || englishName) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishName} onChange={setEnglishName} ph="" size="sm" className="flex-1"/></div></Field>}
        <Field label={t.description}><TextIn value={desc} onChange={updateDesc} multiline rows={3} ph={t.descPh}/></Field>
        {(hasChinese(desc) || englishDesc) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishDesc} onChange={setEnglishDesc} ph="" size="sm" className="flex-1"/></div></Field>}
      </SectionCard>
      <SectionCard title={t.taskType} accent>
        <p className="text-xs text-gray-400 mb-3">{t.taskTypeHint}</p>
        <div className="grid grid-cols-2 gap-2">
          {CREATABLE_TASK_TYPES.map(type=>(
            <button key={type} onClick={()=>switchType(type)} className={`px-4 py-3 rounded-xl border text-sm font-bold transition ${taskType===type?"border-indigo-400 bg-indigo-50 text-indigo-700":"border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {TYPE_LABELS[lang][type]}{taskType===type&&<span className="ml-1.5 text-indigo-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
      </SectionCard>
      <SectionCard title={t.helpTooltip} badge={t.optional}>
        <p className="text-xs text-gray-400 mb-3">{t.helpTooltipHint}</p>
        <TextIn value={helpTooltip} onChange={setHelpTooltip} multiline rows={3} ph={t.helpTooltipPh}/>
      </SectionCard>
      <SectionCard title={t.rewardSection}>
        <Field label={t.creditPoints}>
          <div className="flex items-center gap-3">
            <input type="number" min={0} value={reward} onChange={e=>setReward(Number(e.target.value))} className="w-32 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"/>
            <span className="text-sm text-gray-400">{t.pts}</span>
          </div>
        </Field>
      </SectionCard>
      <SectionCard title={t.targetUrl}><Field label={t.targetUrlLabel(name||"Task")} hint={t.targetUrlHint}><TextIn value={url} onChange={setUrl} ph="https://..."/></Field></SectionCard>
      <ImageUploadField value={taskImage} onChange={setTaskImage} label={t.taskImage} hint={imageHint}/>
      {taskType==="comment" && <CommentTemplatesEditor templates={templates} setTemplates={setTemplates}/>}
      {showFormPreview&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowFormPreview(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{maxHeight:"90vh"}}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white shrink-0">
              <p className="text-sm font-bold text-gray-900">{t.preview}</p>
              <div className="flex items-center gap-2">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  {["en","zh"].map(l=><button key={l} onClick={()=>setPreviewLang(l)} className={`px-3 py-1 text-xs font-bold transition ${previewLang===l?"bg-indigo-600 text-white":"bg-white text-gray-500 hover:bg-gray-50"}`}>{l==="en"?"🇬🇧 EN":"🇨🇳 ZH"}</button>)}
                </div>
                <button onClick={()=>setShowFormPreview(false)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-lg leading-none ml-1">×</button>
              </div>
            </div>
            <div className="overflow-y-auto px-6 py-5"><FormPreview form={localForm} lang={previewLang}/></div>
          </div>
        </div>
      )}
      <SectionCard title={t.reviewForm}>
        <p className="text-xs text-gray-400 mb-3">{t.createReviewFormHint}</p>
        <button onClick={()=>setShowFormPreview(true)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition group">
          <div className="flex items-center gap-2"><span>📋</span><span className="font-semibold">{t.preview}</span></div>
          <span className="text-gray-300 group-hover:text-gray-500 text-xs">{t.open}</span>
        </button>
      </SectionCard>
      <SectionCard title={t.publishSettings}>
        <Field label={t.enableImmediately} hint={t.enableImmediatelyDesc}>
          <Toggle value={enableNow} onChange={setEnableNow} labelOn={t.enableImmediately} labelOff={t.disableInitially}/>
        </Field>
      </SectionCard>
    </ModalShell>
  );
};

// ── CreateCategoryModal ────────────────────────────────────────────────────────
const CreateCategoryModal = ({onClose,onSave}) => {
  const t = useLang();
  const [name,setName] = useState("");
  const [englishName,setEnglishName] = useState("");
  const [lastAutoName,setLastAutoName] = useState("");
  const [taskIcon,setTaskIcon] = useState("");
  const [ei,setEi] = useState(false);
  const valid = name.trim();
  const updateName = v => {
    setName(v);
    const auto = hasChinese(v) ? autoTranslate(v) : "";
    if (!englishName || englishName === lastAutoName) { setEnglishName(auto); setLastAutoName(auto); }
  };
  return (
    <ModalShell title={t.newCategory} onClose={onClose}
      footer={<><Btn onClick={onClose} variant="default" size="md">{t.cancel}</Btn><button onClick={()=>{if(!valid)return;onSave({name,taskIcon,enabled:ei,nameEn:englishName.trim()||undefined});onClose();}} disabled={!valid} className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${valid?"bg-indigo-600 hover:bg-indigo-700 text-white":"opacity-40 cursor-not-allowed bg-gray-200 text-gray-400"}`}>{t.createCategoryBtn}</button></>}>
      <SectionCard title={t.basicInfo}>
        <Field label={t.categoryName}><TextIn value={name} onChange={updateName} ph={t.categoryNamePh}/></Field>
        {(hasChinese(name) || englishName) && <Field mb="mb-3"><div className="flex items-center gap-3"><span className="text-xs text-gray-500 font-semibold">Translation (EN):</span><TextIn value={englishName} onChange={setEnglishName} ph="" size="sm" className="flex-1"/></div></Field>}
      </SectionCard>
      <IconPickerField value={taskIcon} onChange={setTaskIcon}/>
      <SectionCard title={t.publishSettings}><Field label={t.enableImmediately} hint={t.enableImmediatelyDesc}><Toggle value={ei} onChange={setEi} labelOn={t.enableImmediately} labelOff={t.disableInitially}/></Field></SectionCard>
    </ModalShell>
  );
};

// ── ReviewFormManagerModal ────────────────────────────────────────────────────
const ReviewFormManagerModal = ({onClose,sharedFollowForm,setSharedFollowForm,sharedCommentForm,setSharedCommentForm,defaultForm,onSetDefaultForm}) => {
  const t = useLang();
  const [formType,setFormType] = useState("follow");
  const [showPreview,setShowPreview] = useState(false);
  const [previewLang,setPreviewLang] = useState("en");
  const currentForm = formType==="follow" ? sharedFollowForm : sharedCommentForm;
  const setCurrentForm = formType==="follow" ? setSharedFollowForm : setSharedCommentForm;
  return (
    <>
      {showPreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowPreview(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{maxHeight:"90vh"}}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white shrink-0">
              <p className="text-sm font-bold text-gray-900">{t.preview}</p>
              <div className="flex items-center gap-2">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  {["en","zh"].map(l=><button key={l} onClick={()=>setPreviewLang(l)} className={`px-3 py-1 text-xs font-bold transition ${previewLang===l?"bg-indigo-600 text-white":"bg-white text-gray-500 hover:bg-gray-50"}`}>{l==="en"?"🇬🇧 EN":"🇨🇳 ZH"}</button>)}
                </div>
                <button onClick={()=>setShowPreview(false)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-lg leading-none ml-1">×</button>
              </div>
            </div>
            <div className="overflow-y-auto px-6 py-5"><FormPreview form={currentForm} lang={previewLang}/></div>
          </div>
        </div>
      )}
      <ModalShell title={t.editReviewForm} onClose={onClose}>
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex gap-2 rounded-xl bg-gray-100 p-1 w-fit">
            {[["follow","Follow"],["comment","Comment"]].map(([type,label])=>(
              <button key={type} onClick={()=>setFormType(type)} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${formType===type?"bg-white text-indigo-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`}>{label}</button>
            ))}
          </div>
          <button onClick={()=>{setPreviewLang("en");setShowPreview(true);}} className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 transition whitespace-nowrap">👁 {t.preview}</button>
        </div>
        <FormBuilder form={currentForm} setForm={setCurrentForm} defaultForm={defaultForm}
          onSetDefault={()=>onSetDefaultForm(JSON.parse(JSON.stringify(currentForm)))}
          onUseDefault={()=>{setCurrentForm(JSON.parse(JSON.stringify(defaultForm)));}} disableAddQuestion={true} hidePreview={true}/>
      </ModalShell>
    </>
  );
};

// ── SubDetailModal ─────────────────────────────────────────────────────────────
const SubDetailModal = ({sub,taskLabel,onClose,onApprove,onReject,rejectionReasons}) => {
  const t = useLang();
  const [rOpen,setROpen] = useState(false);
  if (rOpen) {
    return <ReasonPopup reasons={rejectionReasons} onCancel={()=>setROpen(false)} onConfirm={r=>{onReject(sub.id,r);onClose();}}/>;
  }
  const sc = sub.status==="pending"?"bg-amber-50 text-amber-600 border border-amber-200":sub.status==="approved"?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-rose-600 border border-rose-200";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div><p className="text-sm font-bold text-gray-900">{t.submissionDetails}</p><p className="text-xs text-gray-400 mt-0.5">{sub.user} · {sub.updated}</p></div>
          <div className="flex items-center gap-2">
            <Pill col={sc}>{sub.status==="pending"?t.pending:sub.status==="approved"?t.approved:t.rejected}</Pill>
            <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-2xl leading-none ml-2">×</button>
          </div>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.task}</p><p className="text-sm font-semibold text-gray-700">{taskLabel}</p></div>
          {sub.username && <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.socialUsername}</p><div className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"><p className="text-sm font-semibold text-indigo-600">{sub.username}</p></div></div>}
          {sub.url && <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.submissionContent}</p><div className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"><p className="text-xs text-indigo-600 break-all">{sub.url}</p></div></div>}
          {sub.reason && <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.rejectionReason}</p><div className="bg-rose-50 border border-rose-100 rounded-xl px-3.5 py-2.5"><p className="text-xs text-rose-600 font-medium">{sub.reason}</p></div></div>}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.screenshots}</p>
            <div className="grid grid-cols-3 gap-2">{[1,2,3].map(i=><div key={i} className="aspect-square rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-1"><span className="text-xl">🖼</span><span className="text-xs text-gray-300">img_{i}.png</span></div>)}</div>
            <p className="text-xs text-gray-300 mt-2 italic">{t.screenshotsMocked}</p>
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-2">
          {sub.status==="pending" && (
            <>
              <button onClick={()=>onApprove(sub.id)} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition">✓ {t.approve}</button>
              <button onClick={()=>setROpen(true)} className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-sm font-bold transition">✗ {t.reject}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── ReviewQueuePage ────────────────────────────────────────────────────────────
const ReviewQueuePage = ({subs,allTasks,onUpdateSubs,onBack,initialTaskFilter=null,rejectionReasons,onRejectionReasonsChange}) => {
  const t = useLang();
  const lang = useContext(LangCtx);
  const [filter,setFilter] = useState("pending");
  const [taskFilter,setTaskFilter] = useState(initialTaskFilter||"all");
  const [taskStatusFilter,setTaskStatusFilter] = useState(["enabled","disabled"]);
  const [search,setSearch] = useState("");
  const [sortDir,setSortDir] = useState("asc");
  const [detail,setDetail] = useState(null);
  const [inlineReject,setInlineReject] = useState(null);
  const [batchMode,setBatchMode] = useState(false);
  const [selectedIds,setSelectedIds] = useState(new Set());
  const [batchActionOpen,setBatchActionOpen] = useState(false);
  const [batchRejectMode,setBatchRejectMode] = useState(false);
  const [showReasonCrud,setShowReasonCrud] = useState(false);

  const exitBatch = () => { setBatchMode(false); setSelectedIds(new Set()); };
  const setFilterX = f => { setFilter(f); if(f!=="all"&&f!=="pending")exitBatch(); };
  const toggleSel = id => setSelectedIds(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });
  const allSubs = Object.values(subs).flat();
  const approve = (id,tid) => onUpdateSubs(tid,(subs[tid]||[]).map(s=>s.id===id?{...s,status:"approved",reason:"",updated:getNow()}:s));
  const reject = (id,tid,r) => onUpdateSubs(tid,(subs[tid]||[]).map(s=>s.id===id?{...s,status:"rejected",reason:r,updated:getNow()}:s));
  const getTask = tid => allTasks.find(tk=>tk.id===tid);
  const getTaskName = tid => { const tk=getTask(tid); return tk?tk.name:"—"; };
  const getTaskLabel = tid => { const tk=getTask(tid); if(!tk)return"—"; const cn=tk._catName||""; return cn?`${cn} — ${tk.name}`:tk.name; };
  const getTaskStatus = tid => getTask(tid)?.status||"unknown";
  const tasksWithSubs = [...new Set(allSubs.map(s=>s.taskId))].map(tid=>getTask(tid)).filter(Boolean);
  const isDTSF = taskStatusFilter.length===2;
  const filteredBase = allSubs
    .filter(s=>taskFilter==="all"||s.taskId===taskFilter)
    .filter(s=>taskStatusFilter.length===0||taskStatusFilter.includes(getTaskStatus(s.taskId)))
    .filter(s=>!search||s.user.toLowerCase().includes(search.toLowerCase()));
  const counts = { all:filteredBase.length, pending:filteredBase.filter(s=>s.status==="pending").length, approved:filteredBase.filter(s=>s.status==="approved").length, rejected:filteredBase.filter(s=>s.status==="rejected").length };
  const shown = filteredBase.filter(s=>filter==="all"||s.status===filter).sort((a,b)=>sortDir==="desc"?b.updated.localeCompare(a.updated):a.updated.localeCompare(b.updated));
  const shownPending = shown.filter(s=>s.status==="pending");
  const allShownSel = shownPending.length>0&&shownPending.every(s=>selectedIds.has(s.id));
  const toggleAll = () => { if(allShownSel)setSelectedIds(new Set()); else setSelectedIds(new Set(shownPending.map(s=>s.id))); };
  const hasFilters = taskFilter!=="all"||!isDTSF||!!search;
  const showReason = filter==="all"||filter==="rejected";
  const showBatch = filter==="all"||filter==="pending";
  const batchApprove = () => {
    const bt={};[...selectedIds].forEach(id=>{const s=allSubs.find(s=>s.id===id);if(!s)return;if(!bt[s.taskId])bt[s.taskId]=[];bt[s.taskId].push(id);});
    Object.entries(bt).forEach(([tid,ids])=>onUpdateSubs(tid,(subs[tid]||[]).map(s=>ids.includes(s.id)&&s.status==="pending"?{...s,status:"approved",reason:"",updated:getNow()}:s)));
    exitBatch(); setBatchActionOpen(false);
  };
  const batchReject = r => {
    const bt={};[...selectedIds].forEach(id=>{const s=allSubs.find(s=>s.id===id);if(!s)return;if(!bt[s.taskId])bt[s.taskId]=[];bt[s.taskId].push(id);});
    Object.entries(bt).forEach(([tid,ids])=>onUpdateSubs(tid,(subs[tid]||[]).map(s=>ids.includes(s.id)&&s.status==="pending"?{...s,status:"rejected",reason:r,updated:getNow()}:s)));
    exitBatch(); setBatchActionOpen(false); setBatchRejectMode(false);
  };
  const statusLbl = s => s==="pending"?t.pending:s==="approved"?t.approved:t.rejected;
  const subPillCol = s => s==="pending"?"bg-amber-50 text-amber-600 border border-amber-200":s==="approved"?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-50 text-rose-600 border border-rose-200";
  const selectedItems = [...selectedIds].map(id=>allSubs.find(s=>s.id===id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-100">
      {detail && <SubDetailModal sub={detail} taskLabel={getTaskLabel(detail.taskId)} rejectionReasons={rejectionReasons} onClose={()=>setDetail(null)} onApprove={id=>{approve(id,detail.taskId);setDetail(p=>({...p,status:"approved",reason:"",updated:getNow()}));}} onReject={(id,r)=>{reject(id,detail.taskId,r);setDetail(null);}}/>}
      {inlineReject && <ReasonPopup reasons={rejectionReasons} onCancel={()=>setInlineReject(null)} onConfirm={r=>{reject(inlineReject.id,inlineReject.taskId,r);setInlineReject(null);}}/>}
      {batchActionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setBatchActionOpen(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100"><p className="text-sm font-bold text-gray-900">{t.processBatch(selectedIds.size)}</p><p className="text-xs text-gray-400 mt-0.5">{t.batchProcessDesc}</p></div>
            <div className="px-5 py-4 space-y-3">
              {selectedItems.length>0 && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                  <p className="font-semibold text-gray-900 mb-2">Selected submissions</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-600">
                      <thead>
                        <tr>
                          <th className="pb-2 pr-4 font-medium">User</th>
                          <th className="pb-2 pr-4 font-medium">Task</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedItems.map(item => (
                          <tr key={item.id}>
                            <td className="py-2 pr-4 truncate">{item.user}</td>
                            <td className="py-2 pr-4 truncate">{getTaskName(item.taskId)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={batchApprove} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition">✓ {t.batchApproveAll}</button>
                <button onClick={()=>{setBatchActionOpen(false);setBatchRejectMode(true);}} className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-sm font-bold transition">✗ {t.batchRejectAll}</button>
              </div>
            </div>
            <div className="px-5 pb-4"><Btn onClick={()=>setBatchActionOpen(false)} variant="default" size="md">{t.cancel}</Btn></div>
          </div>
        </div>
      )}
      {batchRejectMode && <ReasonPopup reasons={rejectionReasons} onCancel={()=>setBatchRejectMode(false)} onConfirm={batchReject}/>}
      {showReasonCrud && <RejectionReasonCrudModal reasons={rejectionReasons} onChange={onRejectionReasonsChange} onClose={()=>setShowReasonCrud(false)}/>}
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-1.5 text-sm">
          <button onClick={onBack} className="text-gray-400 hover:text-indigo-600 font-medium transition">{t.adminPanel}</button>
          <span className="text-gray-200">/</span>
          <button onClick={onBack} className="text-gray-400 hover:text-indigo-600 font-medium transition">{t.taskCentre}</button>
          <span className="text-gray-200">/</span>
          <span className="text-gray-800 font-bold">{t.reviewQueue}</span>
        </div>
        <Btn onClick={onBack} variant="default">{t.back}</Btn>
      </div>
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h1 className="text-xl font-bold text-gray-900">{t.reviewQueue}</h1>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
            {["all","pending","approved","rejected"].map(f=>(
              <button key={f} onClick={()=>setFilterX(f)} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${filter===f?"bg-indigo-600 text-white":"text-gray-400 hover:text-gray-700"}`}>
                {f==="all"?t.all:f==="pending"?t.pending:f==="approved"?t.approved:t.rejected} <span className="opacity-60">({counts[f]})</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-2 flex-wrap items-center justify-between">
          <div className="flex gap-2 flex-wrap items-center">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 font-medium">
              <span>{t.filterByTask}:</span>
              <select value={taskFilter} onChange={e=>setTaskFilter(e.target.value)} className="outline-none bg-transparent text-xs font-semibold text-gray-700 max-w-[100px]">
                <option value="all">{t.all}</option>
                {tasksWithSubs.map(tk=><option key={tk.id} value={tk.id}>{tk.name}</option>)}
              </select>
            </div>
            <MultiStatusFilter value={taskStatusFilter} onChange={setTaskStatusFilter} label={t.filterByStatus}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchUser} className="border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-400 bg-white"/>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {showBatch && (!batchMode ? (
              <Btn onClick={()=>{setBatchMode(true);setSelectedIds(new Set());}} variant="default" size="sm">{t.batchOperation}</Btn>
            ) : (
              <>
                <button onClick={()=>selectedIds.size>0&&setBatchActionOpen(true)} disabled={selectedIds.size===0} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${selectedIds.size>0?"bg-indigo-600 text-white border-indigo-600":"opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"}`}>{t.processBatch(selectedIds.size)}</button>
                <Btn onClick={exitBatch} variant="default" size="sm">{t.cancel}</Btn>
              </>
            ))}
            <button onClick={()=>setShowReasonCrud(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 transition">{t.manageRejectionReasons}</button>
          </div>
        </div>
        {hasFilters && (
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 mb-3 w-fit">
            <span>{t.activeFilters}</span>
            {taskFilter!=="all"&&<span className="bg-indigo-100 rounded-lg px-2 py-0.5">{getTaskName(taskFilter)}</span>}
            {!isDTSF&&taskStatusFilter.length>0&&<span className="bg-indigo-100 rounded-lg px-2 py-0.5">{taskStatusFilter.join(", ")}</span>}
            {search&&<span className="bg-indigo-100 rounded-lg px-2 py-0.5">"{search}"</span>}
            <button onClick={()=>{setTaskFilter("all");setTaskStatusFilter(["enabled","disabled"]);setSearch("");}} className="ml-1 text-indigo-400 hover:text-indigo-700">×</button>
          </div>
        )}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {batchMode&&<th className="px-4 py-3.5"><input type="checkbox" checked={allShownSel} onChange={toggleAll} className="accent-indigo-600 w-3.5 h-3.5 rounded cursor-pointer"/></th>}
                  {[t.user,t.taskNameCol,t.status,t.submissionContent,t.submissionTime].map(h=>(
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                  {showReason&&<th className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-rose-400">{t.rejectionReason}</th>}
                  <th className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">{t.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {shown.length===0&&<tr><td colSpan={6 + (batchMode?1:0) + (showReason?1:0)} className="text-center py-14 text-gray-300 text-sm">{t.noSubmissions}</td></tr>}
                {shown.map(sub=>{
                  const ts = getTaskStatus(sub.taskId);
                  return (
                    <tr key={sub.id} className={`hover:bg-indigo-50/20 transition ${batchMode&&selectedIds.has(sub.id)?"bg-indigo-50/40":""}`}>
                      {batchMode&&<td className="px-4 py-3.5">{sub.status==="pending"?<input type="checkbox" checked={selectedIds.has(sub.id)} onChange={()=>toggleSel(sub.id)} className="accent-indigo-600 w-3.5 h-3.5 rounded cursor-pointer"/>:<span className="w-3.5 h-3.5 block"/>}</td>}
                      <td className="px-5 py-3.5 font-semibold text-gray-700">{sub.user}</td>
                      <td className="px-5 py-3.5"><div className="flex items-center gap-1.5 flex-wrap"><span className="text-xs text-gray-500 font-medium">{getTaskName(sub.taskId)}</span>{ts==="disabled"&&<Pill col="bg-gray-100 text-gray-400 border border-gray-200">{t.disabled}</Pill>}</div></td>
                      <td className="px-5 py-3.5"><Pill col={subPillCol(sub.status)}>{statusLbl(sub.status)}</Pill></td>
                      <td className="px-5 py-3.5"><button onClick={()=>setDetail(sub)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition">🔍 {t.viewSubmission}</button></td>
                      <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap font-mono">{sub.updated}</td>
                      {showReason&&<td className="px-5 py-3.5">{sub.reason?<span className="text-xs text-rose-500 font-medium">{sub.reason}</span>:<span className="text-xs text-gray-200">—</span>}</td>}
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5">
                          {sub.status==="pending"&&!batchMode&&<><Btn onClick={()=>approve(sub.id,sub.taskId)} variant="success">{t.approve}</Btn><Btn onClick={()=>setInlineReject({id:sub.id,taskId:sub.taskId})} variant="danger">{t.reject}</Btn></>}
                          {sub.status!=="pending"&&<Btn onClick={()=>setDetail(sub)} variant="ghost">{t.view}</Btn>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── TaskTable ──────────────────────────────────────────────────────────────────
const TaskTable = ({categories,subs,statusFilter,onToggleCat,onToggleGroup,onSetTaskStatus,onEditCat,onEditGroup,onEditTask,onDeleteTask,onDeleteCategory,onQueue,onReorderCat,onReorderUnit,onReorderTask}) => {
  const t = useLang();
  const lang = useContext(LangCtx);
  const [expCats,setExpCats] = useState(()=>{ const o={}; categories.forEach(c=>{o[c.id]=true;}); return o; });
  const [expGrps,setExpGrps] = useState(()=>{ const o={}; categories.forEach(c=>{c.taskGroups.forEach(g=>{o[g.id]=true;});}); return o; });
  const [confirm,setConfirm] = useState(null);
  const getPending = id => (subs[id]||[]).filter(s=>s.status==="pending").length;
  const hasSubs = id => (subs[id]||[]).length>0;
  const ask = (title,note,lbl,fn,cls) => setConfirm({title,note,confirmLabel:lbl,onConfirm:fn,confirmClass:cls});
  const taskMatch = task => statusFilter.length===0||statusFilter.includes(task.status);
  const getUnits = cat => [...cat.taskGroups.map(g=>({type:"group",item:g})),...(cat.looseTasks||[]).map(tk=>({type:"loose",item:tk}))];
  const RB = ({onUp,onDown,du,dd}) => (
    <div className="flex flex-col gap-0.5 mr-1 shrink-0">
      <button onClick={onUp} disabled={du} className={`w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 transition text-xs ${du?"opacity-20 cursor-not-allowed":""}`}>▲</button>
      <button onClick={onDown} disabled={dd} className={`w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 transition text-xs ${dd?"opacity-20 cursor-not-allowed":""}`}>▼</button>
    </div>
  );
  const taskMenu = (task,catId,gid) => {
    const nm = task.name;
    const pending = getPending(task.id);
    const items = [];
    if (hasSubs(task.id)) items.push({label:t.viewSubmissions, onClick:()=>onQueue(task.id)});
    items.push({label:t.edit, onClick:()=>onEditTask(task,catId,gid)});
    items.push(task.status==="enabled"
      ? {label:t.disable, warning:true, onClick:()=>ask(t.disableTitle(nm),t.disableNote,t.disable,()=>onSetTaskStatus(catId,gid,task.id,"disabled"))}
      : {label:t.enable, onClick:()=>onSetTaskStatus(catId,gid,task.id,"enabled")}
    );
    items.push({label:t.delete, danger:true, onClick:()=>ask(t.deleteTaskTitle(nm),t.deleteTaskNote,t.delete,()=>onDeleteTask(catId,gid,task.id),"bg-rose-600 hover:bg-rose-700 text-white")});
    return {items, badge:pending};
  };
  const TaskRow = ({task,catId,gid,indent,index,onUp,onDown,du,dd}) => {
    const eon = task.status==="enabled";
    const dc = eon?"bg-emerald-400":"bg-gray-300";
    const {items:mi,badge:mb} = taskMenu(task,catId,gid);
    return (
      <tr className="border-b border-gray-50 hover:bg-indigo-50/20 transition">
        <td className={`px-4 py-3.5 ${indent} ${!eon?"opacity-50":""}`}>
          <div className="flex items-center gap-1">
            <RB onUp={onUp} onDown={onDown} du={du} dd={dd}/>
            <span className="text-xs text-gray-300 font-mono w-5 text-center shrink-0">{index !== null ? index+1 : "·"}</span>
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 mx-1.5 ${dc}`}/>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-semibold text-gray-700 text-sm">{task.name}</p>
                {task.type&&<span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${task.type==="follow"?"bg-blue-50 text-blue-500 border-blue-100":"bg-violet-50 text-violet-500 border-violet-100"}`}>{TYPE_LABELS[lang][task.type]||task.type}</span>}
                {task.helpTooltip&&<span title={task.helpTooltip} className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-100 text-indigo-500 text-[10px] font-black cursor-default shrink-0 border border-indigo-200">?</span>}
                {task.status==="disabled"&&<Pill col="bg-gray-100 text-gray-400 border border-gray-200">{t.disabled}</Pill>}
              </div>
              {task.desc&&<p className="text-xs text-gray-400 mt-0.5">{task.desc}</p>}
            </div>
          </div>
        </td>
        <td className={`px-4 py-3.5 ${!eon?"opacity-50":""}`}><span className="text-sm font-bold text-gray-800">{task.reward}</span><span className="text-xs text-gray-300 ml-1">{t.pts}</span></td>
        <td className="px-4 py-3.5"><DotMenu items={mi} badge={mb}/></td>
      </tr>
    );
  };
  return (
    <>
      {confirm&&<ConfirmDialog title={confirm.title} note={confirm.note} confirmLabel={confirm.confirmLabel} confirmClass={confirm.confirmClass} onConfirm={()=>{confirm.onConfirm();setConfirm(null);}} onCancel={()=>setConfirm(null)}/>}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {[t.task,t.reward,t.actions].map(h=><th key={h} className="text-left px-4 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/80">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat,ci)=>{
              const exp = expCats[cat.id]!==false;
              const cn = cat.name;
              const allUnits = getUnits(cat);
              const visUnits = allUnits.filter(u=>u.type==="group"||taskMatch(u.item));
              const cMenu = [
                {label:t.edit, onClick:()=>onEditCat(cat)},
                cat.enabled?{label:t.disable,warning:true,onClick:()=>ask(t.disableTitle(cn),t.disableNote,t.disable,()=>onToggleCat(cat.id))}:{label:t.enable,onClick:()=>onToggleCat(cat.id)},
              ];
              return (
                <Fragment key={cat.id}>
                  <tr className="border-b border-gray-100 bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <RB onUp={()=>onReorderCat(cat.id,-1)} onDown={()=>onReorderCat(cat.id,1)} du={ci===0} dd={ci===categories.length-1}/>
                        <button onClick={()=>setExpCats(p=>({...p,[cat.id]:!exp}))} className="text-gray-400 hover:text-indigo-600 transition w-4 text-sm shrink-0">{exp?"▾":"▸"}</button>
                        <span className="font-extrabold text-gray-900 text-base">{cn}</span>
                        {!cat.enabled&&<Pill col="bg-gray-100 text-gray-400 border border-gray-200">{t.disabled}</Pill>}
                      </div>
                    </td>
                    <td className="px-4 py-3"/><td className="px-4 py-3"><DotMenu items={cMenu}/></td>
                  </tr>
                  {exp&&visUnits.map(unit=>{
                    const aui = allUnits.findIndex(u=>u.item.id===unit.item.id);
                    if (unit.type==="group") {
                      const grp=unit.item, ge=expGrps[grp.id]!==false, eff=cat.enabled&&grp.enabled;
                      const gMenu = [{label:t.edit,onClick:()=>onEditGroup(cat.id,grp)},grp.enabled?{label:t.disable,warning:true,onClick:()=>ask(t.disableTitle(grp.name),t.disableNote,t.disable,()=>onToggleGroup(cat.id,grp.id))}:{label:t.enable,onClick:()=>onToggleGroup(cat.id,grp.id)}];
                      const visT = grp.tasks.filter(taskMatch);
                      return (
                        <Fragment key={grp.id}>
                          <tr className="border-b border-gray-100 bg-indigo-50/40">
                            <td className="px-4 py-2.5 pl-8">
                              <div className="flex items-center gap-1">
                                <RB onUp={()=>onReorderUnit(cat.id,aui,-1)} onDown={()=>onReorderUnit(cat.id,aui,1)} du={aui===0} dd={aui===allUnits.length-1}/>
                                <button onClick={()=>setExpGrps(p=>({...p,[grp.id]:!ge}))} className="text-gray-400 hover:text-indigo-600 transition w-4 text-sm shrink-0">{ge?"▾":"▸"}</button>
                                <span className={`font-bold text-sm ml-1 ${!eff?"text-gray-400":"text-gray-800"}`}>{grp.name}</span>
                                {!grp.enabled&&<Pill col="bg-gray-100 text-gray-400 border border-gray-200">{t.disabled}</Pill>}
                              </div>
                            </td>
                            <td/><td className="px-4 py-2.5"><DotMenu items={gMenu}/></td>
                          </tr>
                          {ge&&visT.map((task,ti)=>{
                            const ati = grp.tasks.findIndex(tk=>tk.id===task.id);
                            return <TaskRow key={task.id} task={task} catId={cat.id} gid={grp.id} indent="pl-16" index={ti} onUp={()=>onReorderTask(cat.id,grp.id,ati,-1)} onDown={()=>onReorderTask(cat.id,grp.id,ati,1)} du={ati===0} dd={ati===grp.tasks.length-1}/>;
                          })}
                          {ge&&visT.length===0&&grp.tasks.length>0&&<tr className="border-b border-gray-50"><td colSpan={3} className="px-6 py-3 text-xs text-gray-300 italic pl-20">No matching tasks.</td></tr>}
                        </Fragment>
                      );
                    }
                    const task = unit.item;
                    return <TaskRow key={task.id} task={task} catId={cat.id} gid={null} indent="pl-10" index={null} onUp={()=>onReorderUnit(cat.id,aui,-1)} onDown={()=>onReorderUnit(cat.id,aui,1)} du={aui===0} dd={aui===allUnits.length-1}/>;
                  })}
                  {exp&&visUnits.length===0&&allUnits.length>0&&<tr className="border-b border-gray-50"><td colSpan={3} className="px-6 py-4 text-xs text-gray-300 italic pl-10">No matching tasks.</td></tr>}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,setLang] = useState("en");
  const [categories,setCategories] = useState(INIT_CATEGORIES);
  const [subs,setSubs] = useState(INIT_SUBS);
  const [sharedFollowForm,setSharedFollowForm] = useState(JSON.parse(JSON.stringify(INIT_FOLLOW_FORM)));
  const [sharedCommentForm,setSharedCommentForm] = useState(JSON.parse(JSON.stringify(INIT_COMMENT_FORM)));
  const [rejectionReasons,setRejectionReasons] = useState([...DEFAULT_REJECTION_REASONS]);
  const [view,setView] = useState("list");
  const [queueTaskFilter,setQueueTaskFilter] = useState(null);
  const [statusFilter,setStatusFilter] = useState(["enabled","disabled"]);
  const [editCtx,setEditCtx] = useState(null);
  const [editCatCtx,setEditCatCtx] = useState(null);
  const [showCreateTask,setShowCreateTask] = useState(false);
  const [showCreateCategory,setShowCreateCategory] = useState(false);
  const [showReviewForm,setShowReviewForm] = useState(false);
  const [defaultForm,setDefaultForm] = useState(null);
  const [deletedTasks,setDeletedTasks] = useState({});

  const allActiveTasks = categories.flatMap(c=>[
    ...c.taskGroups.flatMap(g=>g.tasks.map(tk=>({...tk,_catName:c.name}))),
    ...(c.looseTasks||[]).map(tk=>({...tk,_catName:c.name}))
  ]);
  const allTasksForQueue = [...allActiveTasks,...Object.values(deletedTasks)];

  const onToggleCat = cid => setCategories(p=>p.map(c=>c.id===cid?{...c,enabled:!c.enabled}:c));
  const onToggleGroup = (cid,gid) => setCategories(p=>p.map(c=>c.id!==cid?c:{...c,taskGroups:c.taskGroups.map(g=>g.id===gid?{...g,enabled:!g.enabled}:g)}));
  const onSetTaskStatus = (cid,gid,tid,status) => setCategories(p=>p.map(c=>{
    if(c.id!==cid)return c;
    if(gid)return{...c,taskGroups:c.taskGroups.map(g=>g.id!==gid?g:{...g,tasks:g.tasks.map(tk=>tk.id===tid?{...tk,status}:tk)})};
    return{...c,looseTasks:(c.looseTasks||[]).map(tk=>tk.id===tid?{...tk,status}:tk)};
  }));
  const onReorderCat = (cid,dir) => setCategories(p=>{const i=p.findIndex(c=>c.id===cid),ni=i+dir;if(ni<0||ni>=p.length)return p;const a=[...p];[a[i],a[ni]]=[a[ni],a[i]];return a;});
  const onReorderUnit = (cid,ui,dir) => setCategories(p=>p.map(c=>{
    if(c.id!==cid)return c;
    const units=[...c.taskGroups.map(g=>({type:"group",item:g})),...(c.looseTasks||[]).map(tk=>({type:"loose",item:tk}))];
    const ni=ui+dir; if(ni<0||ni>=units.length)return c;
    const next=[...units];[next[ui],next[ni]]=[next[ni],next[ui]];
    return{...c,taskGroups:next.filter(u=>u.type==="group").map(u=>u.item),looseTasks:next.filter(u=>u.type==="loose").map(u=>u.item)};
  }));
  const onReorderTask = (cid,gid,idx,dir) => setCategories(p=>p.map(c=>{
    if(c.id!==cid)return c;
    return{...c,taskGroups:c.taskGroups.map(g=>{if(g.id!==gid)return g;const a=[...g.tasks],ni=idx+dir;if(ni<0||ni>=a.length)return g;[a[idx],a[ni]]=[a[ni],a[idx]];return{...g,tasks:a};})};
  }));
  const onSaveTask = updated => {
    const {_newCatId,_newGroupId,...task} = updated;
    setCategories(p=>{
      let cats = p.map(c=>({...c,taskGroups:c.taskGroups.map(g=>({...g,tasks:g.tasks.filter(tk=>tk.id!==task.id)})),looseTasks:(c.looseTasks||[]).filter(tk=>tk.id!==task.id)}));
      cats = cats.map(c=>{if(c.id!==_newCatId)return c;if(_newGroupId&&_newGroupId!=="none")return{...c,taskGroups:c.taskGroups.map(g=>g.id===_newGroupId?{...g,tasks:[...g.tasks,task]}:g)};return{...c,looseTasks:[...(c.looseTasks||[]),task]};});
      return cats;
    });
  };
  const onDeleteTask = (catId,groupId,taskId) => {
    const cat = categories.find(c=>c.id===catId);
    const task = cat&&(groupId&&groupId!=="none"
      ? cat.taskGroups.find(g=>g.id===groupId)?.tasks.find(tk=>tk.id===taskId)
      : (cat.looseTasks||[]).find(tk=>tk.id===taskId));
    if(task) setDeletedTasks(p=>({...p,[taskId]:{...task,_catName:cat.name}}));
    setCategories(p=>p.map(c=>{if(c.id!==catId)return c;if(groupId&&groupId!=="none")return{...c,taskGroups:c.taskGroups.map(g=>g.id===groupId?{...g,tasks:g.tasks.filter(tk=>tk.id!==taskId)}:g)};return{...c,looseTasks:(c.looseTasks||[]).filter(tk=>tk.id!==taskId)};
    }));
  };
  const onDeleteCategory = catId => setCategories(p=>p.filter(c=>c.id!==catId));
  const onSaveForm = (formType,form) => { if(formType==="follow")setSharedFollowForm(form); else if(formType==="comment")setSharedCommentForm(form); };
  const onCreateCategory = ({name,taskIcon,enabled}) => setCategories(p=>[...p,{id:`cat_${Date.now()}`,name,taskIcon:taskIcon||"",enabled,taskGroups:[],looseTasks:[]}]);
  const onCreateTask = (catId,groupId,task,form) => {
    if(form&&task.type==="follow")setSharedFollowForm(form);
    if(form&&task.type==="comment")setSharedCommentForm(form);
    setCategories(p=>p.map(c=>{if(c.id!==catId)return c;if(groupId)return{...c,taskGroups:c.taskGroups.map(g=>g.id===groupId?{...g,tasks:[...g.tasks,task]}:g)};return{...c,looseTasks:[...(c.looseTasks||[]),task]};}));
  };

  const pendingCount = Object.values(subs).flat().filter(s=>s.status==="pending").length;
  const goQueue = tid => { setQueueTaskFilter(tid||null); setView("queue"); };

  if (view==="queue") {
    return (
      <LangCtx.Provider value={lang}>
        <ReviewQueuePage subs={subs} allTasks={allTasksForQueue}
          onUpdateSubs={(tid,updated)=>setSubs(p=>({...p,[tid]:updated}))}
          onBack={()=>setView("list")} initialTaskFilter={queueTaskFilter}
          rejectionReasons={rejectionReasons} onRejectionReasonsChange={setRejectionReasons}/>
      </LangCtx.Provider>
    );
  }

  const t = T[lang];
  return (
    <LangCtx.Provider value={lang}>
      <div className="min-h-screen bg-slate-100">
        <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-1.5 text-sm"><span className="text-gray-400">{t.adminPanel}</span><span className="text-gray-200">/</span><span className="text-gray-800 font-bold">{t.taskCentre}</span></div>
          <LangToggle lang={lang} setLang={setLang}/>
        </div>
        {showCreateCategory&&<CreateCategoryModal onClose={()=>setShowCreateCategory(false)} onSave={onCreateCategory}/>}
        {showReviewForm&&<ReviewFormManagerModal onClose={()=>setShowReviewForm(false)} sharedFollowForm={sharedFollowForm} setSharedFollowForm={setSharedFollowForm} sharedCommentForm={sharedCommentForm} setSharedCommentForm={setSharedCommentForm} defaultForm={defaultForm} onSetDefaultForm={setDefaultForm}/>}
        {showCreateTask&&<CreateTaskModal categories={categories} onClose={()=>setShowCreateTask(false)} onSave={onCreateTask}/>}
        {editCatCtx&&<EditCategoryDrawer category={editCatCtx} onClose={()=>setEditCatCtx(null)} onSave={upd=>{setCategories(p=>p.map(c=>c.id===upd.id?{...c,name:upd.name,nameEn:upd.nameEn,taskIcon:upd.taskIcon}:c));setEditCatCtx(null);}}/>}
        {editCtx&&<EditTaskDrawer task={{...editCtx.task,_catId:editCtx.catId,_groupId:editCtx.groupId||"none"}} categories={categories} sharedFollowForm={sharedFollowForm} sharedCommentForm={sharedCommentForm} onClose={()=>setEditCtx(null)} onSave={u=>{onSaveTask(u);setEditCtx(null);}} onSaveForm={onSaveForm} defaultForm={defaultForm} onSetDefaultForm={setDefaultForm}/>}
        <div className="px-6 py-8 max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="mb-4"><h1 className="text-2xl font-extrabold text-gray-900">{t.taskCentre}</h1><p className="text-sm text-gray-400 mt-1">{t.manageDesc}</p></div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <MultiStatusFilter value={statusFilter} onChange={setStatusFilter} label={t.filterByStatus}/>
                <div className="w-px h-6 bg-gray-200"/>
                  <button onClick={()=>setShowReviewForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">{t.editReviewForm}</button>
                <button onClick={()=>setShowCreateTask(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">{t.createTask}</button>
              </div>
              <button onClick={()=>goQueue(null)} className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 text-sm font-semibold hover:bg-violet-100 transition">
                {t.manageSubmissions}{pendingCount>0&&<span className="bg-amber-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{pendingCount}</span>}
              </button>
            </div>
          </div>
          <TaskTable categories={categories} subs={subs} statusFilter={statusFilter}
            onToggleCat={onToggleCat} onToggleGroup={onToggleGroup} onSetTaskStatus={onSetTaskStatus}
            onEditCat={cat=>setEditCatCtx(cat)} onEditGroup={()=>{}}
            onEditTask={(task,catId,groupId)=>setEditCtx({task,catId,groupId})}
            onDeleteTask={onDeleteTask} onDeleteCategory={onDeleteCategory}
            onQueue={goQueue} onReorderCat={onReorderCat} onReorderUnit={onReorderUnit} onReorderTask={onReorderTask}/>
        </div>
      </div>
    </LangCtx.Provider>
  );
}