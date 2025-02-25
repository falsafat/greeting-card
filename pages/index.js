import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

export default function RamadanGreeting() {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleDownload = () => {
    const card = document.getElementById("greeting-card");
    if (card) {
      html2canvas(card).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ramadan_greeting.png";
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!generated ? (
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">أدخل اسمك للحصول على بطاقة تهنئة برمضان</h1>
          <input
            type="text"
            placeholder="اكتب اسمك هنا"
            className="p-2 border rounded-md text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={() => setGenerated(true)}>إنشاء البطاقة</Button>
        </div>
      ) : (
        <div className="relative bg-white p-6 rounded-xl shadow-lg" id="greeting-card">
          <Card className="p-6 flex flex-col items-center relative">
            <CardContent className="text-center relative">
              <img src="/image.png" alt="Ramadan" className="w-full h-auto" />
              <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold drop-shadow-lg">
                {name}
              </p>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-center space-x-2">
            <Button onClick={handleDownload}>تحميل الصورة</Button>
            <Button variant="outline" onClick={() => setGenerated(false)}>
              تعديل الاسم
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
