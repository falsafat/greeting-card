// مسار صورة الخلفية
const backgroundSrc = 'images/card.png';

window.onload = () => {
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateCard);

    const nameInput = document.getElementById('userName');
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            generateCard();
        }
    });

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
    ctx.font = "40px 'FSAlbertArabicBold'";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";

    // إحداثيات النص (يمكن تعديلها حسب حاجتك)
    const xPos = canvas.width * 0.5;
    const yPos = canvas.height * 0.87;

    // كتابة الاسم
    ctx.fillText(userName, xPos, yPos);

    // Fire an event when an image is saved
    canvas.addEventListener('contextmenu', function (e) {
        setTimeout(() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'image_saved',
                'image_url': canvas.toDataURL("image/png") // الحصول على DataURL من canvas
            });
        }, 0);
    });

    // إظهار رابط التحميل والنتيجة
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL("image/png");

    const resultDiv = document.querySelector('.result');
    resultDiv.style.display = 'block';
    // Fade in result for a smoother experience
    setTimeout(() => { resultDiv.style.opacity = '1'; }, 50);
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
    const file = new File([blob], 'greeting-card.png', { type: 'image/png' });

    // التحقق من إمكانية المشاركة
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
            });
            console.log('تمت المشاركة بنجاح');
        } catch (error) {
            console.error('حدث خطأ أثناء المشاركة:', error);
        }
    } else {
        alert('خاصية المشاركة غير مدعومة على هذا المتصفح.');
    }
}
