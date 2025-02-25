// مسار صورة الخلفية
const backgroundSrc = 'images/ramadan-card.png';

window.onload = () => {
  const generateBtn = document.getElementById('generateBtn');
  generateBtn.addEventListener('click', generateCard);

  // زر المشاركة
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', shareImage);
  }
};

// دالة توليد الصورة
async function generateCard() {
  const userName = document.getElementById('userName').value.trim();
  if (!userName) {
    alert('يرجى إدخال الاسم');
    return;
  }

  const canvas = document.getElementById('greetingCanvas');
  const ctx = canvas.getContext('2d');

  // تحميل خلفية البطاقة
  const backgroundImage = await loadImage(backgroundSrc);

  // ضبط أبعاد الكانفاس لتطابق أبعاد الصورة
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;

  // رسم الخلفية
  ctx.drawImage(backgroundImage, 0, 0);

  // إعدادات النص
  ctx.font = "30px 'FSAlbertArabicBold'";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";

  // إحداثيات النص (يمكن تعديلها حسب حاجتك)
  const xPos = canvas.width / 2;
  const yPos = canvas.height / 1.4;

  // كتابة الاسم
  ctx.fillText(userName, xPos, yPos);

  // إظهار رابط التحميل والنتيجة
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = canvas.toDataURL("image/png");
  document.querySelector('.result').style.display = 'block';
}

// دالة تحميل الصورة كـ Image
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // إذا كانت الصورة من مصدر خارجي
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// دالة مشاركة الصورة عبر Web Share API
async function shareImage() {
  const canvas = document.getElementById('greetingCanvas');
  if (!canvas) {
    alert('يرجى توليد الصورة أولاً.');
    return;
  }

  // تحويل الكانفاس إلى DataURL
  const dataUrl = canvas.toDataURL('image/png');

  // تحويل DataURL إلى Blob
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  // إنشاء ملف من نوع image/png
  const file = new File([blob], 'ramadan-greeting.png', { type: 'image/png' });

  // التحقق من إمكانية المشاركة
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        text: 'رمضان كريم!',
        title: 'تهنئة رمضان',
      });
      console.log('تمت المشاركة بنجاح');
    } catch (error) {
      console.error('حدث خطأ أثناء المشاركة:', error);
    }
  } else {
    alert('خاصية المشاركة غير مدعومة على هذا المتصفح.');
  }
}
