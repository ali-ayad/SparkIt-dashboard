
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const { language } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{language === "en" ? "Settings" : "الإعدادات"}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Store Information" : "معلومات المتجر"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Update your store details and information" : "تحديث تفاصيل ومعلومات متجرك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">{language === "en" ? "Store Name" : "اسم المتجر"}</Label>
            <Input id="storeName" defaultValue="SparkIT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
            <Input id="storeEmail" type="email" defaultValue="contact@sparkit.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">{language === "en" ? "Phone" : "الهاتف"}</Label>
            <Input id="storePhone" type="tel" defaultValue="+1 234 567 890" />
          </div>
          <Button>{language === "en" ? "Save Changes" : "حفظ التغييرات"}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Notifications" : "الإشعارات"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Manage your notification preferences" : "إدارة تفضيلات الإشعارات الخاصة بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{language === "en" ? "Order Notifications" : "إشعارات الطلبات"}</div>
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Receive notifications for new orders" : "تلقي إشعارات للطلبات الجديدة"}
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{language === "en" ? "Low Stock Alerts" : "تنبيهات المخزون المنخفض"}</div>
              <div className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Get notified when products are running low"
                  : "احصل على إشعار عندما تنخفض المنتجات"}
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{language === "en" ? "Customer Reviews" : "تقييمات العملاء"}</div>
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Notifications for new customer reviews" : "إشعارات لتقييمات العملاء الجديدة"}
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

