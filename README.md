# landing-page-ehsan

صفحة هبوط مبنية بـ [Next.js](https://nextjs.org) 16، مع React 19 و Tailwind CSS 4.

---

## 1) أي «ويب سيرفر» يشغّل هذا المشروع؟

| البيئة | ماذا يستمع على الشبكة؟ | ملاحظة |
|--------|-------------------------|--------|
| **تطوير** `npm run dev` | خادم التطوير الخاص بـ Next.js (يعمل على Node.js) | للبرمجة فقط، لا تستخدمه للإنتاج العام. |
| **إنتاج** `npm run start` (بعد `npm run build`) | خادم HTTP **مدمج في Node.js** عبر أمر `next start` | هذا هو «سيرفر التطبيق» الفعلي لـ Next.js في هذا المشروع. |

هذا المستودع **لا يحتوي** على ملفات جاهزة لـ **Nginx** أو **Apache**. على خادم VPS (مثل Hostinger VPS) الغالب أن يكون **Nginx أو Apache** يعمل كـ **Reverse Proxy** أمام المنفذ الذي يعمل عليه Node (مثلاً `3010`)، فيستقبل الزوار على المنفذين `80` و`443` ويوجّه الطلبات إلى التطبيق.

**ما لا يمكن تنفيذه من هنا:** الدخول إلى سيرفر Hostinger الخاص بك والتحقق الفعلي من الخدمات المركّبة. نفّذ الأوامر التالية **على السيرفر نفسه** (SSH) عندما تريد التأكد مما يعمل:

```bash
# معرفة توزيعة النظام (اختياري)
cat /etc/os-release

# هل Nginx يعمل؟
systemctl status nginx 2>/dev/null || service nginx status 2>/dev/null

# هل Apache يعمل؟ (اسم الخدمة قد يكون apache2 أو httpd)
systemctl status apache2 2>/dev/null || systemctl status httpd 2>/dev/null

# المنافذ المفتوحة والعمليات المرتبطة بها (مفيد لمعرفة من يستخدم أي بورت)
sudo ss -tlnp

# أو (إن وُجد)
sudo netstat -tlnp
```

---

## 2) المتطلبات على الجهاز أو السيرفر

- **Node.js** يُفضّل إصدارًا يتوافق مع متطلبات Next.js 16 (راجع [توثيق Next.js](https://nextjs.org/docs)؛ على بيئة الاختبار المحلية ظهر تحذير محرّك مع Node أقدم من المطلوب لبعض حزم ESLint فقط).
- **npm** (يأتي عادة مع Node).

---

## 3) أوامر التثبيت والبناء (نسخ ولصق كما هي)

من جذر المشروع (المجلد الذي يحتوي على `package.json`):

```bash
cd /root/Fayez/landing-page-ehsan
```

تثبيت الاعتماديات (يُفضّل للإنتاج أن يطابق `package-lock.json`):

```bash
npm ci
```

إن لم يكن `package-lock.json` متوفرًا أو أردت سلوكًا أشبه بـ `npm install`:

```bash
npm install
```

بناء نسخة الإنتاج:

```bash
npm run build
```

تشغيل وضع الإنتاج على المنفذ الافتراضي لـ Next (**3000**):

```bash
npm run start
```

تشغيل وضع الإنتاج على **منفذ تختاره أنت** (مثال: `3010` — غيّر الرقم إذا كان مستخدمًا على سيرفرك):

```bash
PORT=3010 npm run start
```

بديل يحدد المنفذ صراحةً لـ `next start`:

```bash
npx next start -p 3010
```

فحص سريع من نفس الجهاز أن الخدمة تستجيب (بعد التشغيل):

```bash
curl -sI http://127.0.0.1:3010/ | head -n 5
```

تشغيل التطوير (منفذ افتراضي 3000، مع إمكانية تغييره):

```bash
npm run dev
```

```bash
npx next dev -p 4000
```

فحص اللينت:

```bash
npm run lint
```

**ملاحظة:** تم التحقق محليًا أن الأمر `PORT=3456 npm run start` يعرض جاهزية الخادم على `http://localhost:3456` بعد نجاح `npm run build`. استخدم منفذًا حرًا على سيرفرك (`ss -tlnp`).

---

## 4) تشغيل دائم في الخلفية (مثال: PM2)

PM2 يساعد على إعادة التشغيل عند انقطاع العملية. التثبيت العام (مرة واحدة على السيرفر):

```bash
sudo npm install -g pm2
```

من جذر المشروع، بعد `npm run build`:

```bash
PORT=3010 pm2 start npm --name "ehsan-landing" -- start
pm2 save
pm2 startup
```

(اتبع التعليمات التي يطبعها `pm2 startup` إن طلب صلاحيات `sudo`.)

---

## 5) ربط النطاق الفرعي `https://ehsan.fayezalshami.com/`

### أ) DNS في Hostinger (أو أي مزود DNS يوجّه النطاق)

1. ادخل إلى لوحة Hostinger (hPanel) → **Domains** → النطاق **fayezalshami.com** → **DNS / DNS Zone** (المسمى قد يختلف قليلًا).
2. أضف سجلًا من نوع **A**:
   - **Name / Host:** `ehsan`
   - **Points to / Value:** **عنوان IP العام لخادمك** (نفس IP الذي يستضيف التطبيق أو الـ VPS).
   - **TTL:** الافتراضي أو 3600.
3. احذف أو عطّل أي سجل **A** أو **CNAME** قديم يتعارض مع `ehsan` لنفس الاسم.
4. انتظر انتشار DNS (غالبًا من دقائق إلى ساعات).

تحقق من أن الاسم يشير للـ IP الصحيح (من جهازك):

```bash
dig +short ehsan.fayezalshami.com A
```

أو:

```bash
nslookup ehsan.fayezalshami.com
```

### ب) على الخادم (VPS): Reverse Proxy + HTTPS

بعد أن يعمل التطبيق على `127.0.0.1:3010` (أو المنفذ الذي اخترته):

1. **ثبّت شهادة TLS** للنطاق `ehsan.fayezalshami.com`:
   - في Hostinger غالبًا يوجد **SSL** لكل نطاق/نطاق فرعي من اللوحة، أو استخدم **Let’s Encrypt** على السيرفر مع Certbot إذا تدير الخادم بنفسك.
2. **اضبط Nginx** (مثال توضيحي فقط — لا تلصقه دون مراجعة مسارات وملفاتك؛ مسار الملف قد يكون `/etc/nginx/sites-available/`):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ehsan.fayezalshami.com;

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

ثم اختبر الإعداد و أعد التحميل:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

إذا كان عندك **Apache** بدل Nginx، الفكرة نفسها: `ProxyPass` / `ProxyPassReverse` إلى `http://127.0.0.1:3010` مع تفعيل الوحدات المناسبة — راجع توثيق Apache لنسختك.

### ج) إذا الاستضافة **مشتركة** بدون Node

Next.js يحتاج بيئة تشغيل **Node.js**. استضافة مشتركة تقليدية (PHP فقط) غالبًا **لا** تشغّل `next start` كما على VPS. في هذه الحالة الخيارات الشائعة:

- ترقية إلى **VPS** أو خطة تدعم **Node.js** صراحةً في Hostinger، أو
- نشر المشروع على منصة تدعم Next.js (مثل Vercel) مع إشارة DNS للنطاق الفرعي هناك.

---

## 6) ملخص «ماذا تفعل في Hostinger» (قائمة تحقق)

1. **DNS:** سجل **A** للاسم `ehsan` → **IP السيرفر** الصحيح.
2. **الخادم:** `npm ci` → `npm run build` → تشغيل `PORT=3010 npm run start` (أو PM2 كما فوق).
3. **البوابة الأمامية:** Nginx/Apache يوجّه `ehsan.fayezalshami.com` إلى `http://127.0.0.1:3010`.
4. **HTTPS:** تفعيل SSL للنطاق الفرعي من اللوحة أو Let’s Encrypt على السيرفر.
5. **الجدار الناري:** السماح بالوصول إلى `80` و`443`؛ لا حاجة لفتح منفذ التطبيق الداخلي `3010` للعالم الخارجي إذا كان الوصول فقط عبر الـ reverse proxy.

---

## 7) تعديل الكود

الصفحة الرئيسية: `src/app/page.tsx`. التخطيط العام: `src/app/layout.tsx`.

---

## 8) مراجع

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying)


حل المشكلة

الموقع موشغال بدي ياه يشتغل 24 ساعة 

/usr/bin/npm install -g pm2 2>&1 | tail -3
13 packages are looking for funding
  run `npm fund` for details
which pm2; pm2 --version
Command 'pm2' not found, did you mean:
  command 'pm' from deb powerman (2.3.27-4)
  command 'pom2' from deb libpod-pom-perl (2.01-4)
  command 'pmc' from deb linuxptp (4.0-1ubuntu1.1)
  command 'pms' from deb pms (0.42-1.1)
  command 'gm2' from deb gm2 (4:13.2.0-2ubuntu1)
  command 'pmw' from deb pmw (1:5.22-1)
  command 'tpm2' from deb tpm2-tools (5.4-1)
  command 'wm2' from deb wm2 (4+svn20090216-4build1)
  command 'pmg' from deb python3-pymatgen (2023.06.23+dfsg1-2build1)
Try: apt install <deb name>
ls /usr/local/bin/pm2 2>/dev/null || find /usr/lib/node_modules -name pm2 -maxdepth 2 2>/dev/null; /usr/bin/npm root -g
/root/.cursor-server/bin/linux-x64/lib/node_modules
ls /root/Fayez/landing-page-ehsan/.next/BUILD_ID 2>/dev/null && echo "build OK" || echo "need build"; /usr/bin/node --version; which node
/root/Fayez/landing-page-ehsan/.next/BUILD_ID
build OK
v22.22.0
/root/.cursor-server/bin/linux-x64/e9ee1339915a927dfb2df4a836dd9c8337e17cc0/node
الموقع شغّال 24/7. إليك ملخص ما تم:

ما تم بالضبط
نظام التشغيل الدائم: systemd

أنشأنا ملف خدمة /etc/systemd/system/ehsan-landing.service يضمن:

بدء تلقائي عند إقلاع السيرفر
إعادة تشغيل تلقائية إذا وقفت العملية (كل 5 ثواني)
التشغيل الدائم على 127.0.0.1:3010 ← Caddy يوجّهه إلى https://ehsan.fayezalshami.com
أوامر تحتاجها مستقبلًا
# حالة الخدمة
systemctl status ehsan-landing
# إيقاف
systemctl stop ehsan-landing
# تشغيل
systemctl start ehsan-landing
# إعادة تشغيل (مثلاً بعد تحديث الكود)
systemctl restart ehsan-landing
# عرض اللوق المباشر
journalctl -u ehsan-landing -f
إذا حدّثت الكود لاحقًا: بعد npm run build شغّل systemctl restart ehsan-landing وتمام.