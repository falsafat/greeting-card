const backgroundSrc = 'images/ramadan-card.png'; // عدل الاسم لو كان مختلفًا

window.onload = () => {
  const generateBtn = document.getElementById('generateBtn');
  generateBtn.addEventListener('click', generateCard);
};

async function generateCard() {
  const userName = document.getElementById('userName').value.trim();
  if (!userName) {
    alert('يرجى إدخال الاسم');
    return;
  }

  const canvas = document.getElementById('greetingCanvas');
  const ctx = canvas.getContext('2d');

  const backgroundImage = await loadImage(backgroundSrc);

  // ضبط حجم الكانفاس على حجم الصورة
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;

  // رسم الخلفية
  ctx.drawImage(backgroundImage, 0, 0);

  // إعدادات النص
  ctx.font = "40px 'FSAlbertArabicBold'";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";

  // إحداثيات النص (يمكن تعديلها حسب الحاجة)
  const xPos = canvas.width / 2;
  const yPos = canvas.height / 1.15;

  // كتابة الاسم على الصورة
  ctx.fillText(userName, xPos, yPos);

  // إظهار رابط التحميل
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = canvas.toDataURL("image/png");
  document.querySelector('.result').style.display = 'block';
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // إذا احتجت التحميل من مصدر خارجي
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}
